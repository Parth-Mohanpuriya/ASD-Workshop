const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');

router.get('/', cacheMiddleware, controller.getProducts);
router.get('/:id', cacheMiddleware, controller.getProduct);
router.post('/', controller.createProduct);
router.put('/:id', controller.updateProduct);
router.patch('/:id', controller.patchProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
