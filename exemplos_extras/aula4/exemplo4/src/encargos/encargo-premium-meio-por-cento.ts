import type { PoliticaEncargoSaque } from "#app/encargos/politica-encargo-saque.js";

export class EncargoPremiumMeioPorCento implements PoliticaEncargoSaque {
  calcularTarifaCentavos(valorSaqueCentavos: number): number {
    return Math.round(valorSaqueCentavos * 0.005);
  }
}
