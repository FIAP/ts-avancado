# Aula 3 — Exemplo 2 (avançado): DI com container tipado

Evolução do exemplo 1: em vez de métodos estáticos isolados no `Container`, há um **mini framework de DI** com:

- **`DiContainer`**: `registerSingleton`, `registerTransient`, `resolve`.
- **`Tokens`**: símbolos estáveis para registro (ideia próxima de tokens em libs de DI).
- **Composition root** (`registrarDependencias`): monta o grafo conforme **perfil** (`desenvolvimento` | `teste`).
- **Múltiplas dependências**: `InvestimentoService` recebe `Repository` + `Logger`.
- **Decorator de infra**: `AuditedRepository<T>` envolve qualquer `Repository<T>` sem mudar domínio.
- **Segundo serviço**: `RelatorioPortfolioService` compartilha o **mesmo singleton** de repositório.
- **Transient**: `ContadorRequisicao` — cada `resolve` retorna instância nova (contraste com singleton).

## Estrutura

```
src/
  app.ts
  composition/registrar-dependencias.ts
  core/di-container.ts
  core/tokens.ts
  domain/
  infra/contador-requisicao.ts
  observabilidade/
  repository/
  service/
```

## Diagramas de sequência

Fluxos do `DiContainer`, perfis, transient vs singleton, serviços e repositório auditado estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Como rodar

```bash
cd aula3/exemplo2
npm install
npm run start
```

## Comparar com exemplo 1

| | Exemplo 1 | Exemplo 2 |
|---|-----------|-----------|
| Container | Classe com métodos estáticos | `DiContainer` genérico reutilizável |
| Perfis | Memória vs fake fixo | `desenvolvimento` / `teste` no composition root |
| Dependências | Só repositório | Repositório + logger + serviços encadeados |
| Ciclo de vida | Implícito | Singleton vs transient explícitos |

Próximo passo natural: biblioteca real (ex.: `tsyringe`, `inversify`) ou módulos do NestJS, com decorators e metadata.
