const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')
const rabbitMqClient = require('../messaging/rabbitMqClient')

module.exports = catchAsync(async (req, res, next) => {
  const { category, collectionType, collectionCode, gender, brand, color } =
    req.newProductData

  const similarProducts = await Product.find({
    collectionType,
    collectionCode,
    category,
    gender,
    brand,
  })

  const otherColors = similarProducts.map((product) => product.color)

  const product = await Product.create({ ...req.newProductData, otherColors })

  rabbitMqClient.publishMessage('Product_Created', {
    _id: product._id,
    sizes: product.sizes,
    code: product.code,
    price: product.price,
    color: product.color,
  })

  similarProducts.forEach(async (product) => {
    product.otherColors = [...product.otherColors, color]
    await product.save()
  })
  res.json({
    message: 'success',
    data: product,
  })
})
