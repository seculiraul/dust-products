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
  otherColors: [String],
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
})

productSchema.pre('save', function (next) {
  this.code = [
    this.name.toLowerCase().split(' ').join('-'),
    this.color.toLowerCase(),
  ].join('-')
  next()
})

module.exports = mongoose.model('Products', productSchema)
