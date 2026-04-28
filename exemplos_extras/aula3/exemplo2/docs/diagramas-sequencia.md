# Diagramas de sequência — exemplo2 (IoC com `IocContainer`)

Fluxos baseados em `src/app.ts`, `registrar-modulo-app.ts` e `ioc/container.ts`. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Composição: criar container e registrar fábricas

`criarContainerComConsole()` cria o `IocContainer` e chama `registrarModuloCadastro`, que só **registra** fábricas (ainda não instancia serviços).

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Fab as criarContainerComConsole
    participant Ioc as IocContainer
    participant Reg as registrarModuloCadastro

    Main->>Fab: criarContainerComConsole()
    Fab->>Ioc: new IocContainer()
    Ioc-->>Fab: container
    Fab->>Reg: registrarModuloCadastro(container, …Console…)
    Reg->>Ioc: registrarSingleton(Notificador, fábrica)
    Reg->>Ioc: registrarSingleton(CadastroUsuario, fábrica)
    Reg-->>Fab: void
    Fab-->>Main: container
```

---

## 2. `resolve(CadastroUsuario)` — primeiro uso (montagem lazy)

Ao resolver o token `CadastroUsuario`, o container executa a fábrica, que antes resolve `Notificador`. As duas instâncias ficam em cache (singleton).

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Ioc as IocContainer
    participant FabN as fábrica Notificador
    participant FabC as fábrica CadastroUsuario
    participant Cons as ConsoleNotificador
    participant Svc as CadastroUsuarioService

    Main->>Ioc: resolve(CadastroUsuario)
    Ioc->>FabC: fabrica(container)
    FabC->>Ioc: resolve(Notificador)
    Ioc->>FabN: fabrica(container)
    FabN->>Cons: new ConsoleNotificador()
    Cons-->>FabN: instância
    FabN-->>Ioc: Notificador
    Ioc->>Ioc: cache Notificador
    Ioc-->>FabC: notificador
    FabC->>Svc: new CadastroUsuarioService(notificador)
    Svc-->>FabC: instância
    FabC-->>Ioc: CadastroUsuarioService
    Ioc->>Ioc: cache CadastroUsuario
    Ioc-->>Main: cadastro
```

---

## 3. Caso de uso: `cadastro.registrar(email)`

Igual ao fluxo de negócio do exemplo1 (DI): persistência fictícia + notificação.

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Svc as CadastroUsuarioService
    participant Notif as Notificador (concreto)
    participant Out as console

    Main->>Svc: registrar(email)
    Svc->>Out: log(persistência fictícia)
    Svc->>Notif: enviar(mensagem)
    Notif->>Out: log([ConsoleNotificador] …)
```

Com `SilentNotificador`, o passo `Notif -> Out` não ocorre.

---

## 4. Segundo cenário: só muda o registro do `Notificador`

`main` cria outro `IocContainer`, chama `registrarModuloCadastro(outro, () => new SilentNotificador())` e de novo `resolve(CadastroUsuario)`. O diagrama 2 fica o mesmo em forma, trocando `ConsoleNotificador` por `SilentNotificador`; **`CadastroUsuarioService` não é alterado**.

---

## Leitura rápida

- **IoC** aqui: o **controle de criação** das dependências está no **container** e nas **fábricas registradas**, não espalhado em `new` pelo `app`.
- **`resolve`**: ponto em que o grafo de objetos é **materializado** (com singleton em memória após a primeira resolução).
