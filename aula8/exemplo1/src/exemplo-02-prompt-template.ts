import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

async function main(): Promise<void> {
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
    baseUrl: "http://localhost:11434",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Você é um professor de TypeScript e IA. Responda de forma didática.",
    ],
    [
      "human",
      "Explique o conceito de {tema} em no máximo 5 linhas e dê um exemplo simples.",
    ],
  ]);

  const finalPrompt = await prompt.formatMessages({
    tema: "LangChain",
  });

  const response = await model.invoke(finalPrompt);

  console.log(response.content);
}

main().catch(console.error);
