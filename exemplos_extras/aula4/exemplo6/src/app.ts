import { ServicoSaque } from "#app/application/servico-saque.js";
import { ContaCorrenteDebitavel } from "#app/domain/conta-corrente-debitavel.js";
import { ContaSalarioApenasCredito } from "#app/domain/conta-salario-apenas-credito.js";

function main(): void {
  const servico = new ServicoSaque();

  console.log("LSP na modelagem: ServicoSaque só recebe ContaDebitavel.");
  console.log("ContaSalarioApenasCredito não implementa débito — não pode ser passada por engano (erro de tipo).\n");

  const corrente = new ContaCorrenteDebitavel(50_000);
  console.log("Conta corrente: saldo antes (centavos)", corrente.obterSaldoCentavos());
  servico.executar(corrente, 100);
  console.log("Após saque R$ 100,00:", corrente.obterSaldoCentavos());

  const salario = new ContaSalarioApenasCredito(50_000);
  console.log("\nConta salário: saldo (centavos)", salario.obterSaldoCentavos());
  console.log("servico.executar(salario, 100) não compila — ContaSalarioApenasCredito não é ContaDebitavel.");
}

main();
