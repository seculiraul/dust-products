const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')
const rabbitMqClient = require('../messaging/rabbitMqClient')

module.exports = catchAsync(async (req, res, next) => {
  const {
    name,
    gender,
    color,
    otherColors,
    specs,
    details,
    sizes,
    category,
    brand,
    price,
    images,
    usualDiscount,
    description,
    newProduct,
    bestSelling,
    displayImage,
  } = req.body

  const product = await Product.create({
    name,
    gender,
    color,
    otherColors,
    specs,
    details,
    sizes,
    category,
    brand,
    price,
    images,
    usualDiscount,
    description,
    newProduct,
    bestSelling,
    displayImage,
  })

  rabbitMqClient.publishMessage('Product_Created', {
    _id: product._id,
    sizes: product.sizes,
    code: product.code,
    price: product.price,
    color: product.color,
  })
  res.json({
    message: 'success',
    data: product,
  })
})
