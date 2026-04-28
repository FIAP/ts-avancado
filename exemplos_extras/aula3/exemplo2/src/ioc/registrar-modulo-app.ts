import { CadastroUsuarioService } from "#app/application/cadastro-usuario.service.js";
import { ConsoleNotificador } from "#app/infra/console-notificador.js";
import type { Notificador } from "#app/domain/notificador.interface.js";
import { IocContainer } from "#app/ioc/container.js";
import { TOKENS } from "#app/ioc/tokens.js";

export function registrarModuloCadastro(
  container: IocContainer,
  criarNotificador: () => Notificador,
): void {
  container
    .registrarSingleton(TOKENS.notificador, () => criarNotificador())
    .registrarSingleton(TOKENS.cadastroUsuario, (c) => {
      const notificador = c.resolve<Notificador>(TOKENS.notificador);
      return new CadastroUsuarioService(notificador);
    });
}

export function criarContainerComConsole(): IocContainer {
  const container = new IocContainer();
  registrarModuloCadastro(container, () => new ConsoleNotificador());
  return container;
}
