import { getTodasAvaliacoesRiscoIncendio, criarAvaliacaoRiscoIncendio, atualizarAvaliacaoRiscoIncendio } from "../models/avaliacoesRiscoIncendioModel.js";
import path from 'path';
import fs from "fs";
import { gerarDescricaoComGemini, gerarGrauRiscoIncendioComGemini } from "../services/geminiService.js";

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
    const extensaoArquivo = path.extname(req.file.originalname);

    const novaAvaliacaoRiscoIncendio = {
        urlImagem: req.file.originalname,
        descricao: "",
        textoAlternativo: "",
        grauRiscoIncendio: "",
        extensao: extensaoArquivo // Adiciona a extensão ao objeto
    };

    try {
        const novaAvaliacaoRiscoIncendioCriada = await criarAvaliacaoRiscoIncendio(novaAvaliacaoRiscoIncendio);

        const imagemAtualizada = `uploads/${novaAvaliacaoRiscoIncendioCriada.insertedId}${extensaoArquivo}`;
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(200).json(novaAvaliacaoRiscoIncendioCriada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizarNovaAvaliacaoRiscoIncendio(req, res) {
    const id = req.params.id;

    try {

        // Obtém todas as avaliações e localiza a correta pelo ID
        const avaliacoes = await getTodasAvaliacoesRiscoIncendio();

        // Localiza a avaliação pelo ID
        const avaliacaoExistente = avaliacoes.find(avaliacao => avaliacao._id.toString() === id);

        if (!avaliacaoExistente) {
            return res.status(404).json({ "Erro": "Avaliação não encontrada" });
        }

        // Recupera a extensão armazenada ou usa .png como fallback
        const extensaoArquivo = avaliacaoExistente.extensao || '.png';

        // Monta a URL com a extensão correta
        const urlImagem = `http://localhost:3000/${id}${extensaoArquivo}`;

        const filePath = `uploads/${id}${extensaoArquivo}`;
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo de imagem não encontrado no servidor.");
        }
        const imageBuffer = fs.readFileSync(filePath);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const grauRiscoIncendio = await gerarGrauRiscoIncendioComGemini(imageBuffer);

        const avaliacaoRiscoIncendio = {
            urlImagem: urlImagem,
            descricao: descricao,
            textoAlternativo: req.body.textoAlternativo,
            grauRiscoIncendio: grauRiscoIncendio
        };

        const novaAvaliacaoRiscoIncendioCriada = await atualizarAvaliacaoRiscoIncendio(id, avaliacaoRiscoIncendio);

        res.status(200).json(novaAvaliacaoRiscoIncendioCriada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}