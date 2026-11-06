const {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  removerProduto,
} = require("../repositories/produtosRepository");

async function listar(req, res) {
  try {
    const produtos = await listarProdutos();
    res.json(produtos);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({
      mensagem: "Erro ao buscar produto.",
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, preco, estoque } = req.body ?? {};

    const resultado = await criarProduto(nome, preco, estoque);

    if (!resultado.sucesso) {
      return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({
      mensagem: "Erro ao cadastrar produto.",
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = Number(req.params.id);
    const { nome, preco, estoque } = req.body ?? {};

    const resultado = await atualizarProduto(id, nome, preco, estoque);

    if (!resultado.sucesso) {
      const status =
        resultado.mensagem === "Produto não encontrado." ? 400 : 404;

      return res.status(status).json(resultado);
    }

    res.json(resultado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({
      mensagem: "Erro ao atulizar produto.",
    });
  }
}

async function remover(req, res) {
  try {
    const id = Number(req.params.id);

    const resultado = await removerProduto(id);

    if (!resultado.sucesso) {
      const status = (resultado.mensagem = "Produto não encontrado."
        ? 400
        : 404);

      return res.status(status).json(resultado);
    }

    res.json(resultado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({
      mensagem: "Erro ao remover produto.",
    });
  }
}

module.exports = {
  listar,
  criar,
  atualizar,
  remover,
};
