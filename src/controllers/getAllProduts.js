const ApiFeatures = require('../util/ApiFeatures')
const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')

module.exports = catchAsync(async (req, res, next) => {
  console.log(req.query)
  const features = new ApiFeatures(Product, req.query)
    .filter()
    .sort()
    .paginate()

  const products = await features.query

  res.json({
    message: 'success',
    length: products.length,
    data: {
      products,
    },
  })
})
