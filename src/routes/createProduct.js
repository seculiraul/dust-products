const express = require('express')
const Product = require('../models/product-model')
const ApiFeatures = require('../util/ApiFeatures')

const router = express.Router()

router.get('/api/v1/test', (req, res, next) => {
  console.log(req.query)
  res.status(200).json({
    message: `Hello ${req.query?.param}`,
  })
})
router
  .route('/api/v1/products')
  .post(async (req, res, next) => {
    try {
      const {
        name,
        gender,
        color,
        otherColors,
        specs,
        details,
        sizes,
        category,
        price,
        images,
        usualDiscount,
        description,
        newProduct,
        bestSelling,
        displayImage,
      } = req.body

      const product = await Product.create({
        name,
        gender,
        color,
        otherColors,
        specs,
        details,
        sizes,
        category,
        price,
        images,
        usualDiscount,
        description,
        newProduct,
        bestSelling,
        displayImage,
      })

      res.json({
        message: 'success',
        data: product,
      })
    } catch (err) {
      console.log(err)
    }
  })
  .get(async (req, res, next) => {
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

router
  .route('/api/v1/products/:code')
  .get(async (req, res, next) => {
    try {
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
    } catch (err) {
      console.log(err)
    }
  })
  .patch(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
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
    } catch (err) {
      console.log(err)
    }
  })
module.exports = router
