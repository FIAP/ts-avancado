// Abstração estável: novas políticas = novas classes, sem editar o serviço de saque.
export interface PoliticaEncargoSaque {
  calcularTarifaCentavos(valorSaqueCentavos: number): number;
}
