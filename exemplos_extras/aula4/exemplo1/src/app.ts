import { GestorFinanceiroMonolitico } from "#app/domain/gestor-financeiro-monolitico.js";

function main(): void {
  const gestor = new GestorFinanceiroMonolitico();
  const cpf = "12345678909";

  console.log("Exemplo didático: UMA classe faz validação, tarifa, saldo, log e comprovante.\n");

  console.log(gestor.processarDeposito(250, cpf));
  console.log("");
  console.log(gestor.processarSaque(100, cpf));
  console.log("");
  console.log("Saldo final:", gestor.obterSaldoEmReais());
}

main();
