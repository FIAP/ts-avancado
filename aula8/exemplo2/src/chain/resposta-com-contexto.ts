import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export function criarCadeiaRespostaComContexto(opcoes: {
  baseUrl: string;
  model: string;
  temperature?: number;
}) {
  const model = new ChatOllama({
    model: opcoes.model,
    temperature: opcoes.temperature ?? 0.1,
    baseUrl: opcoes.baseUrl,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `Você é um assistente técnico. Priorize o contexto abaixo: se ele responder à pergunta, responda com base nele de forma clara e objetiva.
Só diga que a base não cobre o tema se o contexto for vazio ou claramente irrelevante.

Contexto da base de conhecimento (MongoDB):
{contexto}`,
    ],
    ["human", "{pergunta}"],
  ]);

  return prompt.pipe(model).pipe(new StringOutputParser());
}
