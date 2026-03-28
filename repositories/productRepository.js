const db = require("../db");

async function findAllProducts() {
  const result = await db.query("SELECT * FROM produtos ORDER BY id ASC");
  return result.rows;
}

async function findProductById(id) {
  const result = await db.query("SELECT * FROM produtos WHERE id = $1", [id]);
  return result.rows[0] || null;
}

module.exports = {
  findAllProducts,
  findProductById,
};
