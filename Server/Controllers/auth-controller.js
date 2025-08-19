const express = require ('express')
const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')


exports.signUp = async function (req,res) {
    try {
        console.log(req.header);
        let body = req.body;
        console.log("Body :" ,body);
        let name = body.name ;
        if(!name){
              let response = error_function({
                success : false ,
                statuscode : 400,
                message : "please enter your name"
            });
            res.status(response.statusCode).send(response)
            return;
        }
        let email = body.email;
        console.log("Email :",email);
        if(!email){
            let response = error_function({
                success : false ,
                statuscode : 400,
                message : "please enter your Email"
            });
            res.status(response.statusCode).send(response)
            return;
        }
        let checkEmailexistancy = await users.findOne({email});
        if(!checkEmailexistancy){
             let response = error_function({
                success : false ,
                statuscode : 400,
                message : "This email is already exist. please login to continue"
            });
            res.status(response.statusCode).send(response)
            return;
        }
        let password = body.password ; 
        if(!password){
                 let response = error_function({
                success : false ,
                statuscode : 400,
                message : "please enter your password"
            });
            res.status(response.statusCode).send(response)
            return;
        }
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(password , salt)
        body.password = hash ; 
    } catch (error) {
        console.log("error : ",error);
         let response = error_function({
                success : false ,
                statuscode : 400,
                message : error.message ? error.message : error
            });
            res.status(response.statusCode).send(response)
            return;
        
    }    
}
exports.login = async function (req,res) {
    try {
        let body = req.body;
        let email = req.email;
        let password = req.password
         if(!email){
            let response = error_function({
                success : false ,
                statuscode : 400,
                message : "please enter your Email"
            });
            res.status(response.statusCode).send(response)
            return;
        }
          if(!password){
            let response = error_function({
                success : false ,
                statuscode : 400,
                message : "please enter your password"
            });
            res.status(response.statusCode).send(response)
            return;
        }

        const user = await User.findOne({email : email})
        if(!user){
            let response = error_function({
                success:false,
                statuscode: 400,
                message: "Invalid email or password"
            });
            res.status(response.statusCode).send(response)
            return;
        }

        const match = await bcrypt.compareSync(password , user.password);
        if(!match){
            let response = error_function({
                success:false,
                statuscode: 400,
                message: "Invalid email or password"
            });
            res.status(response.statusCode).send(response)
            return;
        }
        else{
            let response = success_function(
                {
                    success:true,
                    statusCode:404,
                    message:"Login successfull"
                }
            );
            res.status(response.statusCode).send(response)
            return;
        }


        
    } catch (error) {
        
    }
    
}