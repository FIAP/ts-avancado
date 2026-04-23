# Aula 1 — exemplo Banco (OOP em TypeScript)

## Os quatro pilares neste projeto

| Pilar | Neste código |
|--------|----------------|
| **Encapsulamento** | Conta: saldo privado; Banco: Map privado. Só métodos públicos alteram estado. |
| **Abstração** | Conta abstrata: contrato comum (creditar, debitar, consultarSaldo, resumo) sem fixar “como” cada tipo se apresenta. |
| **Herança** | ContaCorrente e ContaPoupanca estendem Conta. |
| **Polimorfismo** | listarContas() chama resumo() em referências do tipo Conta; cada subclasse responde de um jeito. |

## Como rodar

```bash
npm install
npm run build
npm run start:built
```

Ou, sem gerar `dist`:

```bash
npm start
```
