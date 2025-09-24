const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const users = require('../Data-base/Models/user');
const control_data = require('../utils/Control-data/control-data.json')

exports.access_controller = async function(access_type, req, res, next) {
    let allowed = access_type.split(',').map((obj) => control_data[obj]);
    try {
        // console.log("access_type : ",access_type);
        if(access_type === '*') {
            next();
        }else {
            // console.log("req.header : ",req.headers['authorization']);
            let token = req.headers['authorization'].split(' ')[1];
            // console.log("token : ",token);
            if(!token || token === "" || token === "null" || token === "undefined" || token === null || token === undefined){
               return res.status(400).send({
                success : false,
                message : "Invalid Token"
               })
            }else{
                jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
                    if(err) {
                         return res.status(400).send({
                success : false,
                message : "something went wrong"
               })
                    }else{
                        // console.log("decoded : ",decoded);
                        let user_id = decoded.user_id;
                        let user = await users.findOne({_id : user_id});
                        // console.log("user : ",user);
            //             if(user.permission == "blocked"){
            //                  return res.status(400).send({
            //     success : false,
            //     message : "you are blocked by admin"
            //    })
            //             }

                        // console.log("user : ",user);
                        let user_type = users.user_type;
                        // console.log("user_type : ",user_type);
                        if(allowed && allowed.includes(user_type)){
                            next();
                        }else{
                              return res.status(400).send({
                success : false,
                message : "user not allowed in the route"
               })
                        }
                    }
                })
            }
        }
    } catch (error) {
        console.log("error : ",error);
        return res.status(400).send({
                success : false,
                message : error
               })
    }
}