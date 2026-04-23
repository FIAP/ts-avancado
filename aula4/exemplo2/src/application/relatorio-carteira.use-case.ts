import type { AtivoRepository } from "./ports/ativo.repository.port.js";
import type { CalculadoraImpostoRenda } from "./ports/calculadora-ir.port.js";

export type ResumoCarteira = {
  retornoBrutoTotal: number;
  impostoTotal: number;
  retornoLiquidoTotal: number;
  quantidadeAtivos: number;
};

export class RelatorioCarteiraUseCase {
  constructor(
    private readonly repositorio: AtivoRepository,
    private readonly calculadoraIr: CalculadoraImpostoRenda,
  ) {}

  executar(): ResumoCarteira {
    const ativos = this.repositorio.listar();
    let retornoBrutoTotal = 0;
    let impostoTotal = 0;
    for (const ativo of ativos) {
      const bruto = ativo.estimarRetornoBruto();
      retornoBrutoTotal += bruto;
      impostoTotal += this.calculadoraIr.estimarImpostoSobreRetornoBruto(bruto);
    }
    return {
      retornoBrutoTotal,
      impostoTotal,
      retornoLiquidoTotal: retornoBrutoTotal - impostoTotal,
      quantidadeAtivos: ativos.length,
    };
  }
}
