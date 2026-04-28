/** Perfis fixos: incluir um novo (ex.: VIP) exige alterar esta união e o switch abaixo. */
export type PerfilClienteEncargo = "PADRAO" | "PREMIUM" | "ISENTO" | "VIP";

/**
 * Viola o OCP: cada novo perfil de tarifa exige ABRIR esta classe e mudar o switch.
 * Fechada para extensão sem modificação — o oposto do princípio.
 */
export class CalculadoraTarifaPorPerfilSwitch {
  calcularTarifaCentavos(
    valorSaqueCentavos: number,
    perfil: PerfilClienteEncargo,
  ): number {
    switch (perfil) {
      case "ISENTO":
        return 0;
      case "PADRAO":
        return Math.round(valorSaqueCentavos * 0.01);
      case "PREMIUM":
        return Math.round(valorSaqueCentavos * 0.005);
        case "VIP":
          return Math.round(valorSaqueCentavos * 0.005);
      default: {
        const exaustivo: never = perfil;
        return exaustivo;
      }
    }
  }
}
