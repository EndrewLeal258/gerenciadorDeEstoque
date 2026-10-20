const produtos = [
  { id: 1, nome: "Camisa", preco: 150, estoque: 5 },
  { id: 2, nome: "Tênis", preco: 300, estoque: 2 },
  { id: 3, nome: "Boné", preco: 80, estoque: 10 },
];

function adicionarProduto(nome, preco, estoque) {
  if (typeof nome !== "string" || nome.trim() === "") {
    console.log("Nome inválido.\n");
    return;
  }

  if (!Number.isFinite(preco) || preco <= 0) {
    console.log("Preço inválido.\n");
    return;
  }

  if (Number.isInteger(estoque) === false || estoque < 0) {
    console.log("Estoque inválido.\n");
    return;
  }

  const novoId = Math.max(0, ...produtos.map((produto) => produto.id)) + 1;

  const novoProduto = {
    id: novoId,
    nome: nome.trim(),
    preco,
    estoque,
  };

  produtos.push(novoProduto);
  console.log(`\nProduto ${novoProduto.nome} cadastrado com sucesso!\n`);
}

function listarProdutos() {
  for (const produto of produtos) {
    console.log(
      `${produto.id} - ${produto.nome} | ` +
        `Preço: ${produto.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })} | Estoque: ${produto.estoque}`,
    );
  }
}

function removerProduto(id) {
  if (!Number.isInteger(id) || id <= 0) {
    console.log("ID inválido. Informe um número inteiro positívo.\n");
    return;
  }

  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    console.log("Produto não encontrado.\n");
    return;
  }

  const produtoRemovido = produtos.splice(indice, 1)[0];

  console.log(`\nProduto ${produtoRemovido.nome} removido com sucesso.\n`);
}

module.exports = {
  produtos,
  adicionarProduto,
  listarProdutos,
  removerProduto,
};
