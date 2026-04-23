import type { Logger } from "./logger.interface.js";

export class SilentLogger implements Logger {
  readonly mensagens: string[] = [];

  info(mensagem: string): void {
    this.mensagens.push(mensagem);
  }
}
