const mongoose = require('mongoose')
const otpSchema = new mongoose.Schema({
    email :{
        type: String,
        required : true
    },
    code : {
        type : Number,
        required :true
    },
     createdAt: { type: Date, default: Date.now, expires: 240 }

})
module.exports = mongoose.model("Otp" , otpSchema)