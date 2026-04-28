# Diagramas de sequência — Aula 5, exemplo 1 (Hexagonal)

Fluxos a partir de `src/entrypoints/app.ts`, `composition/composicao.ts`, casos de uso e adaptadores de persistência. Visualização: [Mermaid](https://mermaid.js.org/).

A mesma porta **`RepositorioDeAtivos`** é implementada por **`RepositorioMemoriaAdapter`** (cenário “real”) e **`RepositorioVazioAdapter`** (contraste: resumo zerado).

---

## 1. Composição da aplicação (DI manual)

```mermaid
sequenceDiagram
    autonumber
    participant App as entrypoints/app.ts
    participant Comp as composition/composicao.ts
    participant Adap as Adapter de persistência
    participant Reg as RegistrarAtivoUseCase
    participant Res as ResumoCarteiraUseCase

    App->>Comp: comporComPersistenciaEmMemoria() ou comporComRepositorioVazio()
    Comp->>Adap: new RepositorioMemoriaAdapter() ou new RepositorioVazioAdapter()
    Comp->>Reg: new RegistrarAtivoUseCase(repositorio)
    Comp->>Res: new ResumoCarteiraUseCase(repositorio)
    Comp-->>App: Aplicacao { registrar, resumo }
```

---

## 2. Fluxo `RegistrarAtivoUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant UC as RegistrarAtivoUseCase
    participant Port as RepositorioDeAtivos
    participant Adap as Adapter (memória / vazio)

    App->>UC: executar(ativo)
    UC->>Port: salvar(ativo)
    Port->>Adap: salvar(ativo)
    Note over Adap: Memória: push no array.<br/>Vazio: no-op.
```

---

## 3. Fluxo `ResumoCarteiraUseCase.executar`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant UC as ResumoCarteiraUseCase
    participant Port as RepositorioDeAtivos
    participant Adap as Adapter (memória / vazio)

    App->>UC: executar()
    UC->>Port: listar()
    Port->>Adap: listar()
    Adap-->>UC: readonly Ativo[]
    UC->>UC: reduce: soma retornoBrutoEstimado()
    UC-->>App: ResumoCarteira
```

---

## Leitura rápida

- **Driving:** o `app.ts` só enxerga **`Aplicacao`** (casos de uso compostos na raiz).
- **Driven:** persistência através da porta **`RepositorioDeAtivos`**; trocar o adaptador troca o comportamento observado no **`ResumoCarteira`** sem editar os use cases.
