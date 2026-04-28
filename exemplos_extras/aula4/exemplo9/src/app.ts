import { ServicoSaqueAcoplado } from "#app/application/servico-saque-acoplado.js";
import { ContaCorrente } from "#app/domain/conta-corrente.js";

function fmt(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function main(): void {
  console.log(
    "DIP violado: ServicoSaqueAcoplado instancia AuditoriaSaqueConsole e CalculadoraTarifaSaqueUmPorCento no próprio corpo da classe.\n",
  );

  const servico = new ServicoSaqueAcoplado();
  const conta = new ContaCorrente("cc-demo", 50_000);
  const r = servico.executar(conta, 100);
  console.log(
    `\nResumo: tarifa ${fmt(r.tarifaCentavos)} | total debitado ${fmt(r.totalDebitadoCentavos)} | saldo ${fmt(conta.obterSaldoCentavos())}`,
  );
}

main();
