import express from "express";

const avaliacoesRiscoIncendio = [
    {
        id: 1,
        urlImagem: "https://projetocolabora.com.br/wp-content/uploads/2022/08/20220819queimadaapui-cristianbraga-greenpeace.jpg",
        descricao: "Imagem de uma floresta densa com vegetação verde e árvores altas.",
        textoAlternativo: "Floresta densa com árvores altas.",
        grauRiscoIncendio: "alto"
    },
    {
        id: 2,
        urlImagem: "https://img.freepik.com/fotos-premium/caminhoes-de-bombeiros-estao-pegando-fogo-em-um-predio-que-esta-queimando_717440-6523.jpg",
        descricao: "Imagem de uma região urbana com fumaça visível ao fundo.",
        textoAlternativo: "Fumaça visível em área urbana.",
        grauRiscoIncendio: "médio"
    },
    {
        id: 3,
        urlImagem: "https://portalimbiara.com.br/dados/noticia/12427/imagem/whatsapp-image-2023-03-20-at-15-40-46.jpeg",
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