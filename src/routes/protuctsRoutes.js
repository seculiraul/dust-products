const express = require('express')
const createProduct = require('../controllers/createProduct')
const deleteProduct = require('../controllers/deleteProduct')
const getAllProduts = require('../controllers/getAllProduts')
const getProductsById = require('../controllers/getProductsById')
const patchProduct = require('../controllers/patchProduct')

const router = express.Router()

router.get('/api/v1/test', (req, res, next) => {
  console.log(req.query)
  res.status(200).json({
    message: `Hello ${req.query?.param}`,
  })
})
router.route('/api/v1/products').post(createProduct).get(getAllProduts)

router
  .route('/api/v1/products/:code')
  .get(getProductsById)
  .patch(patchProduct)
  .delete(deleteProduct)
module.exports = router
