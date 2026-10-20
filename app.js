const {
  adicionarProduto,
  listarProdutos,
  removerProduto,
} = require("./produtos");

const { calcularValorEstoque, listarEstoqueBaixo } = require("./estoque");

listarProdutos();
adicionarProduto("Mochila", 200, 4);

listarProdutos();
listarEstoqueBaixo();

console.log(
  "\nValor total do estoque:",
  calcularValorEstoque().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }),
);

removerProduto(2);
listarProdutos();
