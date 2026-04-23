import { Conta } from "./conta.js";

/** Herança: conta corrente é uma conta, com regras próprias no resumo. */
export class ContaCorrente extends Conta {
  public override resumo(): string {
    return `CC ${this.numero} | saldo R$ ${this.consultarSaldo().toFixed(2)}`;
  }
}
