import { criarModuloCarteira } from "./composition/modulo-carteira.factory.js";
import { Acao } from "./domain/acao.js";
import type { AtivoFinanceiro } from "./domain/ativo-financeiro.interface.js";
import { Cdb } from "./domain/cdb.js";
import { FundoImobiliario } from "./domain/fii.js";
import { CalculadoraIrIsenta } from "./infrastructure/calculadora-ir-isenta.js";
import { CalculadoraIrProgressiva } from "./infrastructure/calculadora-ir-progressiva.js";
import { MemoryAtivoRepository } from "./infrastructure/memory-ativo.repository.js";

console.log("=== LSP: qualquer AtivoFinanceiro no mesmo vetor ===");
const mistura: AtivoFinanceiro[] = [
  new Acao("a-1", "TechCo", 5000, 0.08),
  new FundoImobiliario("f-1", "FII Log", 10_000, 0.005),
  new Cdb("c-1", "CDB 120d", 8000, 0.00015, 120),
];
for (const ativo of mistura) {
  console.log(`${ativo.nome}: bruto estimado = ${ativo.estimarRetornoBruto()}`);
}

console.log("");
console.log("=== Carteira compartilhada: IR progressivo vs isento (DIP + OCP) ===");
const repositorioCompartilhado = new MemoryAtivoRepository();
const comIr = criarModuloCarteira(
  new CalculadoraIrProgressiva(),
  repositorioCompartilhado,
);
const semIr = criarModuloCarteira(
  new CalculadoraIrIsenta(),
  repositorioCompartilhado,
);

comIr.registrar.executar(new Acao("x1", "Ação Alfa", 20_000, 0.12));
comIr.registrar.executar(new FundoImobiliario("x2", "FII Beta", 15_000, 0.004));
comIr.registrar.executar(new Cdb("x3", "CDB Gama", 12_000, 0.00012, 90));

console.log("");
console.log("Relatório com CalculadoraIrProgressiva:", comIr.relatorio.executar());
console.log("Relatório com CalculadoraIrIsenta (mesmos ativos):", semIr.relatorio.executar());
