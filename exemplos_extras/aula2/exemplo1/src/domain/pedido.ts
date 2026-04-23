import type { Registravel } from "#app/domain/registravel.js";

export class Pedido implements Registravel {
  readonly id: string;

  constructor(
    id: string,
    public cliente: string,
    public totalEmReais: number,
  ) {
    this.id = id;
  }

  resumoParaLog(): string {
    return `[Pedido ${this.id}] cliente=${this.cliente} total=R$ ${this.totalEmReais.toFixed(2)}`;
  }
}
