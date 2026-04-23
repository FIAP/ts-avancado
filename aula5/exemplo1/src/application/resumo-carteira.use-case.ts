import type { RepositorioDeAtivos } from "./ports/repositorio-ativos.port.js";

export type ResumoCarteira = {
  quantidadeAtivos: number;
  retornoBrutoTotal: number;
};

export class ResumoCarteiraUseCase {
  constructor(private readonly repositorio: RepositorioDeAtivos) {}

  executar(): ResumoCarteira {
    const ativos = this.repositorio.listar();
    const retornoBrutoTotal = ativos.reduce(
      (acc, a) => acc + a.retornoBrutoEstimado(),
      0,
    );
    return {
      quantidadeAtivos: ativos.length,
      retornoBrutoTotal,
    };
  }
}
