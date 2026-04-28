# Diagramas de sequência — exemplo8 (ISP)

Fluxos de `src/app.ts`, **`ServicoLinhaExtrato`** (`ContaConsultavel`) e **`ServicoSaque`** (`ContaDebitavel`). Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Linha de extrato (contrato mínimo)

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Ext as ServicoLinhaExtrato
    participant C as ContaConsultavel

    App->>Ext: formatar(conta, rotulo)
    Ext->>C: obterSaldoCentavos()
    C-->>Ext: centavos
    Ext-->>App: string formatada
```

---

## 2. Saque (contrato de débito)

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as ServicoSaque
    participant D as ContaDebitavel

    App->>Svc: executar(conta, valorReais)
    Svc->>Svc: validar valor; centavos
    Svc->>D: debitar(centavos)
    D-->>Svc: ok
```

---

## Leitura rápida

- **`ContaSalarioCreditoFolha`** entra em `formatar` (é **`ContaConsultavel`**), mas **não** em `ServicoSaque.executar` — não há obrigação de implementar capacidades do multiproduto.
