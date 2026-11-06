const express = require("express");
const produtosRoutes = require("./routes/produtosRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Gerenciador de Estoque funcionando!");
});

app.use("/produtos", produtosRoutes);
app.use(errorHandler);

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
