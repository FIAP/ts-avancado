import type { Notificador } from "#app/domain/notificador.interface.js";

export class SilentNotificador implements Notificador {
  enviar(_mensagem: string): void {
    // Sem efeito visível: útil em testes ou quando não se quer notificar.
  }
}
