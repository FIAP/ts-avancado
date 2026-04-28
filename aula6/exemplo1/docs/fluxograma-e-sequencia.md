# Fluxograma e diagramas de sequência — Aula 6, exemplo 1 (Onion)

Documentação visual da **`presentation/app.ts`**, composição, casos de uso e persistência. Renderização: [Mermaid](https://mermaid.js.org/).

---

## 1. Fluxograma — camadas (cebola) e dependências

As **regras de negócio** e o contrato **`RepositorioDeInvestimentos`** ficam no **domínio**. Casos de uso dependem só do domínio. **Infraestrutura** implementa o contrato. **Composição** conecta tudo; **presentation** só orquestra o demo.

```mermaid
flowchart TB
  subgraph entrada[Presentation]
    App[presentation/app.ts]
  end

  subgraph di[Composition]
    Comp[composition/composicao.ts]
  end

  subgraph aplicacao[Application]
    UC1[AdicionarInvestimentoUseCase]
    UC2[CalcularRetornoTotalUseCase]
  end

  subgraph nucleo[Domain]
    RepoInt[RepositorioDeInvestimentos]
    Inv[Investimento / Acao / FundoImobiliario]
  end

  subgraph infra[Infrastructure]
    Mem[RepositorioMemoria]
    Vazio[RepositorioVazio]
  end

  App --> Comp
  Comp --> UC1
  Comp --> UC2
  Comp --> Mem
  Comp --> Vazio
  UC1 --> RepoInt
  UC2 --> RepoInt
  UC1 --> Inv
  UC2 --> Inv
  Mem -.->|implements| RepoInt
  Vazio -.->|implements| RepoInt
```

**Leitura:** setas de **código-fonte** apontam de fora para dentro (aplicação depende de abstrações do núcleo). **Infraestrutura** “aponta” para o domínio ao satisfazer a interface (inversão em relação ao fluxo de controle em runtime).

---

## 2. Fluxograma — execução do programa (`app.ts`)

Dois cenários com **os mesmos casos de uso** e **repositórios diferentes**.

```mermaid
flowchart TD
  Start([Início]) --> S1[Console: cenário memória]
  S1 --> C1[comporComPersistenciaEmMemoria]
  C1 --> A1[adicionarInvestimento: Acao TechBr]
  A1 --> A2[adicionarInvestimento: FII Logística]
  A2 --> R1[calcularRetornoTotal]
  R1 --> O1[Console: Retorno total com dados]

  O1 --> S2[Console: cenário vazio]
  S2 --> C2[comporComRepositorioVazio]
  C2 --> A3[adicionarInvestimento: Acao Ignorado]
  A3 --> R2[calcularRetornoTotal]
  R2 --> O2[Console: retorno zerado]
  O2 --> Fim([Fim])
```

---

## 3. Diagrama de sequência — composição (DI manual)

```mermaid
sequenceDiagram
    autonumber
    participant App as presentation/app.ts
    participant Comp as composition/composicao.ts
    participant Rep as Implementação de repositório
    participant UC1 as AdicionarInvestimentoUseCase
    participant UC2 as CalcularRetornoTotalUseCase

    App->>Comp: comporComPersistenciaEmMemoria() ou comporComRepositorioVazio()
    Comp->>Rep: new RepositorioMemoria() ou new RepositorioVazio()
    Comp->>UC1: new AdicionarInvestimentoUseCase(repositorio)
    Comp->>UC2: new CalcularRetornoTotalUseCase(repositorio)
    Comp-->>App: Aplicacao
```

---

## 4. Diagrama de sequência — `AdicionarInvestimentoUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant UC as AdicionarInvestimentoUseCase
    participant Port as RepositorioDeInvestimentos
    participant Impl as Memória ou repositório vazio

    App->>UC: executar(investimento)
    UC->>Port: salvar(investimento)
    Port->>Impl: salvar(investimento)
    Note over Impl: Memória: push. Vazio: salvar é no-op.
```

---

## 5. Diagrama de sequência — `CalcularRetornoTotalUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant UC as CalcularRetornoTotalUseCase
    participant Port as RepositorioDeInvestimentos
    participant Impl as Memória ou repositório vazio

    App->>UC: executar()
    UC->>Port: listar()
    Port->>Impl: listar()
    Impl-->>UC: readonly Investimento[]
    UC->>UC: reduce: soma retornoBrutoEstimado()
    UC-->>App: RetornoTotal
```

---

## Resumo

| Artefato | O que mostra |
|----------|----------------|
| **§1** | Onde cada pasta se encaixa na cebola e quem implementa **`RepositorioDeInvestimentos`**. |
| **§2** | Ordem dos **dois demos** no CLI. |
| **§3–§5** | Mensagens trocadas entre **presentation**, **use cases** e **persistência** em runtime. |
