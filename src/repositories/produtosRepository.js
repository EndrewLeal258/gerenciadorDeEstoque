const pool = require("../config/db");

async function criarProduto(nome, preco, estoque) {
  if (typeof nome !== "string" || nome.trim() === "") {
    return { sucesso: false, mensagem: "Nome inválido." };
  }

  if (!Number.isFinite(preco) || preco <= 0) {
    return { sucesso: false, mensagem: "Preço inválido." };
  }

  if (!Number.isInteger(estoque) || estoque < 0) {
    return { sucesso: false, mensagem: "Estoque inválido." };
  }

  const resultado = await pool.query(
    `INSERT INTO produtos (nome, preco, estoque)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [nome.trim(), preco, estoque],
  );

  return {
    sucesso: true,
    mensagem: "Produto cadastrado no banco com sucesso.",
    produto: resultado.rows[0],
  };
}

async function listarProdutos() {
  const resultado = await pool.query("SELECT * FROM produtos ORDER BY id");

  return resultado.rows;
}

async function atualizarProduto(id, nome, preco, estoque) {
  if (!Number.isInteger(id) || id <= 0) {
    return {
      sucesso: false,
      mensagem: "ID inválido.",
    };
  }

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

  const resultado = await pool.query(
    `UPDATE produtos
      SET nome = $1, preco = $2, estoque = $3
      WHERE id = $4
      RETURNING *`,
    [nome.trim(), preco, estoque, id],
  );

  if (resultado.rows.length === 0) {
    return {
      sucesso: false,
      mensagem: "Produto não encontrado.",
    };
  }

  return {
    sucesso: true,
    mensagem: "Produto atualizado com sucesso.",
    produto: resultado.rows[0],
  };
}

async function removerProduto(id) {
  if (!Number.isInteger(id) || id <= 0) {
    return {
      sucesso: false,
      mensagem: "ID inválido.",
    };
  }

  const resultado = await pool.query(
    `DELETE FROM produtos
    WHERE id = $1
    RETURNING *`,
    [id],
  );

  if (resultado.rows.length === 0) {
    return {
      sucesso: false,
      mensagem: "Produto não encontrado.",
    };
  }

  return {
    sucesso: true,
    mensagem: "Produto removido com sucesso.",
    produto: resultado.rows[0],
  };
}

module.exports = {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  removerProduto,
};
