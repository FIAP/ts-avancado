# Diagramas de sequência — Aula 3, exemplo 1 (container + DI)

Fluxos baseados em `src/app.ts`, `src/container/container.ts`, `InvestimentoService` e repositórios. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Composição: `Container.getInvestimentoService()`

O **container** cria `MemoryRepository` e injeta em `InvestimentoService` (ponto de **Inversão de Controle** na montagem).

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Ctn as Container
    participant Mem as MemoryRepository
    participant Svc as InvestimentoService

    App->>Ctn: getInvestimentoService()
    Ctn->>Mem: new MemoryRepository()
    Mem-->>Ctn: repo
    Ctn->>Svc: new InvestimentoService(repo)
    Svc-->>Ctn: service
    Ctn-->>App: service
```

---

## 2. `getInvestimentoServiceComRepositorioFake()`

Mesmo serviço de domínio; só a **implementação** de `Repository` muda (composição no container).

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Ctn as Container
    participant Fk as FakeRepository
    participant Svc as InvestimentoService

    App->>Ctn: getInvestimentoServiceComRepositorioFake()
    Ctn->>Fk: new FakeRepository()
    Fk-->>Ctn: repo
    Ctn->>Svc: new InvestimentoService(repo)
    Svc-->>Ctn: serviceFake
    Ctn-->>App: serviceFake
```

---

## 3. Fluxo com `MemoryRepository`: `adicionar` e `calcularTotal`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as InvestimentoService
    participant Mem as MemoryRepository

    App->>Svc: adicionar(Acao)
    Svc->>Mem: salvar(investimento)
    Mem->>Mem: dados.push
    App->>Svc: adicionar(FundoImobiliario)
    Svc->>Mem: salvar(investimento)
    Mem->>Mem: dados.push

    App->>Svc: calcularTotal()
    Svc->>Mem: obterTodos()
    Mem-->>Svc: T[]
    Svc->>Svc: reduce(calcularRetorno)
    Svc-->>App: total (ex.: 1300)
```

---

## 4. Fluxo com `FakeRepository`: `adicionar` não altera leitura

`salvar` é no-op; `obterTodos` retorna `[]`, então o total fica **0**.

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as InvestimentoService
    participant Fk as FakeRepository

    App->>Svc: adicionar(Acao)
    Svc->>Fk: salvar(investimento)
    Note right of Fk: Implementação vazia — não persiste.

    App->>Svc: calcularTotal()
    Svc->>Fk: obterTodos()
    Fk-->>Svc: []
    Svc->>Svc: reduce em lista vazia
    Svc-->>App: 0
```

---

## Leitura rápida

- **`InvestimentoService`** só fala com **`Repository<Investimento>`**; quem escolhe memória ou fake é o **`Container`**.
- O diagrama 3 vs 4 mostra o mesmo contrato de serviço com **comportamentos diferentes** de persistência.
