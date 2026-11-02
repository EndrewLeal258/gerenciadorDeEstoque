const pool = require("./db");

async function testarConexao() {
  try {
    const resultado = await pool.query("SELECT NOW()");

    console.log("Conexão com PostgreSQL realizada!");
    console.log("Horário do banco:", resultado.rows[0].now);
  } catch (erro) {
    console.log("Erro ao conectar:", erro.menssage);
  } finally {
    await pool.end();
  }
}

testarConexao();
