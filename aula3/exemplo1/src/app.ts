import { Container } from "./container/container.js";
import { Acao } from "./domain/acao.js";
import { FundoImobiliario } from "./domain/fundo-imobiliario.js";

const service = Container.getInvestimentoService();

service.adicionar(new Acao("Empresa X", 10000, 0.1));
service.adicionar(new FundoImobiliario("FII ABC", 5000));

console.log("Total (MemoryRepository via container):", service.calcularTotal());

const serviceFake = Container.getInvestimentoServiceComRepositorioFake();
serviceFake.adicionar(new Acao("Não persiste", 99999, 1));
console.log(
  "Total (FakeRepository — sem persistência real):",
  serviceFake.calcularTotal(),
);
