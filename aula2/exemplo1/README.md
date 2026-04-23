# Aula 2 — Exemplo 1: interfaces, repositório genérico e serviço desacoplado

Prática sobre **contratos com `interface`**, **`implements`**, **generics** (`Repository<T>`, `MemoryRepository<T>`) e **inversão de dependência** no serviço (dependência de `Repository<Investimento>`, não de implementação concreta).

## Quadro de arquivos

| Arquivo | Descrição |
|--------|-----------|
| `src/domain/investimento.interface.ts` | Contrato base do domínio |
| `src/domain/acao.ts` | Implementação concreta |
| `src/domain/fundo-imobiliario.ts` | Implementação concreta |
| `src/repository/repository.interface.ts` | Interface genérica |
| `src/repository/memory.repository.ts` | Implementação genérica em memória |
| `src/service/investimento.service.ts` | Serviço desacoplado |
| `src/app.ts` | Execução principal |

*Quadro 1 — Arquivos utilizados na prática. Fonte: elaboração própria.*

## Como rodar

```bash
cd aula2/exemplo1
npm install
npm run start
```

Saída esperada: `Total de retorno: 1300` (1000 da ação + 300 do FII).

### Opcional: compilar e executar com Node

```bash
npm run build
npm run start:built
```

## Procedimentos (resumo pedagógico)

1. **Domínio:** `Investimento` como interface (contrato sem implementação).
2. **Concretas:** `Acao` e `FundoImobiliario` com `implements`.
3. **Repositório:** `Repository<T>` e `MemoryRepository<T>`.
4. **Serviço:** `InvestimentoService` recebe `Repository<Investimento>` no construtor.
5. **App:** compõe `MemoryRepository` + `InvestimentoService` e registra instâncias polimórficas.

## Atividade complementar (opcional)

- Criar `Logger<T>` (interface) e `ConsoleLogger<T>` (implementação).
- Injetar ou usar no `InvestimentoService` (ex.: log ao salvar).

## Próximos passos

Base para **Inversão de Controle (IoC)** e **Injeção de Dependência (DI)** na sequência do curso.
