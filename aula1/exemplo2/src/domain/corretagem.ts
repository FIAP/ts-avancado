import { Dinheiro } from "#app/domain/dinheiro.js";

export interface PoliticaCorretagem {
  calcular(notional: Dinheiro): Dinheiro;
}

export class CorretagemValorFixo implements PoliticaCorretagem {
  constructor(private readonly porOperacao: Dinheiro) {}

  calcular(_notional: Dinheiro): Dinheiro {
    return this.porOperacao;
  }
}

export class CorretagemPercentual implements PoliticaCorretagem {
  constructor(private readonly aliquota: number) {
    if (!Number.isFinite(aliquota) || aliquota < 0 || aliquota > 1) {
      throw new Error("Alíquota deve estar entre 0 e 1 (ex.: 0.0008 para 0,08%).");
    }
  }

  calcular(notional: Dinheiro): Dinheiro {
    return notional.multiplicarDecimal(this.aliquota);
  }
}

export class CorretagemComposta implements PoliticaCorretagem {
  constructor(private readonly partes: PoliticaCorretagem[]) {
    if (partes.length === 0) {
      throw new Error("Informe ao menos uma política.");
    }
  }

  calcular(notional: Dinheiro): Dinheiro {
    return this.partes.reduce(
      (acc, p) => acc.somar(p.calcular(notional)),
      Dinheiro.zero(),
    );
  }
}

export class CorretagemEscalonada implements PoliticaCorretagem {
  constructor(
    private readonly limiteNotional: Dinheiro,
    private readonly ateLimite: PoliticaCorretagem,
    private readonly acimaDoLimite: PoliticaCorretagem,
  ) {}

  calcular(notional: Dinheiro): Dinheiro {
    return notional.menorOuIgual(this.limiteNotional)
      ? this.ateLimite.calcular(notional)
      : this.acimaDoLimite.calcular(notional);
  }
}
