import type { ContaTodasOperacoes } from "#app/domain/conta-todas-operacoes.js";

export class ContaCorrenteMultiproduto implements ContaTodasOperacoes {
  private saldoCentavos: number;
  private bloqueioJudicialAtivo = false;

  constructor(saldoInicialCentavos: number) {
    if (saldoInicialCentavos < 0) {
      throw new Error("Saldo inicial inválido.");
    }
    this.saldoCentavos = saldoInicialCentavos;
  }

  obterSaldoCentavos(): number {
    return this.saldoCentavos;
  }

  creditar(centavos: number): void {
    if (centavos <= 0) {
      throw new Error("Crédito deve ser positivo.");
    }
    this.saldoCentavos += centavos;
  }

  debitar(centavos: number): void {
    if (centavos <= 0) {
      throw new Error("Débito deve ser positivo.");
    }
    if (this.bloqueioJudicialAtivo) {
      throw new Error("Conta com bloqueio judicial: débito não permitido.");
    }
    if (centavos > this.saldoCentavos) {
      throw new Error("Saldo insuficiente.");
    }
    this.saldoCentavos -= centavos;
  }

  solicitarEmprestimoPreAprovado(valorCentavos: number): boolean {
    if (valorCentavos <= 0) {
      throw new Error("Valor de empréstimo inválido.");
    }
    if (this.bloqueioJudicialAtivo) {
      return false;
    }
    this.saldoCentavos += valorCentavos;
    return true;
  }

  registrarBloqueioJudicial(ativo: boolean): void {
    this.bloqueioJudicialAtivo = ativo;
  }
}
