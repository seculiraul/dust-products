const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')
const ApiError = require('../util/ApiError')

module.exports = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.code)
  res.status(204).json({})
})
