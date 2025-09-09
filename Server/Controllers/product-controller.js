const products = require('../Data-base/Models/product')

exports.newProduct = async function (req ,res){
try {
    let name = req.body.name
    if(!name){
        return res.status(400).send({
            success : false , 
            message : "Name required"
        })
    }
    let price = req.body.price
    if(!price){
        return res.status(400).send({
            success : false , 
            message : "Price required"
        })
    }
    let spec = req.body.spec
    if(!spec){
        return res.status(400).send({
            success : false , 
            message : "Product specification required"
        })
    }
    let description = req.body.description
    if(!description){
        return res.status(400).send({
            success : false , 
            message : "Product description required"
        })
    }
    let stocks = req.body.stocks
    if(!stocks){
        return res.status(400).send({
            success : false , 
            message : "Stock count required"
        })
    }

    let data ={
        name: name,
        price : price,
        specification: spec,
        description : description,
        stocks : stocks
    }

    let productData = await products.create(data)
    res.status(200).send({
        success : true , 
        message : "Product added Successfully"
    })
    
} catch (error) {
    return res.status(400).send({
        success : false , 
        message : error.message
    })
}
}