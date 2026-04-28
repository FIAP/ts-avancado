# Fluxogramas e diagramas de sequência — Aula 7

Documentação visual do projeto **`aula7/exemplo1`** (Arquitetura Limpa em TypeScript). Renderização: [Mermaid](https://mermaid.js.org/).

O ponto de entrada é **`src/frameworks/cli/app.ts`**, que compõe a aplicação, executa casos de uso e usa o **presenter** para exibir o resumo.

---

## 1. Fluxograma — camadas (Clean Architecture)

Dependências de **implementação** apontam para o interior: **entities** e **use cases** não conhecem CLI nem detalhes de persistência; **adapters** implementam portas e formatam saída.

```mermaid
flowchart TB
  subgraph frameworks[Frameworks e drivers]
    CLI[frameworks/cli/app.ts]
  end

  subgraph composition[Composition root]
    Comp[composition/composicao.ts]
  end

  subgraph application[Application]
    subgraph usecases[Use cases]
      UC1[AdicionarInvestimentoUseCase]
      UC2[ListarInvestimentosUseCase]
      UC3[CalcularRetornoTotalUseCase]
    end
    Port[ports: RepositorioDeInvestimentos]
  end

  subgraph domain[Entities]
    Inv[Investimento / Acao / FundoImobiliario]
    Cart[Carteira]
  end

  subgraph adapters[Interface adapters]
    Pres[adapters/presenters: formatarResumoParaExibicao]
    Mem[RepositorioMemoriaAdapter]
    Vaz[RepositorioVazioAdapter]
  end

  CLI --> Comp
  CLI --> Pres
  Comp --> UC1
  Comp --> UC2
  Comp --> UC3
  Comp --> Mem
  Comp --> Vaz
  UC1 --> Port
  UC2 --> Port
  UC3 --> Port
  UC1 --> Inv
  UC2 --> Inv
  UC3 --> Inv
  UC3 --> Cart
  Mem -.->|implements| Port
  Vaz -.->|implements| Port
```

**Presenter:** o CLI chama `calcularRetornoTotal.executar()` e em seguida `formatarResumoParaExibicao(resumo)` — o **fluxo de dados** vai do use case para o presenter, sem o presenter depender da classe do use case (apenas do tipo `ResumoCarteira`).

---

## 2. Fluxograma — execução do `app.ts`

Dois cenários: repositório em **memória** (listagem e resumo preenchidos) e repositório **vazio** (adicionar não persiste; resumo zerado).

```mermaid
flowchart TD
  Start([Início]) --> L1[Cenário: memória]
  L1 --> C1[comporComPersistenciaEmMemoria]
  C1 --> A1[adicionarInvestimento: Acao]
  A1 --> A2[adicionarInvestimento: FII]
  A2 --> R1[calcularRetornoTotal]
  R1 --> P1[formatarResumoParaExibicao]
  P1 --> O1[console: Resumo presenter]
  O1 --> Ls1[listarInvestimentos]
  Ls1 --> O2[console: Listagem]

  O2 --> L2[Cenário: repositório vazio]
  L2 --> C2[comporComRepositorioVazio]
  C2 --> A3[adicionarInvestimento ignora]
  A3 --> R2[calcularRetornoTotal]
  R2 --> P2[formatarResumoParaExibicao]
  P2 --> O3[console: resumo zerado]
  O3 --> Fim([Fim])
```

---

## 3. Diagrama de sequência — composição (`criarAplicacao`)

```mermaid
sequenceDiagram
    autonumber
    participant CLI as frameworks/cli/app.ts
    participant Comp as composition/composicao.ts
    participant Rep as Adapter de persistência
    participant UC1 as AdicionarInvestimentoUseCase
    participant UC2 as ListarInvestimentosUseCase
    participant UC3 as CalcularRetornoTotalUseCase

    CLI->>Comp: comporComPersistenciaEmMemoria() ou comporComRepositorioVazio()
    Comp->>Rep: new RepositorioMemoriaAdapter() ou RepositorioVazioAdapter()
    Comp->>UC1: new AdicionarInvestimentoUseCase(repositorio)
    Comp->>UC2: new ListarInvestimentosUseCase(repositorio)
    Comp->>UC3: new CalcularRetornoTotalUseCase(repositorio)
    Comp-->>CLI: Aplicacao
```

---

## 4. Diagrama de sequência — `AdicionarInvestimentoUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant CLI as app.ts
    participant UC as AdicionarInvestimentoUseCase
    participant Port as RepositorioDeInvestimentos
    participant Impl as Memória ou repositório vazio

    CLI->>UC: executar(investimento)
    UC->>Port: salvar(investimento)
    Port->>Impl: salvar(investimento)
    Note over Impl: Memória: push no array. Vazio: no-op.
```

---

## 5. Diagrama de sequência — `CalcularRetornoTotalUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant CLI as app.ts
    participant UC as CalcularRetornoTotalUseCase
    participant Port as RepositorioDeInvestimentos
    participant Impl as Memória ou vazio
    participant Cart as Carteira

    CLI->>UC: executar()
    UC->>Port: listar()
    Port->>Impl: listar()
    Impl-->>UC: readonly Investimento[]
    UC->>Cart: new Carteira(investimentos)
    UC->>Cart: quantidade / retornoBrutoTotal
    Cart-->>UC: valores agregados
    UC-->>CLI: ResumoCarteira
    CLI->>CLI: formatarResumoParaExibicao(resumo)
```

---

## 6. Diagrama de sequência — `ListarInvestimentosUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant CLI as app.ts
    participant UC as ListarInvestimentosUseCase
    participant Port as RepositorioDeInvestimentos
    participant Impl as Memória ou vazio

    CLI->>UC: executar()
    UC->>Port: listar()
    Port->>Impl: listar()
    Impl-->>UC: readonly Investimento[]
    UC-->>CLI: lista
```

---

## Resumo

| Seção | Conteúdo |
|-------|-----------|
| **1** | Mapa de pastas alinhado à **Clean Architecture** deste repositório. |
| **2** | Ordem real dos logs no **CLI** (dois cenários). |
| **3–6** | Interação **composition → use cases → porta → adapter** e uso de **Carteira** + **presenter**. |

Implementação: **`aula7/exemplo1/`**.
