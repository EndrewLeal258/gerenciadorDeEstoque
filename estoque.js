const { produtos } = require("./produtos");

function calcularValorEstoque() {
  return produtos.reduce(
    (soma, produto) => soma + produto.preco * produto.estoque,
    0,
  );
}

function listarEstoqueBaixo() {
  const produtosBaixoEstoque = produtos.filter(
    (produto) => produto.estoque <= 2,
  );

  if (produtosBaixoEstoque.length === 0) {
    console.log("Nenhum produto com estoque baixo.\n");
    return;
  }

  console.log("\nProdutos com estoque baixo:\n");

  for (const produto of produtosBaixoEstoque) {
    console.log(
      `${produto.id} - ${produto.nome} | Estoque: ${produto.estoque}`,
    );
  }

  console.log("");
}

module.exports = {
  calcularValorEstoque,
  listarEstoqueBaixo,
};
