const emailValidation = require('../helpers/emailValidation.js');
const otpTemplate = require('../helpers/otpTemplate.js');
const passwordValidation = require('../helpers/passwordValidation.js');
const sendMail = require('../helpers/sendMail.js');
const User = require('../model/userSchema.js');
const bcrypt = require('bcrypt');
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

async function registrationController(req, res){

    const {name, email, password, facebookId, linkedinId} = req.body

    if(!name){
        return res.send({error: "Name is Required"})
    }else if(!email){
        return res.send({error: "Email is Required"})
    }else if(!emailValidation(email)){
        return res.send({error: "Invalid Email"})
    }else if(!password){
        return res.send({error: "Password is Required"})
    }else if(!passwordValidation(password)){
        return res.send({error: "Give Strong Password"})
    }else{
        const duplicateEmailCheck = await User.find({email})

        if(duplicateEmailCheck.length > 0){
            return res.send({error: "Email already use"})
        }
    }

    bcrypt.hash(password, 10, async function(err, hash) {
        const user = new User({
            name, 
            email, 
            password: hash,
            facebookId, 
            linkedinId
        })
    
        user.save()

        const generator2 = aleaRNGFactory(Date.now());
        const randomNumber = generator2.uInt32().toString().substring(0,4)

        const randomOtpNumber = await User.findOneAndUpdate(
            {email},
            { $set:{randomOtp: randomNumber}},
            {new: true}
        )

        sendMail(email, randomNumber, otpTemplate)

        setTimeout( async()=>{
            const randomOtpNumber = await User.findOneAndUpdate(
                {email},
                {$unset:{randomOtp: ""}},
                {new: true}
            )
        },60000)

        res.send({success:"Registration Successfully"})    
    });
    
}

module.exports = registrationController;