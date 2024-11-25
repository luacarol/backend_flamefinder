import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

async function getTodasAvaliacoesRiscoIncendio() {
    const db = conexao.db("FlameFinder");
    const colecao = db.collection("AvaliacoesRiscoIncendio");
    return colecao.find().toArray();
}

app.get("/avaliacoes-risco-incendio", async (req, res) => {
    const avaliacoesRiscoIncendio = await getTodasAvaliacoesRiscoIncendio();
    res.status(200).json(avaliacoesRiscoIncendio);
});