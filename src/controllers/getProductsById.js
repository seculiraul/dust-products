const catchAsync = require('../util/catchAsync')
const Product = require('../models/product-model')

module.exports = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ code: req.params.code })

  if (!product) {
    console.log('err')
    return
  }

  res.json({
    message: 'success',
    data: {
      product,
    },
  })
})
