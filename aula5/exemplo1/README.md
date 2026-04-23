# Aula 5 — Exemplo 1: Arquitetura Hexagonal (Ports and Adapters)

## Apresentação

Nesta aula prática, será demonstrada a implementação da **Arquitetura Hexagonal** utilizando **TypeScript**, com foco na construção de uma aplicação estruturada, desacoplada e alinhada com práticas modernas de arquitetura de software.

A atividade consiste na **evolução** do tipo de aplicação trabalhada nas aulas anteriores, aplicando **separação de responsabilidades**, **inversão de dependência** e **desacoplamento** entre domínio e infraestrutura. O objetivo é mostrar, de forma prática, como organizar o sistema em **camadas bem definidas**, garantindo maior **flexibilidade**, **testabilidade** e **facilidade de manutenção**.

Durante a demonstração, serão definidos os principais elementos da arquitetura:

| Elemento | Papel |
|----------|--------|
| **Domínio (core)** | Regras e entidades; sem dependência de frameworks ou detalhes externos. |
| **Portas (interfaces)** | Contratos que definem como o núcleo conversa com o mundo externo (neste exemplo, persistência). |
| **Adaptadores (implementações)** | Integração concreta: aqui, repositório em memória e um repositório “vazio” para contraste. |

Além disso, mantém-se o **domínio isolado** de detalhes de infraestrutura, de modo que alterações externas (troca de banco, API, etc.) **não impactem** diretamente a lógica de negócio.

A prática integra conceitos das aulas anteriores:

- **Interfaces e generics** para contratos (`RepositorioDeAtivos` e tipos de ativo).
- **Injeção de dependência** na composição (`composition/composicao.ts`), injetando a porta nos casos de uso.
- **Princípios SOLID** na organização do domínio e na extensibilidade via novos adaptadores.

## Estrutura de pastas (mapa hexagonal)

```
src/
  domain/                    # núcleo: entidades e contratos de negócio
  application/
    ports/                   # portas (contratos de saída / driven)
    *.use-case.ts            # casos de uso — dependem só de portas
  infrastructure/
    adapters/
      persistencia/          # adaptadores driven: implementam as portas
  composition/               # composição da aplicação (DI manual)
  entrypoints/               # adaptador driving: CLI / ponto de entrada
```

## Como rodar

```bash
cd aula5/exemplo1
npm install
npm run start
```

## O que o `app.ts` demonstra

1. **Cenário 1:** `RepositorioMemoriaAdapter` — resumo com valores reais (TechBr + FII).  
2. **Cenário 2:** `RepositorioVazioAdapter` — mesmos casos de uso, outro adaptador; o resumo permanece zerado, sem alterar o domínio.

## Pré-requisitos

Node.js 20+, npm 10+, TypeScript 6 (conforme `package.json`).
