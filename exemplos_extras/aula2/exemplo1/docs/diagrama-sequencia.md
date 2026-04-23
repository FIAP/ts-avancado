# Diagrama de sequência — exemplo1 (interface `Registravel`)

Fluxo de `src/app.ts`: montagem dos itens que cumprem `Registravel`, mensagem inicial no console e, para cada item, `registrarNoPainel` delegando em `resumoParaLog()`.

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Pedido
    participant Fab as criarEventoAuditoria
    participant Ev as evento (objeto Registravel)
    participant Reg as registrarNoPainel
    participant Out as console

    Main->>Pedido: new Pedido(id, cliente, total)
    Pedido-->>Main: pedido

    Main->>Fab: criarEventoAuditoria(id, ação, detalhe)
    Fab-->>Main: evento (literal Registravel)

    Main->>Out: log(cabeçalho)

    Main->>Reg: registrarNoPainel(pedido)
    activate Reg
    Reg->>Pedido: resumoParaLog()
    Pedido-->>Reg: texto do pedido
    Reg->>Out: log(texto)
    deactivate Reg

    Main->>Reg: registrarNoPainel(evento)
    activate Reg
    Reg->>Ev: resumoParaLog()
    Ev-->>Reg: texto de auditoria
    Reg->>Out: log(texto)
    deactivate Reg
```

## Leitura do diagrama

1. **`main`** constrói um **`Pedido`** e um objeto devolvido por **`criarEventoAuditoria`**, ambos usáveis onde se espera **`Registravel`**.
2. **`registrarNoPainel`** só usa o contrato da interface: chama **`resumoParaLog()`** e manda o texto para o **`console`**.
3. No segundo item, **`resumoParaLog`** roda no **objeto literal** produzido pela factory (participante **evento**), não na classe `Pedido`.

Para visualizar o gráfico, abra este arquivo em um ambiente com suporte a [Mermaid](https://mermaid.js.org/) (por exemplo, pré-visualização Markdown no VS Code/Cursor com extensão Mermaid, ou GitHub ao publicar o repositório).
