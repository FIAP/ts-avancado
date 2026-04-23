import { Acao } from "#app/domain/acao.js";
import { Carteira } from "#app/domain/carteira.js";
import { FundoImobiliario } from "#app/domain/fundo-imobiliario.js";
import type { Investimento } from "#app/domain/investimento.js";

function rotuloPorTipo(ativo: Investimento): string {
  if (ativo instanceof Acao) {
    return "Ação (subclasse concreta detectada em tempo de execução)";
  }
  if (ativo instanceof FundoImobiliario) {
    return "Fundo imobiliário";
  }
  return "Investimento";
}

function main(): void {
  const referenciaPolimorfica: Investimento = new FundoImobiliario(
    "FII XYZ",
    1000,
  );

  console.log(
    "Polimorfismo (referência base, implementação concreta):",
    referenciaPolimorfica.calcularRetorno(),
  );

  const carteira: Investimento[] = [
    new Acao("Thiago SA", 10_000, 0.05),
    new FundoImobiliario("FII XYZ", 1000),
  ];

  console.log("Carteira tratada de forma uniforme:");
  for (const item of carteira) {
    console.log(
      `${item.nome} [${rotuloPorTipo(item)}]: retorno calculado = ${item.calcularRetorno()}`,
    );
  }

  const carteiraComposta = new Carteira();
  for (const ativo of carteira) {
    carteiraComposta.adicionar(ativo);
  }

  console.log(
    "Composição (Carteira): projeção agregada =",
    carteiraComposta.projecaoDeRetornoTotal(),
  );
}

main();