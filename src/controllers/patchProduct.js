const catchAsync = require('../util/catchAsync')
const Products = require('../models/product-model')
const ApiError = require('../util/ApiError')

module.exports = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.code, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    return next(new ApiError('Product was not hound', 400))
  }
  res.json({
    message: 'success',
    data: {
      product,
    },
  })
})
