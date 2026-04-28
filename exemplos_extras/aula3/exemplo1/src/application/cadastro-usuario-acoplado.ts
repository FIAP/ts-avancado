import { ConsoleNotificador } from "#app/infra/console-notificador.js";

// Acoplado: instancia ConsoleNotificador aqui; mudar o canal exige editar esta classe.
export class CadastroUsuarioAcoplado {
  private readonly notificador = new ConsoleNotificador();

  registrar(email: string): void {
    console.log(`(persistência fictícia) usuário ${email} salvo.`);
    this.notificador.enviar(`Bem-vindo, ${email}!`);
  }
}
