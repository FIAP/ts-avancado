import { RegistrarAtivoUseCase } from "../application/registrar-ativo.use-case.js";
import { ResumoCarteiraUseCase } from "../application/resumo-carteira.use-case.js";
import type { RepositorioDeAtivos } from "../application/ports/repositorio-ativos.port.js";
import { RepositorioMemoriaAdapter } from "../infrastructure/adapters/persistencia/repositorio-memoria.adapter.js";
import { RepositorioVazioAdapter } from "../infrastructure/adapters/persistencia/repositorio-vazio.adapter.js";

export type Aplicacao = {
  registrar: RegistrarAtivoUseCase;
  resumo: ResumoCarteiraUseCase;
};

export function comporComPersistenciaEmMemoria(): Aplicacao {
  const repositorio: RepositorioDeAtivos = new RepositorioMemoriaAdapter();
  return {
    registrar: new RegistrarAtivoUseCase(repositorio),
    resumo: new ResumoCarteiraUseCase(repositorio),
  };
}

export function comporComRepositorioVazio(): Aplicacao {
  const repositorio: RepositorioDeAtivos = new RepositorioVazioAdapter();
  return {
    registrar: new RegistrarAtivoUseCase(repositorio),
    resumo: new ResumoCarteiraUseCase(repositorio),
  };
}
