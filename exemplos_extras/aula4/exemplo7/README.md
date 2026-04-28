# Exemplo 7 — violação do ISP (Interface Segregation)

Uma única interface **`ContaTodasOperacoes`** concentra consulta de saldo, crédito, débito, empréstimo pré-aprovado e bloqueio judicial. **`ServicoLinhaExtrato`** só usa saldo, mas tipa o contrato **completo**; a **`ContaSalarioInterfaceGorda`** é obrigada a declarar métodos que o produto não oferece (implementação com `throw`).

## Diagramas de sequência

Ver **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Como rodar

```bash
cd exemplos_extras/aula4/exemplo7
npm install
npm start
```

Compare com o **exemplo8**, onde o extrato depende só de **`ContaConsultavel`**.
