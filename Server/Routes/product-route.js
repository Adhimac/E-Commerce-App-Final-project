const express = require('express')
const router = express.Router()
const productController = require('../Controllers/product-controller')
const {access_controller} = require('../Controllers/access_controller')
function setAccessController(access_type){
    return(req,res,next)=>{
         access_controller(access_type,req,res,next)
    }
}
router.post('/addProduct',setAccessController("1.3"),productController.addProduct)
router.get('/getProduct',setAccessController("*"),productController.getProduct)

module.exports = router