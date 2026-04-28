/**
 * Valor monetário em centavos para evitar erros cumulativos de ponto flutuante.
 */
export class Dinheiro {
  private constructor(private readonly centavos: number) {}

  static zero(): Dinheiro {
    return new Dinheiro(0);
  }

  static deCentavos(centavos: number): Dinheiro {
    if (!Number.isFinite(centavos) || !Number.isInteger(centavos)) {
      throw new Error("Centavos deve ser um inteiro.");
    }
    return new Dinheiro(centavos);
  }

  static deReais(reais: number): Dinheiro {
    if (!Number.isFinite(reais)) {
      throw new Error("Valor em reais inválido.");
    }
    return new Dinheiro(Math.round(reais * 100));
  }

  somar(outro: Dinheiro): Dinheiro {
    return new Dinheiro(this.centavos + outro.centavos);
  }

  igualZero(): boolean {
    return this.centavos === 0;
  }

  aplicarPorcentagemAnualAoLongoDosMeses(percentualAnual: number): Dinheiro {
    if (!Number.isFinite(percentualAnual)) {
      throw new Error("Porcentagem anual inválida.");
    }
    const proporcaoPorMes = percentualAnual / 100 / 12;
    const centavosAR = Math.round(this.centavos * proporcaoPorMes);
    return new Dinheiro(centavosAR);
  }

  multiplicarInteiro(vezes: number): Dinheiro {
    if (!Number.isInteger(vezes)) {
      throw new Error("Somente valores inteiros para quantidades.");
    }
    return new Dinheiro(this.centavos * vezes);
  }

  valorEmCentavos(): number {
    return this.centavos;
  }

  valorEmReais(): number {
    return this.centavos / 100;
  }
}
