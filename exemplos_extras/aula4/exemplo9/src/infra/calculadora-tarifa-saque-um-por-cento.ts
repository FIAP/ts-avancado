/** Detalhe de infraestrutura / política concreta — acoplada diretamente ao serviço no exemplo9. */
export class CalculadoraTarifaSaqueUmPorCento {
  calcularTarifaCentavos(valorSaqueCentavos: number): number {
    return Math.round(valorSaqueCentavos * 0.01);
  }
}
