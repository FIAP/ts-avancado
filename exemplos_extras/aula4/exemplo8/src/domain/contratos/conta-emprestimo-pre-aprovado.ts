/** Produtos que participam de linha de crédito pré-aprovada (ilustrativo). */
export interface ContaEmprestimoPreAprovado {
  solicitarEmprestimoPreAprovado(valorCentavos: number): boolean;
}
