const emailValidation = require("../helpers/emailValidation");
const User = require("../model/userSchema");

async function otpControllers(req,res){
    const {email, randomOtp} = req.body

    if(!email){
        return res.send({error: "Email is Required"})
    }else if(!emailValidation(email)){
        return res.send({error: "Invalid Email"})
    }else{
        const otpMatch = await User.find({email})
        if(otpMatch.length > 0){
            if(randomOtp == otpMatch[0].randomOtp){
                res.send({success: "Otp Match"})
                const removeOtp = await User.findOneAndUpdate(
                    {email},
                    {$unset: {randomOtp: ""}},
                    {new: true}
                )
            }else{
                res.send({error: "Otp don't Match"})
            }
        }
    }
}

module.exports = otpControllers;