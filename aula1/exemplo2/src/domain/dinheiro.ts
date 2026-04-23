export class Dinheiro {
  readonly #centavos: bigint;

  private constructor(centavos: bigint) {
    if (centavos < 0n) {
      throw new Error("Valor monetário não pode ser negativo.");
    }
    this.#centavos = centavos;
  }

  static emReais(reais: number): Dinheiro {
    if (!Number.isFinite(reais) || reais < 0) {
      throw new Error("Use um valor em reais finito e não negativo.");
    }
    return new Dinheiro(BigInt(Math.round(reais * 100)));
  }

  static zero(): Dinheiro {
    return new Dinheiro(0n);
  }

  somar(outro: Dinheiro): Dinheiro {
    return new Dinheiro(this.#centavos + outro.#centavos);
  }

  subtrair(outro: Dinheiro): Dinheiro {
    const r = this.#centavos - outro.#centavos;
    if (r < 0n) {
      throw new Error("Resultado da subtração seria negativo.");
    }
    return new Dinheiro(r);
  }

  menorQue(outro: Dinheiro): boolean {
    return this.#centavos < outro.#centavos;
  }

  menorOuIgual(outro: Dinheiro): boolean {
    return this.#centavos <= outro.#centavos;
  }

  multiplicarInteiro(quantidade: number): Dinheiro {
    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new Error("Quantidade deve ser inteira não negativa.");
    }
    return new Dinheiro(this.#centavos * BigInt(quantidade));
  }

  multiplicarDecimal(fator: number): Dinheiro {
    if (!Number.isFinite(fator) || fator < 0) {
      throw new Error("Fator deve ser finito e não negativo.");
    }
    const bruto = Number(this.#centavos) * fator;
    return new Dinheiro(BigInt(Math.round(bruto)));
  }

  emReais(): number {
    return Number(this.#centavos) / 100;
  }

  toString(): string {
    return this.emReais().toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}
