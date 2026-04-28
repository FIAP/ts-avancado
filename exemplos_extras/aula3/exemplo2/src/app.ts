import { CadastroUsuarioService } from "#app/application/cadastro-usuario.service.js";
import { SilentNotificador } from "#app/infra/silent-notificador.js";
import { IocContainer } from "#app/ioc/container.js";
import {
  criarContainerComConsole,
  registrarModuloCadastro,
} from "#app/ioc/registrar-modulo-app.js";
import { TOKENS } from "#app/ioc/tokens.js";

function main(): void {
  const email = "joao@exemplo.com";

  console.log("--- IoC: container registra dependências; app só resolve o serviço ---");
  const container = criarContainerComConsole();
  const cadastro = container.resolve<CadastroUsuarioService>(TOKENS.cadastroUsuario);
  cadastro.registrar(email);

  console.log(
    "\n--- Mesmos tokens: troca só o registro de Notificador (sem mudar CadastroUsuarioService) ---",
  );
  const outro = new IocContainer();
  registrarModuloCadastro(outro, () => new SilentNotificador());
  const cadastroSilencioso = outro.resolve<CadastroUsuarioService>(
    TOKENS.cadastroUsuario,
  );
  cadastroSilencioso.registrar(email);
}

main();
