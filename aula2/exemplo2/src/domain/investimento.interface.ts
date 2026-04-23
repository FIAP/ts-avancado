import type { Identificavel } from "./identificavel.interface.js";

export interface Investimento extends Identificavel {
  nome: string;
  calcularRetorno(): number;
}
