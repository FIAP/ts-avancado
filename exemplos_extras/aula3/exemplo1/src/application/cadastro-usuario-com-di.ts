import type { Notificador } from "#app/domain/notificador.interface.js";

// Com DI: recebe Notificador no construtor; implementações trocam sem alterar esta classe.
export class CadastroUsuarioComDi {
  constructor(private readonly notificador: Notificador) {}

  registrar(email: string): void {
    console.log(`(persistência fictícia) usuário ${email} salvo.`);
    this.notificador.enviar(`Bem-vindo, ${email}!`);
  }
}
