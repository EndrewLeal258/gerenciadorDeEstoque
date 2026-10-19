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

  const novoId = produtos.length + 1;

  const novoProduto = {
    id: novoId,
    nome: nome.trim(),
    preco,
    estoque,
  };

  produtos.push(novoProduto);
  console.log(`\nProduto ${novoProduto.nome} cadastrado com sucesso!\n`);
}

function removerProduto(id) {
  const produto = produtos.findIndex((produto) => produto.id === id);

  if (produto === -1) {
    console.log("Produto não encontrado.\n");
    return;
  }

  const produtoRemovido = produtos
    .splice(produto, 1)
    .map((produto) => produto.nome);

  console.log(`Produto ${produtoRemovido} removido com sucesso.\n`);
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

function calcularValorEstoque() {
  return produtos.reduce(
    (soma, produto) => soma + produto.preco * produto.estoque,
    0,
  );
}

adicionarProduto("Mochila", 200, 4);
removerProduto(2);
listarProdutos();

console.log(
  "\nValor total do estoque:",
  calcularValorEstoque().toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }),
);

function listarEstoqueBaixo() {
  const produtosBaixoEstoque = produtos.filter(
    (produto) => produto.estoque <= 2,
  );

  if (produtosBaixoEstoque.length === 0) {
    console.log("Nenhum produto com estoque baixo.");
    return;
  }

  for (const produto of produtosBaixoEstoque) {
    console.log(
      `${produto.id} - ${produto.nome} | Estoque: ${produto.estoque}`,
    );
  }
}

console.log("\nProdutos com baixo estoque:\n");
listarEstoqueBaixo();
