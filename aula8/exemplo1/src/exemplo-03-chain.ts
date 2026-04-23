import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main(): Promise<void> {
  const model = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
    baseUrl: "http://localhost:11434",
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `Você é um especialista em TypeScript.
Explique o conceito "{conceito}" de forma objetiva e finalize com um exemplo curto.`,
  );

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const response = await chain.invoke({
    conceito: "interfaces no TypeScript",
  });

  console.log(response);
}

main().catch(console.error);
