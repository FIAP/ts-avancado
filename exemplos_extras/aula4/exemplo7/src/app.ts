import { ServicoLinhaExtrato } from "#app/application/servico-linha-extrato.js";
import { ContaCorrenteMultiproduto } from "#app/domain/conta-corrente-multiproduto.js";
import { ContaSalarioInterfaceGorda } from "#app/domain/conta-salario-interface-gorda.js";
import type { ContaTodasOperacoes } from "#app/domain/conta-todas-operacoes.js";

function imprimirExtrato(servico: ServicoLinhaExtrato, rotulo: string, conta: ContaTodasOperacoes): void {
  console.log(servico.formatar(conta, rotulo));
}

function main(): void {
  const extrato = new ServicoLinhaExtrato();

  console.log(
    "ISP violado: ServicoLinhaExtrato tipa ContaTodasOperacoes mesmo usando só saldo. Conta salário implementa métodos irrelevantes com throw.\n",
  );

  const corrente = new ContaCorrenteMultiproduto(50_000);
  const salario = new ContaSalarioInterfaceGorda(50_000);

  imprimirExtrato(extrato, "Extrato conta corrente", corrente);
  imprimirExtrato(extrato, "Extrato conta salário", salario);

  console.log("\nTentativas que revelam o contrato gordo na conta salário:");
  try {
    salario.debitar(100);
  } catch (e) {
    console.log("debitar:", (e as Error).message);
  }
  try {
    salario.solicitarEmprestimoPreAprovado(100_000);
  } catch (e) {
    console.log("emprestimo:", (e as Error).message);
  }
}

main();
