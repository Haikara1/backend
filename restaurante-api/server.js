import express from "express" //Tras o Express para o projeto

const app = express(); //Cria o servidor

app.use(express.json()) //Significa: "Express, quando chegar JSON no corpo de uma requisição, transforme isso em um objeto JavaScript para mim". Sem isso o Node não vai conseguir ler corretamente o req.body

const PORT = 3000;


const produtos = [
    {
        id: 1,
        nome: "Pizza Calabresa",
        categoria: "Pizza",
        preco: 42.90
    },
    {
        id: 2,
        nome: "X-Bacon",
        categoria: "Hambúrguer",
        preco: 28.90
    },
    {
        id: 3,
        nome: "Temaki Salmão",
        categoria: "Temaki",
        preco: 32.50
    },
    {
        id: 4,
        nome: "Açaí",
        categoria: "Açaí",
        preco: 12.50
    },
    {
        id: 5,
        nome: "Picolé de Limão",
        categoria: "Picolé",
        preco: 7.50
    }
];


//Significa que se alguém fizer: GET / executa essa função abaixo.
app.get("/", (req, res) => {
    res.send("API do restaurante funcionando!") // É a resposta que o servidor manda
})

app.get("/cardapio", (req, res) => {
    res.json(produtos) // Significa: "Node, pega esse array JavaScript e manda para o cliente como JSON"
})

app.get("/produtos", (req, res) => {
    res.json(produtos)
})

app.get("/produtos/:id", (req, res) => { //O :id significa: "Essa parte da URL pode mudar"
    const id = Number(req.params.id)  //Convertendo String para Number

    const produto = produtos.find( //Procura o produto correspondente
        produto => produto.id === id
    )
    if(!produto) { // Verificação para caso o cliente peça algo que não existe
        return res.status(404).json({
            erro: "Produto não encontrado."
        })
    }
    res.json(produto)
})

//---------------------------------------------//
// USANDO POST //
// USANDO POST //
app.post("/produtos", (req, res) => {

    const { nome, categoria, preco } = req.body;

    // Valida os campos obrigatórios
    if (!nome || !categoria || preco === undefined) {
        return res.status(400).json({
            erro: "Nome, categoria e preço são obrigatórios."
        });
    }

    // Valida o preço
    if (typeof preco !== "number" || preco <= 0) {
        return res.status(400).json({
            erro: "O preço precisa ser um número maior que zero."
        });
    }

    // Só cria o produto depois que os dados foram validados
    const novoProduto = {
        id: produtos.length + 1,
        nome,
        categoria,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});








app.listen(PORT, () => { // É basicamente: "Node, fique ouvindo pedidos na porta 3000"
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})


