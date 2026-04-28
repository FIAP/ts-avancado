import type { PoliticaEncargoSaque } from "#app/portas/politica-encargo-saque.js";

export class EncargoIsento implements PoliticaEncargoSaque {
  calcularTarifaCentavos(_valorSaqueCentavos: number): number {
    return 0;
  }
}
