const product = require('../Data-base/Models/product')
const products = require('../Data-base/Models/product')

exports.addProduct = async function (req, res) {
  try {
    let name = req.body.name;
    if (!name) {
      return res.status(400).send({ success: false, message: "Name required" });
    }

    let price = req.body.price;
    if (!price) {
      return res.status(400).send({ success: false, message: "Price required" });
    }

    let specification = req.body.specification;
    if (!specification) {
      return res.status(400).send({ success: false, message: "Product specification required" });
    }

    let description = req.body.description;
    if (!description) {
      return res.status(400).send({ success: false, message: "Product description required" });
    }

    let stocks = req.body.stocks;
    if (!stocks) {
      return res.status(400).send({ success: false, message: "Stock count required" });
    }

    const data = {
      name: name,
      specification: specification, 
      description: description,     
      price:price,
      stocks: stocks
    };

    let productData = await products.create(data);
    res.status(200).send({ success: true, message: "Product added Successfully" });

  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

exports.getProduct = async function (req, res) {
    try {
        let data = await product.find();

        return res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            data: data
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};
