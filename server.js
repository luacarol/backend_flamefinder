import express from "express";

const avaliacoesRiscoIncendio = [
    {
        id: 1,
        urlImagem: "https://cdn.pixabay.com/photo/2020/09/12/16/53/forest-5566040_960_720.jpg",
        descricao: "Imagem de uma floresta densa com vegetação verde e árvores altas.",
        textoAlternativo: "Floresta densa com árvores altas.",
        grauRiscoIncendio: "alto"
    },
    {
        id: 2,
        urlImagem: "https://cdn.pixabay.com/photo/2019/08/23/09/37/smoke-4423858_960_720.jpg",
        descricao: "Imagem de uma região urbana com fumaça visível ao fundo.",
        textoAlternativo: "Fumaça visível em área urbana.",
        grauRiscoIncendio: "médio"
    },
    {
        id: 3,
        urlImagem: "https://cdn.pixabay.com/photo/2020/08/18/15/19/desert-5498673_960_720.jpg",
        descricao: "Imagem de um campo aberto com pouca vegetação e terreno árido.",
        textoAlternativo: "Campo aberto com terreno árido e pouca vegetação.",
        grauRiscoIncendio: "baixo"
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/avaliacoes-risco-incendio", (req, res) => {
    res.status(200).json(avaliacoesRiscoIncendio);
});

function buscarAvaliacoesRiscoIncendio(id) {
    return avaliacoesRiscoIncendio.findIndex((avaliacaoRiscoIncendio) => {
        return avaliacaoRiscoIncendio.id === Number(id);
    });
}

app.get("/avaliacoes-risco-incendio/:id", (req, res) => {
    const index = buscarAvaliacoesRiscoIncendio(req.params.id);
    res.status(200).json(avaliacoesRiscoIncendio[index]);
});