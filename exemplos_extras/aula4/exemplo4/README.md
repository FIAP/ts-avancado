# Exemplo4 — OCP com políticas de encargo extensíveis

Demonstração: **`ServicoSaque`** depende apenas da interface **`PoliticaEncargoSaque`**. Cada regra (**1%**, **0,5%**, **isento**, **0,2% VIP**) vive em **sua própria classe**. Adicionar **VIP** foi possível criando **`EncargoVipZeroPontoDoisPorCento`** **sem editar** `ServicoSaque` — **aberto para extensão**, **fechado para modificação** (OCP).

Conta em centavos, saque de **R$ 100,00**, saldo inicial **R$ 500,00** por cenário (igual ao exemplo3 para comparar tarifas).

## Diagramas de sequência

Fluxos de `demo` e `ServicoSaque` com **`PoliticaEncargoSaque`** estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Arquivos

| Caminho | Papel |
|---------|--------|
| `src/domain/conta-corrente.ts` | Saldo e débito. |
| `src/encargos/politica-encargo-saque.ts` | Interface da política. |
| `src/encargos/encargo-padrao-um-por-cento.ts` | 1%. |
| `src/encargos/encargo-premium-meio-por-cento.ts` | 0,5%. |
| `src/encargos/encargo-isento.ts` | 0%. |
| `src/encargos/encargo-vip-zero-ponto-dois-por-cento.ts` | 0,2% (extensão). |
| `src/application/servico-saque.ts` | Caso de uso estável. |
| `src/app.ts` | Quatro políticas injetadas em instâncias distintas de `ServicoSaque`. |

## Como rodar

```bash
cd exemplos_extras/aula4/exemplo4
npm install
npm start
```

## Contraste com o exemplo3

| | Exemplo3 | Exemplo4 |
|---|----------|----------|
| Novo perfil | Editar `switch` e tipos | Nova classe `implements PoliticaEncargoSaque` |
| `ServicoSaque` | Recebe perfil como parâmetro + calculadora com `switch` | Só recebe a política no construtor |
