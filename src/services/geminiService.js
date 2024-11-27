import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function gerarDescricaoComGemini(imageBuffer, mimeType) {
  const prompt = "Gere uma descrição, tudo em 1 parágrafo, com 6 linhas dessa imagem. As linhas não devem ser puladas.";

  if (!Buffer.isBuffer(imageBuffer)) {
    throw new Error("O imageBuffer não é válido.");
  }

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType || "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);

    let descricao = res.response.text() || "Descrição não disponível.";

    // Generaliza a remoção de introduções com base em delimitadores
    const delimitadores = [":", "\n\n"]; // Lista de delimitadores possíveis
    for (const delimitador of delimitadores) {
      const pos = descricao.indexOf(delimitador);
      if (pos !== -1) {
        descricao = descricao.substring(pos + delimitador.length).trim();
        break; // Sai do loop após encontrar e processar o primeiro delimitador válido
      }
    }

    return descricao;
  } catch (erro) {
    console.error("Erro ao obter descrição:", erro.message, erro);
    throw new Error("Erro ao obter a descrição do Gemini.");
  }
}

export async function gerarGrauRiscoIncendioComGemini(imageBuffer, mimeType) {
  const prompt =
    `Com base na imagem, avalie o grau de risco de incêndio utilizando os seguintes critérios:

  Para cores vivas, como vermelho, laranja e amarelo, considere um risco Alto ou Médio.
  Para tons predominantemente cinza ou preto como se vê em fumaças, considere um risco Baixo.
  Responda com apenas uma palavra: Alto, Médio ou Baixo`;

  if (!Buffer.isBuffer(imageBuffer)) {
    throw new Error("O imageBuffer não é válido.");
  }

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType || "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Não foi possível determinar o grau de risco.";
  } catch (erro) {
    console.error("Erro ao obter grau de risco:", erro.message, erro);
    throw new Error("Erro ao obter o grau de risco do Gemini.");
  }
}
