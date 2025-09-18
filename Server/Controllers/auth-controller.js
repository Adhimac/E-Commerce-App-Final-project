const users = require('../Data-base/Models/user')
const bcrypt = require('bcryptjs')
const otpGenerator = require('../utils/otpGenerator/otpGenerator').otpGenerator
const Otp = require('../Data-base/Models/otp')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config

exports.singUp = async function (req, res) {
    try {
        let body = req.body;
        let name = body.name;
        let email = body.email;
        let password = body.password;
        if (!name) {
            return res.status(400).send({
                message: "Name required",
                success: false
            })
        }
        if (!email) {
            return res.status(400).send({
                message: "Email required",
                success: false
            })
        }
        if (!password) {
            return res.status(400).send({
                message: "Password required",
                success: false
            })
        }
        let mailcheck = await users.findOne({ email: email })
        if (mailcheck) {

            return res.status(400).send({
                message: "Email already exist",
                success: false
            })
        }
        let salt = bcrypt.genSaltSync(10)
        let hashedPassword = bcrypt.hashSync(password, salt)



        let userType = "buyer"

        let data = {
            name: name,
            email: email,
            password: hashedPassword,
            user_type: userType
        }
        let userData = await users.create(data)
        let person = await users.findOne({email})
        let token = jwt.sign({userId : person._id},process.env.PRIVATE_KEY,{expiresIn : "5d"})
        return res.status(200).send({
            message: "Account created successfully",
            success: true,
            data : token
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message || error,
            success: false
        })

    }

}

exports.login = async function (req, res) {
    try {
        let body = req.body;
        let email = body.email;
        let password = body.password;

        if (!email) {
            return res.status(400).send({
                message: "Email required",
                success: false
            })
        }
        if (!password) {
            return res.status(400).send({
                message: "Password required",
                success: false
            })
        }
        let matchEmail = await users.findOne({ email: email })
        if (!matchEmail) {
            return res.status(400).send({
                message: "Invalid Email"
            })
        }



        let matchPassword = await bcrypt.compare(password, matchEmail.password);
        if (!matchPassword) {
            return res.status(400).send({
                message: "Incorrect password",
                success: false
            })
        }
        let person = await users.findOne({email})
        let token = jwt.sign({userId : person._id},process.env.PRIVATE_KEY,{expiresIn : "5d"})
        

        return res.status(200).send({
            message: "Login successfull",
            success: true,
            data : token
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: error.message || error,
            success: false
        })

    }
}
exports.emailVerifictaion = async function (req, res) {
    try {
        let email = req.body.email
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Enter email"
            })
        }

        let mailcheck = await users.findOne({ email })
        if (!mailcheck) {
            return res.status(400).send({
                success: false,
                message: "Email not found"
            })
        }

        let otp = otpGenerator(4)
        console.log("OTP: ", otp)
        //otp mailed 


        let data = {
            email: email,
            code: otp
        };

        let userData = await Otp.create(data);
        return res.status(200).send({

            message: "OTP sent to your email",
            success: true
        });

    } catch (error) {
        return res.status(400).send({

            success: false,
            message: error
        })
    }
}
exports.otpVerifictaion = async function (req, res) {
    try {
        let email = req.params.email
        let code = req.body.code

        if (!code) {
            return res.status(400).send({
                success: false,
                message: "Enter the OTP"
            })
        }

        let matchCode = await Otp.findOne({ email });


        if (matchCode.code != code) {
            return res.status(400).send({
                success: false,
                message: "Code dosn't match"
            })
        }

        return res.status(200).send({
            success: true,
            message: "otp verified successfully"
        })


    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        })

    }
}
exports.changePassword = async function (req, res) {
    try {
        let email = req.params.email
        let newPassword = req.body.newPassword
        if (!newPassword) {
            return res.status(400).send({
                success: false,
                message: "Enter New password"
            })
        }
        let confirmPassword = req.body.confirmPassword
        if (!confirmPassword) {
            return res.status(400).send({
                success: false,
                message: "Confirm password"
            })
        }
        if(newPassword != confirmPassword){
            return res.status(400).send({
                success : false , 
                message : "Passsword Doesn't match"
            })
        }
        else{
             let salt = bcrypt.genSaltSync(10)
        let hashedPassword = bcrypt.hashSync(confirmPassword, salt)

             await users.updateOne({ email }, { $set: { password: hashedPassword } });
        }
        return res.status(200).send({
            success  :true,
            message : "Password updated successfully"
        })


    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}