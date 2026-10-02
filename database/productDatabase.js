const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

function readDb() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getProducts() {
  const db = readDb();
  return db.products;
}

function getProductById(id) {
  const db = readDb();
  return db.products.find(p => p.id === id);
}

function createProduct(product) {
  const db = readDb();
  const ids = db.products.map(p => p.id);
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  const newProduct = { id: newId, ...product };
  db.products.push(newProduct);
  writeDb(db);
  return newProduct;
}

function updateProduct(id, product) {
  const db = readDb();
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return null;
  db.products[index] = { id, ...product };
  writeDb(db);
  return db.products[index];
}

function patchProduct(id, fields) {
  const db = readDb();
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...fields };
  writeDb(db);
  return db.products[index];
}

function deleteProduct(id) {
  const db = readDb();
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return null;
  const deleted = db.products.splice(index, 1);
  writeDb(db);
  return deleted[0];
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
