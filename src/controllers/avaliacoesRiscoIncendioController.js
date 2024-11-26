import { getTodasAvaliacoesRiscoIncendio, criarAvaliacaoRiscoIncendio, atualizarAvaliacaoRiscoIncendio } from "../models/avaliacoesRiscoIncendioModel.js";
import path from 'path';
import fs from "fs";

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
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}

export async function carregarImagem(req, res) {
    // Obtém a extensão do arquivo enviado dinamicamente
    const extensaoArquivo = path.extname(req.file.originalname);

    const novaAvaliacaoRiscoIncendio = {
        urlImagem: req.file.originalname,
        descricao: "",
        textoAlternativo: "",
        grauRiscoIncendio: ""
    };

    try {
        const novaAvaliacaoRiscoIncendioCriada = await criarAvaliacaoRiscoIncendio(novaAvaliacaoRiscoIncendio);

        // Usa a extensão do arquivo para criar o nome atualizado
        const imagemAtualizada = `uploads/${novaAvaliacaoRiscoIncendioCriada.insertedId}${extensaoArquivo}`;
        
        // Renomeia o arquivo com a extensão dinâmica
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(200).json(novaAvaliacaoRiscoIncendioCriada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizarNovaAvaliacaoRiscoIncendio(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    const avaliacaoRiscoIncendio = {
        urlImagem: urlImagem,
        descricao: req.body.descricao,
        textoAlternativo: req.body.textoAlternativo,
    }

    try {
        const novaAvaliacaoRiscoIncendioCriada = await atualizarAvaliacaoRiscoIncendio(id, avaliacaoRiscoIncendio);

        // Envia uma resposta HTTP com status 200 (sucesso) e os dados das avaliações no formato JSON
        res.status(200).json(novaAvaliacaoRiscoIncendioCriada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}