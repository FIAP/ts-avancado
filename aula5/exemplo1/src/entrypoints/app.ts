import { comporComPersistenciaEmMemoria, comporComRepositorioVazio } from "../composition/composicao.js";
import { Acao } from "../domain/acao.js";
import { FundoImobiliario } from "../domain/fundo-imobiliario.js";

console.log("=== Adaptador driven: memória (caso real) ===");
const app = comporComPersistenciaEmMemoria();
app.registrar.executar(
  new Acao("a-1", "TechBr", 10_000, 0.08),
);
app.registrar.executar(
  new FundoImobiliario("f-1", "FII Logística", 20_000, 0.003),
);
console.log("Resumo:", app.resumo.executar());

console.log("");
console.log("=== Mesmos casos de uso, adaptador que não persiste (resumo zerado) ===");
const demo = comporComRepositorioVazio();
demo.registrar.executar(new Acao("x", "Ignorado", 1, 1));
console.log("Resumo:", demo.resumo.executar());
