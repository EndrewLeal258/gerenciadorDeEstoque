const test = require("node:test");
const assert = require("node:assert/strict");

const { calcularValorEstoque } = require("./estoque");
const { produtos, removerProduto, adicionarProduto } = require("./produtos");

const produtosIniciais = [
  { id: 1, nome: "Camisa", preco: 150, estoque: 5 },
  { id: 2, nome: "Tênis", preco: 300, estoque: 2 },
  { id: 3, nome: "Boné", preco: 80, estoque: 10 },
];

function restaurarProdutos() {
  produtos.splice(0, produtos.length, ...produtosIniciais);
}

test.beforeEach(() => {
  restaurarProdutos();
});

test("calcular o valor total do estoque inicial", () => {
  assert.equal(calcularValorEstoque(), 2150);
});

test("não remover produtos quando o ID não existe", () => {
  const quantidadeAntes = produtos.length;

  removerProduto(999);

  assert.equal(produtos.length, quantidadeAntes);
});

test("remover um produto existente", () => {
  const quantidadeAntes = produtos.length;

  removerProduto(1);

  assert.equal(produtos.length, quantidadeAntes - 1);

  const produtoRemovido = produtos.find((produto) => produto.id === 1);

  assert.equal(produtoRemovido, undefined);
});

test("adicionar um produto válido", () => {
  const quantidadeAntes = produtos.length;

  adicionarProduto("Teclado de teste", 120, 4);

  assert.equal(produtos.length, quantidadeAntes + 1);

  const produto = produtos.find((item) => item.nome === "Teclado de teste");

  assert.ok(produto);
  assert.equal(produto.preco, 120);
  assert.equal(produto.estoque, 4);
});

test("não adicionar produto com nome vazio", () => {
  const quantidadeAntes = produtos.length;

  adicionarProduto("   ", 120, 4);

  assert.equal(produtos.length, quantidadeAntes);
});

test("não adicionar produto com preço inválido", () => {
  const quantidadeAntes = produtos.length;

  adicionarProduto("Mouse", -50, 3);

  assert.equal(produtos.length, quantidadeAntes);
});

test("não adicionar produto com estoque inválido", () => {
  const quantidadeAntes = produtos.length;

  adicionarProduto("Monitor", 800, -2);

  assert.equal(produtos.length, quantidadeAntes);
});
