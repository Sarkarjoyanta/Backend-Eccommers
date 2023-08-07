const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    avator:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    updated:{
        type: Date
    },
    created:{
        type: Date,
        default: Date.now()
    },
    facebookId:{
        type: String,
    },
    linkedinId:{
        type: String
    },
    randomOtp:{
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)