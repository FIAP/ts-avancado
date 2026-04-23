// Encapsulamento: estado interno privado; acesso só pelos métodos públicos.
export class ContaCorrente {
  private _saldoCentavos = 0;

  constructor(saldoInicialEmReais = 0) {
    if (saldoInicialEmReais < 0 || !Number.isFinite(saldoInicialEmReais)) {
      throw new Error("Saldo inicial inválido.");
    }
    this._saldoCentavos = this.reaisParaCentavos(saldoInicialEmReais);
  }
  

  obterSaldoEmReais(): number {
    return this._saldoCentavos / 100;
  }

  depositar(valorEmReais: number): void {
    if (!this.valorMonetarioValido(valorEmReais)) {
      throw new Error("Valor de depósito inválido.");
    }
    this.aplicarCredito(this.reaisParaCentavos(valorEmReais));
  }

  sacar(valorEmReais: number): boolean {
    if (!this.valorMonetarioValido(valorEmReais)) {
      throw new Error("Valor de saque inválido.");
    }
    const centavos = this.reaisParaCentavos(valorEmReais);
    if (centavos > this._saldoCentavos) {
      return false;
    }
    this._saldoCentavos -= centavos;
    return true;
  }

  private aplicarCredito(centavos: number): void {
    this._saldoCentavos += centavos;
  }

  private reaisParaCentavos(valor: number): number {
    return Math.round(valor * 100);
  }

  private valorMonetarioValido(valor: number): boolean {
    return Number.isFinite(valor) && valor > 0;
  }
}
