import { ContaCorrente } from "#app/domain/conta-corrente.js";
import { ServicoSaque } from "#app/application/servico-saque.js";
import { EncargoPadraoUmPorCento } from "#app/encargos/encargo-padrao-um-por-cento.js";
import { EncargoPremiumMeioPorCento } from "#app/encargos/encargo-premium-meio-por-cento.js";
import { EncargoIsento } from "#app/encargos/encargo-isento.js";
import { EncargoVipZeroPontoDoisPorCento } from "#app/encargos/encargo-vip-zero-ponto-dois-por-cento.js";

function fmt(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function demo(rotulo: string, politicaNome: string, servico: ServicoSaque): void {
  const conta = new ContaCorrente(`cc-${politicaNome}`, 50_000);
  console.log(`\n--- ${rotulo} ---`);
  const r = servico.executar(conta, 100);
  console.log(
    `Política: ${politicaNome} | tarifa ${fmt(r.tarifaCentavos)} | saldo final ${fmt(conta.obterSaldoCentavos())}`,
  );
}

function main(): void {
  console.log(
    "OCP: ServicoSaque não muda. Novas tarifas = novas classes que implementam PoliticaEncargoSaque.",
  );

  demo("Padrão 1%", "EncargoPadraoUmPorCento", new ServicoSaque(new EncargoPadraoUmPorCento()));
  demo("Premium 0,5%", "EncargoPremiumMeioPorCento", new ServicoSaque(new EncargoPremiumMeioPorCento()));
  demo("Isento", "EncargoIsento", new ServicoSaque(new EncargoIsento()));
  demo("VIP 0,2% (extensão sem editar ServicoSaque)", "EncargoVipZeroPontoDoisPorCento", new ServicoSaque(new EncargoVipZeroPontoDoisPorCento()));
}

main();
