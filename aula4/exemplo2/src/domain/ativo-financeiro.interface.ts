export interface AtivoFinanceiro {
  readonly id: string;
  readonly nome: string;
  estimarRetornoBruto(): number;
}
