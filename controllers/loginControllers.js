const emailValidation = require("../helpers/emailValidation.js")
const passwordValidation = require("../helpers/passwordValidation.js")
const User = require("../model/userSchema.js")
const bcrypt = require('bcrypt');

async function loginController(req,res){
    const {email, password} = req.body

     if(!emailValidation(email)){
        return res.send({error: "Invalid Email"})
    }else if(!password){
        return res.send({error: "Password is Required"})
    }else if(!passwordValidation(password)){
        return res.send({error: "Give Strong Password"})
    }else{
        const isEmailCheck = await User.find({email})
        if(isEmailCheck.length > 0){
            bcrypt.compare(password, isEmailCheck[0].password).then(function(result) {
                if(result){
                    return res.send({success : "Login Successfully"})
                }else{
                    return res.send({error: "Password Don't Match"})
                }
            });
        }else{
            return res.send({error: "Email Don't Match"})
        }
    }
}

module.exports= loginController;