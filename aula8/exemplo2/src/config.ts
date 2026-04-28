export function lerConfig(): {
  mongoUri: string;
  mongoDb: string;
  ollamaBaseUrl: string;
  ollamaModel: string;
} {
  return {
    mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017",
    mongoDb: process.env.MONGODB_DB ?? "ts_avancado_aula8_ex2",
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434",
    ollamaModel: process.env.OLLAMA_MODEL ?? "llama3.2",
  };
}
