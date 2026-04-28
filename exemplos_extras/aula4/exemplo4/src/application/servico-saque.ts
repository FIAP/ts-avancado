import { ContaCorrente } from "#app/domain/conta-corrente.js";
import type { PoliticaEncargoSaque } from "#app/encargos/politica-encargo-saque.js";

/** Fechada para modificação: depende só da interface PoliticaEncargoSaque. */
export class ServicoSaque {
  constructor(private readonly politicaEncargo: PoliticaEncargoSaque) {}

  executar(
    conta: ContaCorrente,
    valorSaqueEmReais: number,
  ): { tarifaCentavos: number; totalDebitadoCentavos: number } {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const valorCentavos = Math.round(valorSaqueEmReais * 100);
    const tarifa = this.politicaEncargo.calcularTarifaCentavos(valorCentavos);
    const total = valorCentavos + tarifa;
    if (conta.obterSaldoCentavos() < total) {
      throw new Error("Saldo insuficiente (inclui tarifa).");
    }
    conta.debitar(total);
    return { tarifaCentavos: tarifa, totalDebitadoCentavos: total };
  }
}
