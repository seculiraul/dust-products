const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')
const ApiError = require('../util/ApiError')

module.exports = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return next(new ApiError('Product does not exit', 400))
  }

  res.status(204).json({})
})
