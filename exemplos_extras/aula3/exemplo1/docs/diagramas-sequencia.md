# Diagramas de sequência — exemplo1 (acoplamento vs DI)

Fluxos baseados em `src/app.ts` e nas classes de cadastro. Visualização: [Mermaid](https://mermaid.js.org/).

---

## 1. Cenário acoplado (`CadastroUsuarioAcoplado`)

A dependência concreta é criada **dentro** da classe (campo `notificador`).

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Cad as CadastroUsuarioAcoplado
    participant Cons as ConsoleNotificador
    participant Out as console

    Main->>Cad: new CadastroUsuarioAcoplado()
    Cad->>Cons: new ConsoleNotificador()
    Cons-->>Cad: instância
    Cad-->>Main: acoplado

    Main->>Cad: registrar(email)
    Cad->>Out: log(persistência fictícia)
    Cad->>Cons: enviar(mensagem)
    Cons->>Out: log([ConsoleNotificador] …)
```

---

## 2. DI com `ConsoleNotificador` (`CadastroUsuarioComDi`)

Quem compõe o grafo de objetos (**`main`**) cria o `ConsoleNotificador` e **injeta** no construtor.

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Cons as ConsoleNotificador
    participant Cad as CadastroUsuarioComDi
    participant Out as console

    Main->>Cons: new ConsoleNotificador()
    Cons-->>Main: notificador

    Main->>Cad: new CadastroUsuarioComDi(notificador)
    Cad-->>Main: comConsole

    Main->>Cad: registrar(email)
    Cad->>Out: log(persistência fictícia)
    Cad->>Cons: enviar(mensagem)
    Cons->>Out: log([ConsoleNotificador] …)
```

---

## 3. DI com `SilentNotificador` (mesma classe de negócio)

`CadastroUsuarioComDi` não muda; só a implementação de `Notificador` injetada muda. `enviar` não escreve no `console`.

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Sil as SilentNotificador
    participant Cad as CadastroUsuarioComDi
    participant Out as console

    Main->>Sil: new SilentNotificador()
    Sil-->>Main: notificador

    Main->>Cad: new CadastroUsuarioComDi(notificador)
    Cad-->>Main: comSilencioso

    Main->>Cad: registrar(email)
    Cad->>Out: log(persistência fictícia)
    Cad->>Sil: enviar(mensagem)
    Note right of Sil: Sem chamada a Out a partir de SilentNotificador.
```

---

## Leitura rápida

- **Acoplado**: `CadastroUsuarioAcoplado` **conhece** e **instancia** `ConsoleNotificador` — diagrama 1 mostra o `new` dentro do ciclo de vida do cadastro.

- **DI**: `CadastroUsuarioComDi` só chama a **interface** `Notificador`; os diagramas 2 e 3 diferem apenas no objeto criado em `main` antes do construtor.
