import conectarAoBanco from "../config/dbConfig.js";

// Cria uma conexão com o banco de dados MongoDB usando a string de conexão fornecida. 
// A função `conectarAoBanco` provavelmente se conecta a um banco de dados MongoDB.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todas as avaliações de risco de incêndio do banco de dados
export async function getTodasAvaliacoesRiscoIncendio() {
    // Seleciona o banco de dados "FlameFinder"
    const db = conexao.db("FlameFinder");

    // Seleciona a coleção "AvaliacoesRiscoIncendio" dentro do banco de dados
    const colecao = db.collection("AvaliacoesRiscoIncendio");

    // Retorna um array de todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarAvaliacaoRiscoIncendio(novaAvaliacaoRiscoIncendio) {
    // Seleciona o banco de dados "FlameFinder"
    const db = conexao.db("FlameFinder");

    // Seleciona a coleção "AvaliacoesRiscoIncendio" dentro do banco de dados
    const colecao = db.collection("AvaliacoesRiscoIncendio");

    return colecao.insertOne(novaAvaliacaoRiscoIncendio);
}