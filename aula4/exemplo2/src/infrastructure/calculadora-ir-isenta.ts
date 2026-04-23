import type { CalculadoraImpostoRenda } from "../application/ports/calculadora-ir.port.js";

export class CalculadoraIrIsenta implements CalculadoraImpostoRenda {
  estimarImpostoSobreRetornoBruto(_retornoBruto: number): number {
    return 0;
  }
}
