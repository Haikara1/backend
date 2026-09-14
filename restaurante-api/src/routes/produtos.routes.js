import express from "express";

import {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    removerProduto
} from "../controllers/produtos.controller.js";

const router = express.Router();

router.get("/", listarProdutos);

router.get("/:id", buscarProdutoPorId);

router.post("/", criarProduto);

router.patch("/:id", atualizarProduto);

router.delete("/:id", removerProduto);

export default router;