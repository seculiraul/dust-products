const Products = require('../models/product-model')
module.exports = (productDetails) => {
  productDetails.forEach(async (productInfo) => {
    const product = await Products.findById(productInfo?.productId)
    product.decreaseQuantity(productInfo?.size, productInfo?.quantity)
  })
}
