/**
 * Anti-ISP: um único contrato agrega saldo, crédito, débito, empréstimo e bloqueio judicial.
 * Clientes que precisam só de **consulta de saldo** ainda dependem desse tipo “completo”.
 * Implementações de produto simples (ex.: salário) ficam obrigadas a expor operações que não existem no produto.
 */
export interface ContaTodasOperacoes {
  obterSaldoCentavos(): number;
  creditar(centavos: number): void;
  debitar(centavos: number): void;
  solicitarEmprestimoPreAprovado(valorCentavos: number): boolean;
  registrarBloqueioJudicial(ativo: boolean): void;
}
