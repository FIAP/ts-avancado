# Diagramas de sequência — exemplo9 (DIP violado)

Fluxo de `src/app.ts` → **`ServicoSaqueAcoplado`**, com dependências **criadas dentro** do serviço. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. `ServicoSaqueAcoplado.executar`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as ServicoSaqueAcoplado
    participant Calc as CalculadoraTarifaSaqueUmPorCento
    participant Aud as AuditoriaSaqueConsole
    participant Conta as ContaCorrente

    App->>Svc: executar(conta, valorReais)
    Note over Svc: politica e auditoria já são campos concretos (new no corpo da classe)
    Svc->>Calc: calcularTarifaCentavos(valorCentavos)
    Calc-->>Svc: tarifa
    Svc->>Aud: registrarEvento(solicitado)
    Svc->>Conta: obterSaldoCentavos() / debitar(total)
    Svc->>Aud: registrarEvento(concluído)
    Svc-->>App: { tarifaCentavos, totalDebitadoCentavos }
```

---

## Leitura rápida

- **Alto nível** acoplou-se a **nomes de classes** de infraestrutura. Testes e extensões costumam exigir **mudar** o serviço ou contornar com hacks.
- No **exemplo10**, o mesmo fluxo invoca **`PoliticaEncargoSaque`** e **`PortaAuditoriaSaque`**: detalhes plugáveis.
