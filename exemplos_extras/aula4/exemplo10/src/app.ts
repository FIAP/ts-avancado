import { ServicoSaque } from "#app/application/servico-saque.js";
import { ContaCorrente } from "#app/domain/conta-corrente.js";
import { AuditoriaSaqueConsole } from "#app/infra/auditoria-saque-console.js";
import { EncargoIsento } from "#app/infra/encargo-isento.js";
import { EncargoUmPorCento } from "#app/infra/encargo-um-por-cento.js";

function fmt(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function demo(rotulo: string, servico: ServicoSaque): void {
  const conta = new ContaCorrente(`cc-${rotulo}`, 50_000);
  console.log(`\n--- ${rotulo} ---`);
  const r = servico.executar(conta, 100);
  console.log(
    `tarifa ${fmt(r.tarifaCentavos)} | total debitado ${fmt(r.totalDebitadoCentavos)} | saldo ${fmt(conta.obterSaldoCentavos())}`,
  );
}

function main(): void {
  console.log(
    "DIP: ServicoSaque depende de PoliticaEncargoSaque e PortaAuditoriaSaque. Implementações concretas vêm de fora (composição na borda).\n",
  );

  const auditoria = new AuditoriaSaqueConsole();

  demo("1% com auditoria console", new ServicoSaque(new EncargoUmPorCento(), auditoria));
  demo("Isento com a mesma auditoria", new ServicoSaque(new EncargoIsento(), auditoria));
}

main();
