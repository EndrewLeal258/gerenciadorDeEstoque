const {
  adicionarProduto,
  listarProdutos,
  removerProduto,
} = require("./produtos");

const { calcularValorEstoque, listarEstoqueBaixo } = require("./estoque");

adicionarProduto("Teclado", 120, 4);
removerProduto(1);

listarProdutos();
listarEstoqueBaixo();

console.log(
  "\nValor total:",
  calcularValorEstoque().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }),
);
