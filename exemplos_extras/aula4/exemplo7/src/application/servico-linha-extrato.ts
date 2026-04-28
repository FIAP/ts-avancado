import type { ContaTodasOperacoes } from "#app/domain/conta-todas-operacoes.js";

/**
 * Na prática usa só o saldo, mas a assinatura **obriga** quem chama a ter (ou fingir ter)
 * débito, empréstimo e bloqueio — acoplamento desnecessário (ISP violado).
 */
export class ServicoLinhaExtrato {
  formatar(conta: ContaTodasOperacoes, rotulo: string): string {
    const centavos = conta.obterSaldoCentavos();
    const reais = (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    return `${rotulo}: ${reais}`;
  }
}
