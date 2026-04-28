# Diagramas de sequência — exemplo10 (DIP)

Fluxo de `src/app.ts` → **`ServicoSaque`** com política e auditoria **injetadas**. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Composição na borda (`main` / `demo`)

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Pol as PoliticaEncargoSaque
    participant Aud as PortaAuditoriaSaque
    participant Svc as ServicoSaque

    App->>Pol: new EncargoUmPorCento() ou EncargoIsento()
    App->>Aud: new AuditoriaSaqueConsole()
    App->>Svc: new ServicoSaque(politica, auditoria)
    App->>Svc: executar(conta, 100)
```

---

## 2. `ServicoSaque.executar` (só abstrações)

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as ServicoSaque
    participant Pol as PoliticaEncargoSaque
    participant Aud as PortaAuditoriaSaque
    participant Conta as ContaCorrente

    App->>Svc: executar(conta, valorReais)
    Svc->>Pol: calcularTarifaCentavos(valorCentavos)
    Pol-->>Svc: tarifa
    Svc->>Aud: registrarEvento(solicitado)
    Svc->>Conta: debitar(total)
    Svc->>Aud: registrarEvento(concluído)
    Svc-->>App: resultado
```

---

## Leitura rápida

- **Quem conhece concretos** é a **borda** (`app.ts`). O **núcleo** (`ServicoSaque`) permanece estável ao trocar `EncargoUmPorCento` por `EncargoIsento` ou `AuditoriaSaqueConsole` por outro adaptador.
