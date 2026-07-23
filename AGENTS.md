# AGENTS.md

## Objetivo

Este projeto contém exclusivamente a app ZahlenDrill, para praticar números
em alemão.

## Regras

- Manter o jogo 100% client-side: sem backend, sem tracking, sem login.
- As palavras alemãs devem continuar a ser geradas por regras em
  `germanNumberWord()`, não escritas à mão — corrigir a função em vez de
  criar exceções por número.
- Qualquer novo texto de interface tem de ser traduzido nas três línguas
  suportadas (`src/i18n.ts`) — nunca deixar uma língua incompleta.
- Não colocar aqui código do portfólio ou de outras aplicações.

## Validação

```bash
npm run check
npm run build
```
