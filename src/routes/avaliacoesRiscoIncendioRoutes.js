import express from "express";
import { listarAvaliacoesRiscoIncendio, postarAvaliacaoRiscoIncendio } from '../controllers/avaliacoesRiscoIncendioController.js';

const routes = (app) => {
    // Habilita o parsing de dados JSON nas requisições HTTP
    app.use(express.json());

    // Define uma rota GET para obter todas as avaliações de risco de incêndio
    app.get("/avaliacoes-risco-incendio", listarAvaliacoesRiscoIncendio);

    // Define uma rota GET paracriar uma avaliação de risco de incêndio
    app.post("/avaliacoes-risco-incendio", postarAvaliacaoRiscoIncendio);
}

export default routes;