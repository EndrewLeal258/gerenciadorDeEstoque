const produtos = [
  { id: 1, nome: "Camisa", preco: 150, estoque: 5 },
  { id: 2, nome: "Tênis", preco: 300, estoque: 2 },
  { id: 3, nome: "Boné", preco: 80, estoque: 10 },
];

function adicionarProduto(nome, preco, estoque) {
  if (typeof nome !== "string" || nome.trim() === "") {
    return {
      sucesso: false,
      mensagem: "Nome inválido.",
    };
  }

  if (!Number.isFinite(preco) || preco <= 0) {
    return {
      sucesso: false,
      mensagem: "Preço inválido.",
    };
  }

  if (Number.isInteger(estoque) === false || estoque < 0) {
    return {
      sucesso: false,
      mensagem: "Estoque Inválido.",
    };
  }

  const novoId = Math.max(0, ...produtos.map((produto) => produto.id)) + 1;

  const novoProduto = {
    id: novoId,
    nome: nome.trim(),
    preco,
    estoque,
  };

  produtos.push(novoProduto);

  return {
    sucesso: true,
    mensagem: "Produto cadastrado com sucesso.",
    produto: novoProduto,
  };
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
    return {
      sucesso: false,
      mensagem: "ID inválido.",
    };
  }

  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    return {
      sucesso: false,
      mensagem: "Produto não encontrado.",
    };
  }

  const produtoRemovido = produtos.splice(indice, 1)[0];

  return {
    sucesso: true,
    mensagem: "Produto removido com sucesso.",
    produto: produtoRemovido,
  };
}

module.exports = {
  produtos,
  adicionarProduto,
  listarProdutos,
  removerProduto,
};
