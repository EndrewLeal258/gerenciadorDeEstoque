const {
  adicionarProduto,
  listarProdutos,
  removerProduto,
} = require("./produtos");

const { calcularValorEstoque, listarEstoqueBaixo } = require("./estoque");

const resultado = adicionarProduto("Teclado", 120, 4);

if (resultado.sucesso) {
  console.log(resultado.mensagem);
  console.log("Produto cadastrado:", resultado.produto);
} else {
  console.log("Erro:", resultado.mensagem);
}

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
