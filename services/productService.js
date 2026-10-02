const db = require('../database/productDatabase');

function getProducts() {
  return db.getProducts();
}

function getProductById(id) {
  return db.getProductById(id);
}

function createProduct(product) {
  return db.createProduct(product);
}

function updateProduct(id, product) {
  return db.updateProduct(id, product);
}

function patchProduct(id, fields) {
  return db.patchProduct(id, fields);
}

function deleteProduct(id) {
  return db.deleteProduct(id);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
