import { getTodasAvaliacoesRiscoIncendio, criarAvaliacaoRiscoIncendio } from "../models/avaliacoesRiscoIncendioModel.js";

export async function listarAvaliacoesRiscoIncendio(req, res) {
    // Chama a função para obter as avaliações
    const avaliacoesRiscoIncendio = await getTodasAvaliacoesRiscoIncendio();

    // Envia uma resposta HTTP com status 200 (sucesso) e os dados das avaliações no formato JSON
    res.status(200).json(avaliacoesRiscoIncendio);
}

export async function postarAvaliacaoRiscoIncendio(req, res) {
    const novaAvaliacaoRiscoIncendio = req.body;

    try {
        const novaAvaliacaoRiscoIncendioCriada = await criarAvaliacaoRiscoIncendio(novaAvaliacaoRiscoIncendio);

        // Envia uma resposta HTTP com status 200 (sucesso) e os dados das avaliações no formato JSON
        res.status(200).json(novaAvaliacaoRiscoIncendioCriada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}