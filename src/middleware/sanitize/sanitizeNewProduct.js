module.exports = (req, res, next) => {
  const {
    name,
    category,
    collectionType,
    collectionCode,
    gender,
    price,
    brand,
    specs,
    sizes,
    color,
    images,
    displayImage,
    usualDiscount,
    description,
    details,
    newProduct,
    bestSelling,
  } = req.body

  req.newProductData = {
    name,
    category,
    collectionType,
    collectionCode,
    gender,
    price,
    brand,
    specs,
    sizes,
    color,
    images,
    displayImage,
    usualDiscount,
    description,
    details,
    newProduct,
    bestSelling,
  }

  next()
}
