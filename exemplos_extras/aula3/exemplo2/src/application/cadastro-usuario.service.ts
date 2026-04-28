import type { Notificador } from "#app/domain/notificador.interface.js";

export class CadastroUsuarioService {
  constructor(private readonly notificador: Notificador) {}

  registrar(email: string): void {
    console.log(`(persistência fictícia) usuário ${email} salvo.`);
    this.notificador.enviar(`Bem-vindo, ${email}!`);
  }
}
