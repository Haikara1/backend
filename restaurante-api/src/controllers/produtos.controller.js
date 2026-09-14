import produtos from "../data/produtos.js";

export function listarProdutos(req, res) {
    res.json(produtos);
}

export function buscarProdutoPorId(req, res) {
    const id = Number(req.params.id);

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado."
        });
    }

    res.json(produto);
}

export function criarProduto(req, res) {
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

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        categoria,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
}

export function atualizarProduto(req, res) {
    const id = Number(req.params.id);

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado."
        });
    }

    const { nome, categoria, preco } = req.body;

    if (preco !== undefined) {
        if (typeof preco !== "number" || preco <= 0) {
            return res.status(400).json({
                erro: "O preço precisa ser um número maior que zero."
            });
        }
    }

    if (nome !== undefined) {
        produto.nome = nome;
    }

    if (categoria !== undefined) {
        produto.categoria = categoria;
    }

    if (preco !== undefined) {
        produto.preco = preco;
    }

    res.json(produto);
}

export function removerProduto(req, res) {
    const id = Number(req.params.id);

    const indice = produtos.findIndex(
        produto => produto.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: "Produto não encontrado."
        });
    }

    produtos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Produto removido com sucesso."
    });
}