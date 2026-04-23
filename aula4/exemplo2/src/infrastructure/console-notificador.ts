import type { Notificador } from "../application/ports/notificador.port.js";

export class ConsoleNotificador implements Notificador {
  publicar(canal: string, mensagem: string): void {
    console.log(`[${canal}] ${mensagem}`);
  }
}
