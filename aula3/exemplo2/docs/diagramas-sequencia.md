# Diagramas de sequência — Aula 3, exemplo 2 (`DiContainer` + composition root)

Fluxos baseados em `src/app.ts`, `composition/registrar-dependencias.ts` e `core/di-container.ts`. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Abertura de cenário: container e registro

`executarCenario` cria um **`DiContainer` novo por cenário** e chama **`registrarDependencias`**, que só associa **tokens** a **fábricas** (singleton ou transient).

```mermaid
sequenceDiagram
    autonumber
    participant App as executarCenario
    participant Ioc as DiContainer
    participant Reg as registrarDependencias

    App->>Ioc: new DiContainer()
    Ioc-->>App: container
    App->>Reg: registrarDependencias(container, perfil)
    Reg->>Ioc: registerSingleton / registerTransient (vários tokens)
    Reg-->>App: void
```

---

## 2. `ContadorRequisicao` (transient): duas resoluções, duas instâncias

Cada **`resolve`** chama a fábrica registrada com **`registerTransient`** sem cache.

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Ioc as DiContainer
    participant Fab as fábrica ContadorRequisicao

    App->>Ioc: resolve(contadorRequisicao)
    Ioc->>Fab: factory()
    Fab-->>Ioc: ContadorRequisicao (id = a)
    Ioc-->>App: a

    App->>Ioc: resolve(contadorRequisicao)
    Ioc->>Fab: factory()
    Fab-->>Ioc: ContadorRequisicao (id = b)
    Ioc-->>App: b

    Note over App: a.id !== b.id
```

---

## 3. Primeiro `resolve(InvestimentoService)` (singletons encadeados)

A fábrica do serviço pede **repositório** e **logger**. A fábrica do **repositório auditado** pede o **logger** e envolve **`MemoryRepository`**.

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Ioc as DiContainer
    participant FabSvc as fábrica InvestimentoService
    participant FabRepo as fábrica Repository
    participant FabLog as fábrica Logger

    App->>Ioc: resolve(investimentoService)
    Ioc->>FabSvc: factory()
    FabSvc->>Ioc: resolve(repositoryInvestimento)
    Ioc->>FabRepo: factory()
    FabRepo->>Ioc: resolve(logger)
    Ioc->>FabLog: factory()
    FabLog-->>Ioc: Logger (Console ou Silent)
    Ioc->>Ioc: cache logger (singleton)
    FabRepo->>FabRepo: MemoryRepository + AuditedRepository
    FabRepo-->>Ioc: repo auditado
    Ioc->>Ioc: cache repository (singleton)
    Ioc-->>FabSvc: repo
    FabSvc->>Ioc: resolve(logger)
    Ioc-->>FabSvc: mesmo logger (cache)
    FabSvc->>FabSvc: new InvestimentoService(repo, logger)
    FabSvc-->>Ioc: service
    Ioc->>Ioc: cache investimentoService
    Ioc-->>App: service
```

Segunda chamada a **`resolve(investimentoService)`** (se existisse) devolveria a **mesma** instância em cache.

---

## 4. `adicionar` e `calcularTotal` no serviço

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as InvestimentoService
    participant Log as Logger
    participant Repo as AuditedRepository
    participant Mem as MemoryRepository

    App->>Svc: adicionar(Acao)
    Svc->>Log: info(...)
    Svc->>Repo: salvar(investimento)
    Repo->>Log: info([Investimentos] salvar)
    Repo->>Mem: salvar(investimento)

    App->>Svc: calcularTotal()
    Svc->>Log: info(Calculando total)
    Svc->>Repo: obterTodos()
    Repo->>Log: info([Investimentos] obterTodos)
    Repo->>Mem: obterTodos()
    Mem-->>Repo: T[]
    Repo-->>Svc: T[]
    Svc->>Svc: reduce(calcularRetorno)
    Svc-->>App: total
```

---

## 5. `RelatorioPortfolioService`: repositório compartilhado

O **mesmo singleton** de `repositoryInvestimento` é injetado no relatório; os dados incluem o que o serviço anterior persistiu.

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Ioc as DiContainer
    participant FabRel as fábrica RelatorioPortfolio
    participant Svc as RelatorioPortfolioService
    participant Repo as Repository (singleton)

    App->>Ioc: resolve(relatorioPortfolio)
    Ioc->>FabRel: factory()
    FabRel->>Ioc: resolve(repositoryInvestimento)
    Ioc-->>FabRel: mesma instância em cache
    FabRel->>Svc: new RelatorioPortfolioService(repo)
    FabRel-->>Ioc: relatorio
    Ioc-->>App: relatorio

    App->>Svc: linhaResumo()
    Svc->>Repo: obterTodos()
    Repo-->>Svc: ativos
    Svc-->>App: string resumo
```

---

## 6. Perfil `teste` e `SilentLogger`

O registro em **`registrarDependencias`** usa **`SilentLogger`** quando `perfil === "teste"`; o fluxo de `resolve` é análogo ao diagrama 3, trocando a implementação concreta do logger. No fim, **`logger.mensagens`** permite inspecionar linhas capturadas sem `console`.

---

## Leitura rápida

- **Composition root** (`registrarDependencias`) concentra **quem** implementa cada token por **perfil**.
- **Singleton vs transient** no mesmo container: repositório e serviços **compartilhados** vs contador **nova instância** a cada `resolve`.
