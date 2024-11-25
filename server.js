import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

// Cria uma conexão com o banco de dados MongoDB usando a string de conexão fornecida. 
// A função `conectarAoBanco` provavelmente se conecta a um banco de dados MongoDB.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Inicializa o servidor Express
const app = express();

// Habilita o parsing de dados JSON nas requisições HTTP
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000");
});

// Função assíncrona para obter todas as avaliações de risco de incêndio do banco de dados
async function getTodasAvaliacoesRiscoIncendio() {
    // Seleciona o banco de dados "FlameFinder"
    const db = conexao.db("FlameFinder");

    // Seleciona a coleção "AvaliacoesRiscoIncendio" dentro do banco de dados
    const colecao = db.collection("AvaliacoesRiscoIncendio");

    // Retorna um array de todos os documentos da coleção
    return colecao.find().toArray();
}

// Define uma rota GET para obter todas as avaliações de risco de incêndio
app.get("/avaliacoes-risco-incendio", async (req, res) => {
    // Chama a função para obter as avaliações
    const avaliacoesRiscoIncendio = await getTodasAvaliacoesRiscoIncendio();

    // Envia uma resposta HTTP com status 200 (sucesso) e os dados das avaliações no formato JSON
    res.status(200).json(avaliacoesRiscoIncendio);
});