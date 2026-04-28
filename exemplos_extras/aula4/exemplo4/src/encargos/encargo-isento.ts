import type { PoliticaEncargoSaque } from "#app/encargos/politica-encargo-saque.js";

export class EncargoIsento implements PoliticaEncargoSaque {
  calcularTarifaCentavos(_valorSaqueCentavos: number): number {
    return 0;
  }
}
