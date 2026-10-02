const service = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

function getProducts(req, res) {
  const products = service.getProducts();
  res.json(products);
}

function getProduct(req, res) {
  const id = parseInt(req.params.id);
  const product = service.getProductById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

function createProduct(req, res) {
  const product = service.createProduct(req.body);
  invalidateCache(['products']);
  res.status(201).json(product);
}

function updateProduct(req, res) {
  const id = parseInt(req.params.id);
  const updated = service.updateProduct(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache(['products', 'products:' + id]);
  res.json(updated);
}

function patchProduct(req, res) {
  const id = parseInt(req.params.id);
  const updated = service.patchProduct(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache(['products', 'products:' + id]);
  res.json(updated);
}

function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const deleted = service.deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache(['products', 'products:' + id]);
  res.json({ message: 'Product deleted', product: deleted });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
