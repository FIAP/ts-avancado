# Diagramas de sequência — exemplo1 (SRP violado, classe monolítica)

Fluxos de `src/app.ts` → `GestorFinanceiroMonolitico`. Visualização: [Mermaid](https://mermaid.js.org/).

Toda a lógica (validação, saldo, tarifa, auditoria, comprovante) ocorre **dentro da mesma classe** — por isso o diagrama mostra recursão lógica no participante **Gestor**.

---

## 1. Fluxo `processarDeposito`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Gestor as GestorFinanceiroMonolitico
    participant Out as console

    App->>Gestor: processarDeposito(valor, documento)
    Gestor->>Gestor: normalizarDocumento / documentoPareceValido
    Gestor->>Gestor: validar valor > 0
    Gestor->>Out: log [AUDITORIA] saldo antes
    Gestor->>Gestor: saldoEmReais += valor
    Gestor->>Out: log [AUDITORIA] saldo depois
    Gestor->>Gestor: montarComprovanteHtml(DEPÓSITO, …)
    Gestor-->>App: string comprovante
```

---

## 2. Fluxo `processarSaque`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Gestor as GestorFinanceiroMonolitico
    participant Out as console

    App->>Gestor: processarSaque(valor, documento)
    Gestor->>Gestor: normalizarDocumento / documentoPareceValido
    Gestor->>Gestor: validar valor > 0
    Gestor->>Gestor: calcularTarifaSaque (1%)
    Gestor->>Gestor: validar saldo >= valor + tarifa
    Gestor->>Out: log [AUDITORIA] saldo antes
    Gestor->>Gestor: saldoEmReais -= (valor + tarifa)
    Gestor->>Out: log [AUDITORIA] saldo depois
    Gestor->>Gestor: montarComprovanteHtml(SAQUE, …)
    Gestor-->>App: string comprovante
```

---

## Leitura rápida

Qualquer mudança em **formato do comprovante**, **regra de tarifa** ou **texto de auditoria** exige editar **a mesma classe** — vários motivos distintos para alteração (anti-SRP).
