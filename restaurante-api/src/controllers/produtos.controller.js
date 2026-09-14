import pool from "../config/database.js";

export async function listarProdutos(req, res) {
    try {
        const resultado = await pool.query(
            "SELECT * FROM produtos ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function buscarProdutoPorId(req, res) {
    const id = Number(req.params.id);

    try {
        const resultado = await pool.query(
            "SELECT * FROM produtos WHERE id = $1",
            [id]
        );

        const produto = resultado.rows[0];

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.json(produto);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}
export async function criarProduto(req, res) {
    const { nome, categoria, preco } = req.body;

    if (!nome || !categoria || preco === undefined) {
        return res.status(400).json({
            erro: "Nome, categoria e preço são obrigatórios."
        });
    }

    if (typeof preco !== "number" || preco <= 0) {
        return res.status(400).json({
            erro: "O preço precisa ser um número maior que zero."
        });
    }

    try {
        const resultado = await pool.query(
            `
            INSERT INTO produtos (nome, categoria, preco)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [nome, categoria, preco]
        );

        const novoProduto = resultado.rows[0];

        res.status(201).json(novoProduto);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function atualizarProduto(req, res) {
    const id = Number(req.params.id);
    const { nome, categoria, preco } = req.body;

    if (preco !== undefined) {
        if (typeof preco !== "number" || preco <= 0) {
            return res.status(400).json({
                erro: "O preço precisa ser um número maior que zero."
            });
        }
    }

    try {
        const resultado = await pool.query(
            `
            UPDATE produtos
            SET
                nome = COALESCE($1, nome),
                categoria = COALESCE($2, categoria),
                preco = COALESCE($3, preco)
            WHERE id = $4
            RETURNING *
            `,
            [
                nome ?? null,
                categoria ?? null,
                preco ?? null,
                id
            ]
        );

        const produtoAtualizado = resultado.rows[0];

        if (!produtoAtualizado) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.json(produtoAtualizado);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function removerProduto(req, res) {
    const id = Number(req.params.id);

    try {
        const resultado = await pool.query(
            `
            DELETE FROM produtos
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        const produtoRemovido = resultado.rows[0];

        if (!produtoRemovido) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Produto removido com sucesso.",
            produto: produtoRemovido
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}