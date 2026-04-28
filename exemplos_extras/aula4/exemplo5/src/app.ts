import { ProcessadorSaqueGenerico } from "#app/application/processador-saque-generico.js";
import { ContaCorrenteComum } from "#app/domain/conta-corrente-comum.js";
import { ContaSalarioSemSaqueDireto } from "#app/domain/conta-salario-sem-saque-direto.js";
import type { ContaBancariaBase } from "#app/domain/conta-bancaria-base.js";

function tentarSaque(rotulo: string, conta: ContaBancariaBase, processor: ProcessadorSaqueGenerico): void {
  console.log(`\n--- ${rotulo} ---`);
  console.log("Saldo antes (centavos):", conta.obterSaldoCentavos());
  try {
    processor.executar(conta, 100);
    console.log("Saque R$ 100,00 OK. Saldo depois:", conta.obterSaldoCentavos());
  } catch (erro) {
    console.log("Falha inesperada para quem assumiu LSP:", (erro as Error).message);
  }
}

function main(): void {
  const processor = new ProcessadorSaqueGenerico();

  console.log(
    "LSP violado: ContaSalarioSemSaqueDireto estende a base mas não substitui o comportamento esperado de debitar().",
  );

  tentarSaque("Conta corrente (substituível sem surpresa)", new ContaCorrenteComum(50_000), processor);
  tentarSaque(
    "Conta salário (subtipo que quebra o chamador genérico)",
    new ContaSalarioSemSaqueDireto(50_000),
    processor,
  );
}

main();
