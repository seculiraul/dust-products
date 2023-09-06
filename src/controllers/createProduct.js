const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')
const rabbitMqClient = require('../messaging/rabbitMqClient')

module.exports = catchAsync(async (req, res, next) => {
  const {
    name,
    category,
    collectionType,
    collectionCode,
    gender,
    price,
    brand,
    specs,
    sizes,
    color,
    images,
    displayImage,
    usualDiscount,
    description,
    details,
    newProduct,
    bestSelling,
  } = req.body

  const similarProducts = await Product.find({
    collectionType,
    collectionCode,
    category,
    gender,
    brand,
  })

  const otherColors = similarProducts.map((product) => product.color)

  const product = await Product.create({
    name,
    category,
    collectionType,
    collectionCode,
    gender,
    price,
    brand,
    specs,
    sizes,
    color,
    images,
    displayImage,
    usualDiscount,
    description,
    details,
    newProduct,
    bestSelling,
  })

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
