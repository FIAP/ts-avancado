import { ChatOllama } from "@langchain/ollama";

async function main(): Promise<void> {
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
    baseUrl: "http://localhost:11434",
  });

  const response = await model.invoke([
    {
      role: "system",
      content: "Você é um assistente técnico que responde de forma curta e clara.",
    },
    {
      role: "user",
      content: "Explique em uma frase o que é LangChain.",
    },
  ]);

  console.log(response.content);
}

main().catch(console.error);
