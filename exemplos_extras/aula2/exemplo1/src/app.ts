import type { Registravel } from "#app/domain/registravel.js";
import { Pedido } from "#app/domain/pedido.js";
import { criarEventoAuditoria } from "#app/domain/evento-auditoria.js";

function registrarNoPainel(item: Registravel): void {
  console.log(item.resumoParaLog());
}

function main(): void {
  const itens: Registravel[] = [
    new Pedido("p-1001", "Maria", 199.9),
    criarEventoAuditoria("a-77", "LOGIN", "usuário autenticado"),
  ];

  console.log("Mesma função para qualquer valor que cumpra a interface Registravel:");
  for (const item of itens) {
    registrarNoPainel(item);
  }
}

main();
