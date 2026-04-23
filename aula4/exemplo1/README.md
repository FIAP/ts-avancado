# Hands on — Aula 4: princípios SOLID em TypeScript

## 1. Apresentação

Nesta atividade prática, será demonstrado como aplicar os **princípios SOLID** na prática, utilizando um exemplo de **refatoração** de código em TypeScript.

Inicialmente, será apresentado um código com problemas de design (**alto acoplamento** e **baixa coesão**). Em seguida, esse código será evoluído passo a passo, aplicando SOLID para torná-lo mais **organizado**, **extensível** e **testável**.

Ao final da prática, o aluno será capaz de **identificar violações** de SOLID e **aplicar refatorações** para melhorar a qualidade do software.

## 2. Materiais e ambiente

- **Node.js** 20 ou superior  
- **npm** 10 ou superior  
- **TypeScript** 6  
- **tsx** (execução direta dos `.ts`)  
- **Visual Studio Code** (recomendado)  

## 3. Quadro de arquivos

| Arquivo | Descrição |
|--------|-----------|
| `src/bad/investimento.service.ts` | Código com violação de SOLID |
| `src/good/domain/investimento.interface.ts` | Contrato do domínio |
| `src/good/domain/acao.ts` | Implementação |
| `src/good/domain/fundo.ts` | Implementação (`FundoImobiliario`) |
| `src/good/repository/repository.interface.ts` | Interface genérica |
| `src/good/repository/memory.repository.ts` | Implementação |
| `src/good/service/investimento.service.ts` | Serviço desacoplado |
| `src/app.ts` | Execução e comparação |

*Quadro 1 — Arquivos utilizados na prática. Fonte: elaboração própria.*

## 4. Procedimentos

### 4.1 Código inicial (violando SOLID)

**Objetivo:** identificar problemas reais de design.

Implementação em `src/bad/investimento.service.ts`: um método `calcular(tipo, valor)` com ramos `if` para `"acao"` e `"fii"`.

**Problemas identificados**

- Viola **SRP** (concentra várias regras e o fluxo de decisão).  
- Viola **OCP** (cada novo tipo exige alterar este método).  
- Não usa **abstração** adequada.  
- **Alto acoplamento** a strings mágicas e a regras fixas no mesmo lugar.  
- **Difícil de testar** de forma isolada e previsível.  

### 4.2 Aplicando SRP (Single Responsibility Principle)

**Objetivo:** separar responsabilidades.

Contrato em `src/good/domain/investimento.interface.ts`: `Investimento` com `calcularRetorno()`.

**Explicação:** cada classe concreta terá uma responsabilidade clara; a **regra de negócio** deixa de ficar centralizada no serviço “Deus”.

### 4.3 Aplicando OCP (Open/Closed Principle)

**Objetivo:** permitir extensão sem modificar código já existente.

Implementações em `src/good/domain/acao.ts` e `src/good/domain/fundo.ts`.

**Explicação:** novo tipo de investimento → **nova classe**; não é obrigatório reabrir o serviço legado em `src/bad`.

### 4.4 Aplicando LSP (Liskov Substitution Principle)

**Objetivo:** garantir substituição correta entre implementações.

No `src/app.ts`, um array `Investimento[]` recebe `Acao` e `FundoImobiliario` e itera com `forEach`, chamando apenas `calcularRetorno()`.

**Explicação:** todas as classes respeitam o mesmo contrato; a substituição é segura.

### 4.5 Aplicando ISP (Interface Segregation Principle)

**Objetivo:** evitar interfaces “gordas”.

**Exemplo teórico (não compilado neste repositório):**

- Evitar algo como `InvestimentoCompleto` com `calcular()` e `salvar()` forçados juntos quando o cliente só precisa de uma das capacidades.  
- Preferir contratos menores, por exemplo: `Calculavel` com `calcular()` e `Persistivel` com `salvar()`.  

**Explicação:** interfaces **específicas** reduzem acoplamento desnecessário.

### 4.6 Aplicando DIP (Dependency Inversion Principle)

**Objetivo:** desacoplar o serviço de implementação concreta de persistência.

- `src/good/repository/repository.interface.ts` — abstração `Repository<T>`.  
- `src/good/repository/memory.repository.ts` — implementação em memória.  
- `src/good/service/investimento.service.ts` — depende de `Repository<Investimento>`, não de `MemoryRepository`.  

**Explicação:** o serviço **depende de abstração**; fica **pronto para DI** e para trocar persistência sem alterar a regra de agregação.

### 4.7 Execução final (comparação real)

**Objetivo:** visualizar a evolução do código.

O `src/app.ts` inclui, nesta ordem:

1. Uso do serviço em `src/bad` (mesmos números de referência: ação 10 000 e FII 5 000).  
2. Demonstração **LSP** (4.4).  
3. Bloco equivalente ao roteiro:

```typescript
import { Acao } from "./good/domain/acao.js";
import { FundoImobiliario } from "./good/domain/fundo.js";
import { MemoryRepository } from "./good/repository/memory.repository.js";
import { InvestimentoService } from "./good/service/investimento.service.js";
import type { Investimento } from "./good/domain/investimento.interface.js";

const repo = new MemoryRepository<Investimento>();
const service = new InvestimentoService(repo);

service.adicionar(new Acao(10000));
service.adicionar(new FundoImobiliario(5000));

console.log("Total:", service.calcularTotal());
```

> No projeto, `MemoryRepository` é genérico: usa-se `new MemoryRepository<Investimento>()` para satisfazer o `strict` do TypeScript. Os imports `import type` nos módulos `good` seguem o `verbatimModuleSyntax` do `tsconfig.json`.

**Executar**

```bash
cd aula4/exemplo1
npm install
npm run start
```

**Resultado esperado:** total **1300** no fluxo `good` (1000 + 300), coerente com as taxas 0,1 e 0,06 do roteiro.

## 5. Orientações ao docente

- Contrastar `src/bad` com `src/good` no mesmo `app.ts`.  
- Relacionar **ISP** ao desenho de portas no domínio (ler vs escrever).  
- Conectar **DIP** à aula de **DI** (Aula 3): o mesmo `InvestimentoService` aceita qualquer `Repository<Investimento>`.  
