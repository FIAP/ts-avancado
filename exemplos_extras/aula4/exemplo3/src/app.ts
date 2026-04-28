import { ContaCorrente } from "#app/domain/conta-corrente.js";
import { CalculadoraTarifaPorPerfilSwitch } from "#app/encargos/calculadora-tarifa-por-perfil-switch.js";
import { ServicoSaqueComPerfil } from "#app/application/servico-saque-com-perfil.js";

function fmt(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function demo(
  servico: ServicoSaqueComPerfil,
  rotulo: string,
  perfil: "PADRAO" | "PREMIUM" | "ISENTO",
): void {
  const conta = new ContaCorrente(`demo-${perfil}`, 50_000);
  console.log(`\n--- ${rotulo} (perfil ${perfil}) ---`);
  const r = servico.executar(conta, 100, perfil);
  console.log(
    `Saque R$ 100,00 | tarifa ${fmt(r.tarifaCentavos)} | saldo final ${fmt(conta.obterSaldoCentavos())}`,
  );
}

function main(): void {
  const calculadora = new CalculadoraTarifaPorPerfilSwitch();
  const servico = new ServicoSaqueComPerfil(calculadora);

  console.log(
    "OCP violado: novos perfis de tarifa exigem editar CalculadoraTarifaPorPerfilSwitch (switch).",
  );

  demo(servico, "Cliente padrão 1%", "PADRAO");
  demo(servico, "Cliente premium 0,5%", "PREMIUM");
  demo(servico, "Cliente isento", "ISENTO");
}

main();
