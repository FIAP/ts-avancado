# Diagramas de sequência — exemplo2 (SRP, colaboradores)

Fluxos de `src/app.ts` e `ServicoMovimentacaoConta`. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Montagem do caso de uso (`main`)

Antes dos depósitos/saques, o `app` instancia **`ContaCorrente`** e injeta colaboradores em **`ServicoMovimentacaoConta`**.

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Conta as ContaCorrente
    participant Svc as ServicoMovimentacaoConta
    participant Vd as ValidadorDocumentoCliente
    participant Vv as ValidadorValoresOperacao
    participant Tar as CalculadoraTarifaSaque
    participant Aud as AuditoriaConsole
    participant Cmp as GeradorComprovanteXmlSimples

    App->>Conta: new ContaCorrente(numero, saldoCentavos)
    App->>Svc: new ServicoMovimentacaoConta(Vd, Vv, Tar, Aud, Cmp)
    Note over App: Em seguida: executarDeposito / executarSaque
```

---

## 2. Fluxo `executarDeposito`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as ServicoMovimentacaoConta
    participant Vd as ValidadorDocumentoCliente
    participant Vv as ValidadorValoresOperacao
    participant Aud as AuditoriaConsole
    participant Conta as ContaCorrente
    participant Cmp as GeradorComprovanteXmlSimples
    participant Out as console

    App->>Svc: executarDeposito(conta, valor, documento)
    Svc->>Vd: normalizar / garantirCpf11Digitos
    Svc->>Vv: garantirValorPositivoEmReais
    Svc->>Aud: registrar(solicitado)
    Aud->>Out: log [AUDITORIA]
    Svc->>Conta: creditar(centavos)
    Svc->>Aud: registrar(concluído)
    Aud->>Out: log [AUDITORIA]
    Svc->>Cmp: gerar(dados comprovante)
    Cmp-->>Svc: string
    Svc-->>App: comprovante
```

---

## 3. Fluxo `executarSaque`

```mermaid
sequenceDiagram
    autonumber
    participant App as app.ts
    participant Svc as ServicoMovimentacaoConta
    participant Vd as ValidadorDocumentoCliente
    participant Vv as ValidadorValoresOperacao
    participant Tar as CalculadoraTarifaSaque
    participant Aud as AuditoriaConsole
    participant Conta as ContaCorrente
    participant Cmp as GeradorComprovanteXmlSimples
    participant Out as console

    App->>Svc: executarSaque(conta, valor, documento)
    Svc->>Vd: normalizar / garantirCpf11Digitos
    Svc->>Vv: garantirValorPositivoEmReais
    Svc->>Tar: calcularTarifaCentavos
    Svc->>Tar: garantirSaldoParaSaqueComTarifa
    Svc->>Aud: registrar(solicitado)
    Aud->>Out: log [AUDITORIA]
    Svc->>Conta: debitar(valor + tarifa em centavos)
    Svc->>Aud: registrar(concluído)
    Aud->>Out: log [AUDITORIA]
    Svc->>Cmp: gerar(dados comprovante)
    Cmp-->>Svc: string
    Svc-->>App: comprovante
```

---

## Leitura rápida

- **ServicoMovimentacaoConta** só **coordena**; mudanças pontuais (ex.: só o layout do comprovante) concentradas em **GeradorComprovanteXmlSimples**.
- Compare com o **exemplo1**: lá não há colaboradores externos; tudo ocorre no **GestorFinanceiroMonolitico**.
