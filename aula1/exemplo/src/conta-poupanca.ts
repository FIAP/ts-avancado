import { Conta } from "./conta.js";

/** Herança: poupança é outra especialização de Conta. */
export class ContaPoupanca extends Conta {
  public override resumo(): string {
    return `Poupança ${this.numero} | saldo R$ ${this.consultarSaldo().toFixed(2)}`;
  }
}
