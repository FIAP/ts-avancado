import type { Notificador } from "#app/domain/notificador.interface.js";

export class SilentNotificador implements Notificador {
  enviar(_mensagem: string): void {}
}
