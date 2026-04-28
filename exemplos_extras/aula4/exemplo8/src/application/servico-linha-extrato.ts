import type { ContaConsultavel } from "#app/domain/contratos/conta-consultavel.js";

/** Depende só do contrato mínimo para mostrar saldo (ISP). */
export class ServicoLinhaExtrato {
  formatar(conta: ContaConsultavel, rotulo: string): string {
    const centavos = conta.obterSaldoCentavos();
    const reais = (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    return `${rotulo}: ${reais}`;
  }
}
