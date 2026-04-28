import { CadastroUsuarioAcoplado } from "#app/application/cadastro-usuario-acoplado.js";
import { CadastroUsuarioComDi } from "#app/application/cadastro-usuario-com-di.js";

import { ConsoleNotificador } from "#app/infra/console-notificador.js";
import { SilentNotificador } from "#app/infra/silent-notificador.js";

function main(): void {
  const email = "maria@exemplo.com";

  console.log("--- Cenário acoplado (cria ConsoleNotificador por dentro) ---");
  const acoplado = new CadastroUsuarioAcoplado();
  acoplado.registrar(email);

  console.log("\n--- DI: mesma regra de negócio, notificação por console ---");
  const comConsole = new CadastroUsuarioComDi(new ConsoleNotificador());
  comConsole.registrar(email);

  console.log("\n--- DI: mesma classe de negócio, notificação silenciosa (sem log de aviso) ---");
  const comSilencioso = new CadastroUsuarioComDi(new SilentNotificador());
  comSilencioso.registrar(email);
}

main();
