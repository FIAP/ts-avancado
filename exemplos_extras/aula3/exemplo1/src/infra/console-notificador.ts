import type { Notificador } from "#app/domain/notificador.interface.js";

export class ConsoleNotificador implements Notificador {
  enviar(mensagem: string): void {
    console.log("[ConsoleNotificador]", mensagem);
  }
}
