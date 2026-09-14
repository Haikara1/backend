import express from "express";
import produtosRoutes from "./routes/produtos.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API do restaurante funcionando!");
});

app.use("/produtos", produtosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});