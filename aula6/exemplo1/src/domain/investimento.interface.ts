export interface Investimento {
  readonly id: string;
  readonly nome: string;
  retornoBrutoEstimado(): number;
}
