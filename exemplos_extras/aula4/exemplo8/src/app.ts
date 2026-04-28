import { ServicoLinhaExtrato } from "#app/application/servico-linha-extrato.js";
import { ServicoSaque } from "#app/application/servico-saque.js";
import { ContaCorrenteCompleta } from "#app/domain/conta-corrente-completa.js";
import { ContaSalarioCreditoFolha } from "#app/domain/conta-salario-credito-folha.js";
import type { ContaConsultavel } from "#app/domain/contratos/conta-consultavel.js";

function main(): void {
  const extrato = new ServicoLinhaExtrato();
  const saque = new ServicoSaque();

  console.log(
    "ISP: ServicoLinhaExtrato depende só de ContaConsultavel. ServicoSaque depende só de ContaDebitavel.\n",
  );

  const corrente = new ContaCorrenteCompleta(50_000);
  const salario = new ContaSalarioCreditoFolha(50_000);

  function mostrar(conta: ContaConsultavel, rotulo: string): void {
    console.log(extrato.formatar(conta, rotulo));
  }

  mostrar(corrente, "Extrato conta corrente");
  mostrar(salario, "Extrato conta salário");

  console.log("\nSaque R$ 100,00 só onde existe ContaDebitavel (corrente):");
  saque.executar(corrente, 100);
  console.log("Saldo corrente após saque (centavos):", corrente.obterSaldoCentavos());

  console.log("\nConta salário não é ContaDebitavel: saque.executar(salario, 100) não compila.");
}

main();
