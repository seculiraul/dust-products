const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')

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
    price,
    images,
    usualDiscount,
    description,
    newProduct,
    bestSelling,
    displayImage,
  })

  res.json({
    message: 'success',
    data: product,
  })
})
