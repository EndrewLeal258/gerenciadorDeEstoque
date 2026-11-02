const express = require("express");
const { produtos, adicionarProduto, removerProduto } = require("./produtos");
const {
  criarProduto,
  listarProdutos,
  atualizarProduto,
} = require("./produtosRepository");

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Gerenciador de Estoque funcionando!");
});

app.get("/produtos", async (req, res) => {
  try {
    const produtos = await listarProdutos();

    res.json(produtos);
  } catch (erro) {
    console.log("Erro ao lista produtos:", erro.message);

    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao buscar produtos.",
    });
  }
});

app.post("/produtos", async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body ?? {};

    const resultado = await criarProduto(nome, preco, estoque);

    if (!resultado.sucesso) {
      return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);
  } catch (erro) {
    console.log("Erro no cadastro do produto:", erro.message);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno do servidor",
    });
  }
});

app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);

  const resultado = removerProduto(id);

  if (!resultado.sucesso) {
    const status = resultado.mensagem === "ID inválido." ? 400 : 404;
    return res.status(status).json(resultado);
  }

  res.json(resultado);
});

app.put("/produtos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, preco, estoque } = req.body ?? {};

    const resultado = await atualizarProduto(id, nome, preco, estoque);

    if (!resultado.sucesso) {
      const status =
        resultado.mensagem === "Produto não encontrado." ? 400 : 404;

      return res.status(status).json(resultado);
    }

    res.json(resultado);
  } catch (erro) {
    console.log("Erro ao atualizar produto:", erro.message);

    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao atualzar o produto.",
    });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
