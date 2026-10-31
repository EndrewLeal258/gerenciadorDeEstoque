const express = require("express");
const {
  produtos,
  adicionarProduto,
  removerProduto,
  atualizarProduto,
} = require("./produtos");

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Gerenciador de Estoque funcionando!");
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.post("/produtos", (req, res) => {
  const { nome, preco, estoque } = req.body ?? {};

  const resultado = adicionarProduto(nome, preco, estoque);

  if (!resultado.sucesso) {
    return res.status(400).json(resultado);
  }

  res.status(201).json(resultado);
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

app.put("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco, estoque } = req.body ?? {};

  const resultado = atualizarProduto(id, nome, preco, estoque);

  if (!resultado.sucesso) {
    const status = resultado.mensagem === "Produto não encontrado." ? 400 : 404;

    return res.status(status).json(resultado);
  }

  res.json(resultado);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
