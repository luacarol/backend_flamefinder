import express from "express";
import multer from "multer";
import { listarAvaliacoesRiscoIncendio, postarAvaliacaoRiscoIncendio, carregarImagem, atualizarNovaAvaliacaoRiscoIncendio } from '../controllers/avaliacoesRiscoIncendioController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita o parsing de dados JSON nas requisições HTTP
    app.use(express.json());

    // Define uma rota GET para obter todas as avaliações de risco de incêndio
    app.get("/avaliacoes-risco-incendio", listarAvaliacoesRiscoIncendio);

    // Define uma rota GET para criar uma avaliação de risco de incêndio
    app.post("/avaliacao-risco-incendio", postarAvaliacaoRiscoIncendio);

    app.post("/avaliacao-risco-incendio/carregar-imagem", upload.single("imagem"), carregarImagem);

    app.put("/avaliacao-risco-incendio/:id", atualizarNovaAvaliacaoRiscoIncendio)
}

export default routes;