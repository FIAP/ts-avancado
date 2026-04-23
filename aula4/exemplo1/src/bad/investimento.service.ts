export class InvestimentoService {
  calcular(tipo: string, valor: number): number {
    if (tipo === "acao") {
      return valor * 0.1;
    }

    if (tipo === "fii") {
      return valor * 0.06;
    }

    throw new Error("Tipo inválido");
  }
}
