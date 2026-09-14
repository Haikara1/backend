import express from "express";

import produtosRoutes from "./routes/produtos.routes.js";
import pool from "./config/database.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API do restaurante funcionando!");
});

app.use("/produtos", produtosRoutes);

try {
    const resultado = await pool.query("SELECT NOW()");

    console.log(
        "PostgreSQL conectado:",
        resultado.rows[0]
    );
} catch (error) {
    console.error(
        "Erro ao conectar ao PostgreSQL:",
        error.message
    );
}

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});