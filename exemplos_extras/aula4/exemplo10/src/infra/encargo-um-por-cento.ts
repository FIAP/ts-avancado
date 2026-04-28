import type { PoliticaEncargoSaque } from "#app/portas/politica-encargo-saque.js";

export class EncargoUmPorCento implements PoliticaEncargoSaque {
  calcularTarifaCentavos(valorSaqueCentavos: number): number {
    return Math.round(valorSaqueCentavos * 0.01);
  }
}
