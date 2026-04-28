import type { PoliticaEncargoSaque } from "#app/encargos/politica-encargo-saque.js";

/** Exemplo de extensão OCP: nova política em arquivo novo, sem mudar ServicoSaque. */
export class EncargoVipZeroPontoDoisPorCento implements PoliticaEncargoSaque {
  calcularTarifaCentavos(valorSaqueCentavos: number): number {
    return Math.round(valorSaqueCentavos * 0.002);
  }
}
