import { RegistrarAtivoUseCase } from "../application/registrar-ativo.use-case.js";
import { RelatorioCarteiraUseCase } from "../application/relatorio-carteira.use-case.js";
import type { AtivoRepository } from "../application/ports/ativo.repository.port.js";
import type { CalculadoraImpostoRenda } from "../application/ports/calculadora-ir.port.js";
import { ConsoleNotificador } from "../infrastructure/console-notificador.js";
import { MemoryAtivoRepository } from "../infrastructure/memory-ativo.repository.js";

export type ModuloCarteira = {
  registrar: RegistrarAtivoUseCase;
  relatorio: RelatorioCarteiraUseCase;
  repositorio: AtivoRepository;
};

export function criarModuloCarteira(
  calculadoraIr: CalculadoraImpostoRenda,
  repositorio: AtivoRepository = new MemoryAtivoRepository(),
): ModuloCarteira {
  const notificador = new ConsoleNotificador();
  return {
    repositorio,
    registrar: new RegistrarAtivoUseCase(repositorio, notificador),
    relatorio: new RelatorioCarteiraUseCase(repositorio, calculadoraIr),
  };
}
