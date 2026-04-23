import type { Logger } from "./logger.interface.js";

export class ConsoleLogger implements Logger {
  private contagem = 0;

  info(mensagem: string): void {
    this.contagem += 1;
    console.log(`[log #${this.contagem}] ${mensagem}`);
  }
}
