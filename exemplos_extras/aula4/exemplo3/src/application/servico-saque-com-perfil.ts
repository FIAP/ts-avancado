import { ContaCorrente } from "#app/domain/conta-corrente.js";
import {
  CalculadoraTarifaPorPerfilSwitch,
  type PerfilClienteEncargo,
} from "#app/encargos/calculadora-tarifa-por-perfil-switch.js";

export class ServicoSaqueComPerfil {
  constructor(private readonly calculadora: CalculadoraTarifaPorPerfilSwitch) {}

  executar(
    conta: ContaCorrente,
    valorSaqueEmReais: number,
    perfil: PerfilClienteEncargo,
  ): { tarifaCentavos: number; totalDebitadoCentavos: number } {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const valorCentavos = Math.round(valorSaqueEmReais * 100);
    const tarifa = this.calculadora.calcularTarifaCentavos(valorCentavos, perfil);
    const total = valorCentavos + tarifa;
    if (conta.obterSaldoCentavos() < total) {
      throw new Error("Saldo insuficiente (inclui tarifa).");
    }
    conta.debitar(total);
    return { tarifaCentavos: tarifa, totalDebitadoCentavos: total };
  }
}
