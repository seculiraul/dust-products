const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required for a product'],
    min: [2, 'A product name must have at least 2 characters'],
  },
  code: String,
  category: {
    type: String,
    required: [true, 'A product must have a category'],
  },
  collectionType: {
    type: String,
    required: [true, 'A product must have a collection type'],
  },
  collectionCode: {
    type: String,
    required: [true, 'A product must have a collection code'],
  },
  gender: {
    type: String,
    enum: ['Unisex', 'Men', 'Women'],
    required: true,
  },
  price: {
    type: Number,
    min: [0, 'Price must be positive'],
    required: [true, 'A product must have a price'],
  },
  salePrice: String,
  brand: {
    type: String,
    default: 'unknown',
  },
  sizes: {
    type: [
      {
        size: String,
        quantity: Number,
      },
    ],
    required: true,
  },
  color: {
    type: String,
    required: [true, 'You must provide a color'],
  },
  otherColors: {
    type: [
      {
        color: String,
        code: String,
      },
    ],
  },
  images: {
    type: [String],
    required: [true, 'You must provide 6 images'],
  },
  displayImage: String,
  usualDiscount: {
    type: Number,
    default: 10,
  },
  description: String,
  details: String,
  specs: [String],
  newProduct: {
    type: Boolean,
    default: false,
  },
  bestSelling: {
    type: Boolean,
    default: false,
  },
  isOnSale: Boolean,
})

productSchema.methods.decreaseQuantity = function (size, quantity) {
  this.sizes
    .filter((e) => e.size === size)
    .map((e) => (e.quantity = e.quantity - quantity))
  return this.save()
}

productSchema.pre('save', function (next) {
  this.code = [
    this.brand.toLowerCase().split(' ').join(''),
    this.name.toLowerCase().split(' ').join('-'),
    this.color.toLowerCase(),
  ].join('-')
  next()
})

productSchema.pre('save', function (next) {
  this.isOnSale = !(this.newProduct || this.bestSelling)
  this.salePrice = (
    this.price -
    (this.usualDiscount / 100) * this.price
  ).toFixed()

  next()
})

module.exports = mongoose.model('Products', productSchema)
