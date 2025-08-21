const users = require('../Data-base/Models/user')
const bcrypt = require ('bcryptjs')

exports.singUp = async function (req, res) {
    try {
        let body = req.body;
        let name = body.name;
        let email = req.email;
        let password = req.password;
        if (!name) {
            return res.status(400).send({
                message: "Name required",
                success: false
            })
        }
        if (!name) {
            return res.status(400).send({
                message: "Email required",
                success: false
            })
        }
         if (!password) {
            return res.status(400).send({
                message : "Password required",
                success : false
            })
        }
        let mailcheck = await users.findOne({email: email})
        if (mailcheck){
             
            return res.status(400).send({
                message : "Email already exist",
                success : false
            })
        }
        let salt = bcrypt.genSaltSync(10)
        let hashedPassword = bcrypt.hashSync(password , salt)

        let userType = "buyer"

        let data ={
            name : name,
            email : email,
            password : hashedPassword,
            user_type : userType
        }
        let userData = await users.create(data)

        return res.status(200).send({
            message : "Account created successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message || error,
            success: false
        })

    }

}

exports.login = async function (req,res) {
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
        if (!name) {
            return res.status(400).send({
                message: "Email required",
                success: false
            })
        }
         if (!password) {
            return res.status(400).send({
                message : "Password required",
                success : false
            })
        }
        let matchEmail = await users.findOne({email : email})
        if(!matchEmail){
            return res.status(400).send({
                message: "Invalid Email"
            })
        }

        let matchPassword = await bcrypt.compareSync(password ,users.password)
        if(!matchPassword)
        {
            return res.status(400).send({
                message: "Incorrect password",
                success:false
            })
        }
        
        return res.status(200).send({
            message : "Login successfull",
            success:true
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: error.message || error,
            success:false
        })
        
    }
}