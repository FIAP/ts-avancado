# Diagrama de sequência — exemplo3 (generics: `Caixa<T>` e `primeiroElemento`)

Fluxos baseados em `src/app.ts`. Visualização: [Mermaid](https://mermaid.js.org/) (GitHub, preview Markdown no editor).

---

## 1. `Caixa<T>` — construir e ler o conteúdo

Exemplo representativo: `new Caixa(2025)` e `obterConteudo()` antes do `console.log` (o mesmo padrão vale para `string` e `Ponto`).

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Caixa as Caixa (number)
    participant Out as console

    Main->>Caixa: new Caixa(2025)
    Caixa-->>Main: caixaNumero

    Main->>Caixa: obterConteudo()
    Caixa-->>Main: 2025

    Main->>Out: log("Caixa<number>:", 2025)
```

---

## 2. `primeiroElemento<T>` — array com itens

Exemplo: `primeiroElemento([10, 20, 30])`.

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Prim as primeiroElemento
    participant Arr as numeros (array)
    participant Out as console

    Main->>Prim: primeiroElemento(numeros)
    Prim->>Arr: at(0)
    Arr-->>Prim: 10
    Prim-->>Main: 10

    Main->>Out: log("primeiroElemento(numeros):", 10)
```

---

## 3. `primeiroElemento<T>` — array vazio

Quando não há índice `0`, `at(0)` devolve `undefined`.

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Prim as primeiroElemento
    participant Arr as vazio (number[])
    participant Out as console

    Main->>Prim: primeiroElemento(vazio)
    Prim->>Arr: at(0)
    Arr-->>Prim: undefined
    Prim-->>Main: undefined

    Main->>Out: log("primeiroElemento(vazio):", undefined)
```

---

## Leitura rápida

- **Genéricos** não aparecem em tempo de execução no JavaScript: o diagrama mostra o fluxo **concreto** (chamadas e retornos). O `T` garante **tipos** em tempo de compilação (por exemplo, `Caixa<number>.obterConteudo()` é `number`).
- **`Caixa<T>`** encapsula um valor de tipo `T`; **`primeiroElemento<T>`** reutiliza a mesma função para qualquer elemento de array `T`.
