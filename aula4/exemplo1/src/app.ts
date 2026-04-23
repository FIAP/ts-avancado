import { InvestimentoService as ServicoRuim } from "./bad/investimento.service.js";
import { Acao } from "./good/domain/acao.js";
import { FundoImobiliario } from "./good/domain/fundo.js";
import type { Investimento } from "./good/domain/investimento.interface.js";
import { MemoryRepository } from "./good/repository/memory.repository.js";
import { InvestimentoService } from "./good/service/investimento.service.js";

console.log("--- Abordagem sem SOLID (src/bad) ---");
const legado = new ServicoRuim();
console.log("acao 10000:", legado.calcular("acao", 10000));
console.log("fii 5000:", legado.calcular("fii", 5000));

console.log("");
console.log("--- LSP (4.4): substituição segura pelo contrato ---");
const investimentos: Investimento[] = [
  new Acao(1000),
  new FundoImobiliario(1000),
];
investimentos.forEach((i) => {
  console.log(i.calcularRetorno());
});

console.log("");
console.log("--- 4.7 Execução final: SOLID + DIP (comparação com o legado acima) ---");
const repo = new MemoryRepository<Investimento>();
const service = new InvestimentoService(repo);
service.adicionar(new Acao(10000));
service.adicionar(new FundoImobiliario(5000));
console.log("Total:", service.calcularTotal());
