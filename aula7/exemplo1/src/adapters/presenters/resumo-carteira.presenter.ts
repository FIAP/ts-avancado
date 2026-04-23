import type { ResumoCarteira } from "../../application/use-cases/calcular-retorno-total.use-case.js";

export function formatarResumoParaExibicao(resumo: ResumoCarteira): string {
  return JSON.stringify(resumo);
}
