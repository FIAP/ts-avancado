import type { CalculadoraImpostoRenda } from "../application/ports/calculadora-ir.port.js";

/** Exemplo didático: 20% sobre retorno bruto acima de 200 por ativo. */
export class CalculadoraIrProgressiva implements CalculadoraImpostoRenda {
  estimarImpostoSobreRetornoBruto(retornoBruto: number): number {
    return retornoBruto > 200 ? retornoBruto * 0.2 : 0;
  }
}
