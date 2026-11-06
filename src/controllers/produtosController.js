const {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  removerProduto,
} = require("../repositories/produtosRepository");

async function listar(req, res, next) {
  try {
    const produtos = await listarProdutos();
    res.status(200).json(produtos);
  } catch (erro) {
    next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const { nome, preco, estoque } = req.body ?? {};

    const resultado = await criarProduto(nome, preco, estoque);

    if (!resultado.sucesso) {
      return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);
  } catch (erro) {
    next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { nome, preco, estoque } = req.body ?? {};

    const resultado = await atualizarProduto(id, nome, preco, estoque);

    if (!resultado.sucesso) {
      const status =
        resultado.mensagem === "Produto não encontrado." ? 404 : 400;

      return res.status(status).json(resultado);
    }

    res.status(200).json(resultado);
  } catch (erro) {
    next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);

    const resultado = await removerProduto(id);

    if (!resultado.sucesso) {
      const status =
        resultado.mensagem === "Produto não encontrado." ? 404 : 400;

      return res.status(status).json(resultado);
    }

    res.json(resultado);
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  listar,
  criar,
  atualizar,
  remover,
};
