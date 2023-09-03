const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')
const product = require('../../../orders/src/models/product')

module.exports = catchAsync(async (req, res, next) => {
  const newProducts = await Product.find({ newProduct: true })
    .select('code displayImage name price')
    .limit(10)
  const bestSellings = await Product.find({ bestSelling: true })
    .select('code displayImage name price')
    .limit(10)

  res.status(200).json({
    message: 'success',
    data: {
      newProducts,
      bestSellings,
    },
  })
})
