# Aula 4 — Exemplo 2: SOLID em um mini-projeto (carteira)

Exemplo **mais próximo de um projeto real** que o `exemplo1`: pastas por **responsabilidade**, **portas** (interfaces de aplicação), **casos de uso**, **infraestrutura** e **composition root**.

## O que o aluno deve enxergar

| Princípio | Onde aparece |
|-----------|----------------|
| **SRP** | `RegistrarAtivoUseCase` só registra + notifica; `RelatorioCarteiraUseCase` só agrega números; cada classe de ativo tem sua fórmula. |
| **OCP** | Novo tipo de ativo = **nova classe** em `domain/` implementando `AtivoFinanceiro`, sem abrir os casos de uso. |
| **LSP** | `Acao`, `FundoImobiliario` e `Cdb` entram no mesmo `AtivoFinanceiro[]` e respondem ao contrato. |
| **ISP** | Portas pequenas: `AtivoRepository`, `CalculadoraImpostoRenda`, `Notificador` — cliente não é forçado a depender do que não usa. |
| **DIP** | Casos de uso dependem das **portas**; `MemoryAtivoRepository`, `ConsoleNotificador` e calculadoras de IR são **infra** plugável. |

## Estrutura

```
src/
  domain/                    # núcleo: entidades + contrato AtivoFinanceiro
  application/
    ports/                   # contratos que o domínio/casos de uso precisam
    registrar-ativo.use-case.ts
    relatorio-carteira.use-case.ts
  infrastructure/            # adaptadores (memória, console, políticas de IR)
  composition/               # fábrica = DI manual (como um módulo Nest/Spring reduzido)
  app.ts
```

## Cenário do `app.ts`

1. **LSP:** lista heterogênea de ativos e cálculo de bruto por polimorfismo.  
2. **Um único `MemoryAtivoRepository` compartilhado** entre dois módulos: um com `CalculadoraIrProgressiva`, outro com `CalculadoraIrIsenta`.  
3. O **mesmo conjunto de ativos** gera relatórios diferentes só pela **troca da abstração fiscal** (OCP + DIP), sem alterar `RelatorioCarteiraUseCase`.

## Como rodar

```bash
cd aula4/exemplo2
npm install
npm run start
```

## Comparar com exemplo1

| | Exemplo 1 | Exemplo 2 |
|---|-----------|-----------|
| Organização | `bad/` vs `good/` didático | Camadas + portas + use cases |
| Extensão | 2 tipos de ativo | 3 tipos + política fiscal plugável |
| Persistência | Genérico simples | Repositório de domínio explícito |

Próximo passo: extrair o `criarModuloCarteira` para um **container** da Aula 3 ou framework de DI.
