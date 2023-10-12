const Products = require('../models/product-model')
const ApiError = require('../util/ApiError')
module.exports = (productDetails) => {
  productDetails.forEach(async (productInfo) => {
    const product = await Products.findById(productInfo?.id)
    if (!product) {
      return new ApiError('Product was not found', 404)
    }
    product.decreaseQuantity(productInfo?.size, productInfo?.quantity)
  })
}
