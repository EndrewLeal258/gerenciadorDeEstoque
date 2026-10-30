const express = require("express");
const { produtos, adicionarProduto, removerProduto } = require("./produtos");

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

app.delete("/produtos:id", (req, res) => {});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
