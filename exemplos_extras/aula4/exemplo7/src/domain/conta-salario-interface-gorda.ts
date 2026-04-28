import type { ContaTodasOperacoes } from "#app/domain/conta-todas-operacoes.js";

/**
 * Produto real: crédito de folha e consulta. O restante do contrato **ContaTodasOperacoes**
 * vira implementação artificial — cliente da interface gorda não sabe o que é suportado sem ler o código.
 */
export class ContaSalarioInterfaceGorda implements ContaTodasOperacoes {
  private saldoCentavos: number;

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

  debitar(_centavos: number): void {
    throw new Error("Conta salário: não há canal de débito genérico neste produto.");
  }

  solicitarEmprestimoPreAprovado(_valorCentavos: number): boolean {
    throw new Error("Conta salário: empréstimo pré-aprovado não disponível neste produto.");
  }

  registrarBloqueioJudicial(_ativo: boolean): void {
    throw new Error("Conta salário: bloqueio judicial não tratado por este bounded context.");
  }
}
