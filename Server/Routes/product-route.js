const express = require('express')
const router = express.Router()
const productController = require('../Controllers/product-controller')

router.post('/new',productController.newProduct)

module.exports = router