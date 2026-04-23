export interface Ativo {
  readonly id: string;
  readonly nome: string;
  retornoBrutoEstimado(): number;
}
