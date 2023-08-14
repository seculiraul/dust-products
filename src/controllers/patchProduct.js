const catchAsync = require('../util/catchAsync')
const Products = require('../models/product-model')
const ApiError = require('../util/ApiError')
const rabbitMqClient = require('../messaging/rabbitMqClient')

module.exports = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.code, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    return next(new ApiError('Product was not hound', 400))
  }

  rabbitMqClient.publishMessage('Product_Created', {
    _id: product._id,
    sizes: product.sizes,
    code: product.code,
    price: product.price,
    color: product.color,
  })

  res.json({
    message: 'success',
    data: {
      product,
    },
  })
})
