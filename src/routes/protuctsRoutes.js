const express = require('express')
const createProduct = require('../controllers/createProduct')
const deleteProduct = require('../controllers/deleteProduct')
const getAllProduts = require('../controllers/getAllProduts')
const getProductsById = require('../controllers/getProductsById')
const patchProduct = require('../controllers/patchProduct')
const recomandedProducts = require('../controllers/recomandedProducts')

const router = express.Router()

router.route('/api/v1/recomanded').get(recomandedProducts),
  router.route('/api/v1/products').post(createProduct).get(getAllProduts)

router
  .route('/api/v1/products/:code')
  .get(getProductsById)
  .patch(patchProduct)
  .delete(deleteProduct)
module.exports = router
