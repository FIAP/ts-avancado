import { lerConfig } from "./config.js";
import { criarCadeiaRespostaComContexto } from "./chain/resposta-com-contexto.js";
import { conectarMongo, obterDb } from "./infra/mongo.js";
import {
  garantirBaseConhecimento,
  montarContextoPorPergunta,
} from "./repository/conhecimento.repository.js";
import {
  listarUltimasInteracoes,
  salvarInteracao,
} from "./repository/interacoes.repository.js";

async function main(): Promise<void> {
  const config = lerConfig();
  const pergunta =
    process.argv.slice(2).join(" ").trim() ||
    "O que é tipagem no TypeScript e como o strict ajuda?";

  console.log("Conectando ao MongoDB:", config.mongoUri);
  const cliente = await conectarMongo(config.mongoUri);
  const db = obterDb(cliente, config.mongoDb);

  try {
    await garantirBaseConhecimento(db);
    const contexto = await montarContextoPorPergunta(db, pergunta);

    console.log("\n--- Contexto montado a partir do MongoDB (amostra) ---\n");
    const amostra = contexto.length > 900 ? `${contexto.slice(0, 900)}...` : contexto;
    console.log(amostra);

    const cadeia = criarCadeiaRespostaComContexto({
      baseUrl: config.ollamaBaseUrl,
      model: config.ollamaModel,
    });

    console.log(
      `\n--- LangChain + Ollama (${config.ollamaModel} @ ${config.ollamaBaseUrl}) ---\n`,
    );
    const resposta = await cadeia.invoke({ contexto, pergunta });
    console.log(resposta);

    await salvarInteracao(db, {
      pergunta,
      resposta,
      modelo: config.ollamaModel,
      criadoEm: new Date(),
    });
    console.log("\nRegistro salvo na coleção interacoes.");

    const ultimas = await listarUltimasInteracoes(db, 5);
    console.log("\n--- Últimas interações persistidas ---");
    for (const item of ultimas) {
      const trecho =
        item.pergunta.length > 70
          ? `${item.pergunta.slice(0, 70)}...`
          : item.pergunta;
      console.log(
        `- ${item.criadoEm.toISOString()} | ${item.modelo} | ${trecho}`,
      );
    }
  } finally {
    await cliente.close();
  }
}

main().catch((erro: unknown) => {
  console.error(erro);
  process.exitCode = 1;
});
