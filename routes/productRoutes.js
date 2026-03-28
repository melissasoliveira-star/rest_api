// Importa o framework Express para criação das rotas
const express = require("express");

// Cria uma instância do roteador do Express para definir as rotas de produto
const router = express.Router();

// Importa o repositório de produtos, responsável pela comunicação com o banco de dados
const productRepo = require("../repositories/productRepository");

// GET /api/products
// Retorna a lista de todos os produtos cadastrados
router.get("/", async (req, res) => {
  try {
    const products = await productRepo.findAllProducts();
    return res.json(products);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).send("Erro interno do servidor");
  }
});

// GET /api/products/:id
// Retorna um produto específico pelo seu ID
// Responde com 404 se o produto não for encontrado
router.get("/:id", async (req, res) => {
  try {
    const product = await productRepo.findProductById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });
    return res.json(product);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).send("Erro interno do servidor");
  }
});

// Exporta o roteador para ser utilizado na aplicação principal
module.exports = router;
