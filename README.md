# ZahlenDrill

App para praticar números em alemão (0–1000) com flashcards, quizzes nos dois
sentidos (número → palavra e palavra → número) e um modo de escuta, usando a
Web Speech API do próprio browser para pronúncia — sem serviços externos.

## Ideia

- As palavras alemãs são geradas algoritmicamente (`src/data/germanNumbers.ts`)
  a partir das regras reais de formação (unidades, dezenas irregulares como
  "dreißig", a inversão "einundzwanzig"), em vez de uma lista escrita à mão.
- Quatro modos: Flashcards, Número → palavra, Palavra → número, Escuta.
- Três intervalos: 0–20, 21–100, Centenas (100 a 1000).
- Pontuação e sequência de acertos guardadas localmente.
- Interface disponível em português (PT-PT), inglês e alemão.
- 100% client-side, sem backend, sem tracking, sem login.

## Executar

```bash
npm install
npm run dev
```

Abrir <http://127.0.0.1:5177>.

## Validar

```bash
npm run check
npm run build
```

## Ideias para evoluir

- Suportar números até 1 milhão.
- Modo de escrita (ditado): o utilizador escreve o número por extenso.
- Guardar estatísticas por intervalo/modo em vez de uma sessão única.
- Adicionar horas e datas em alemão como extensão natural do tema.

O README deve ser atualizado quando o conceito, as funcionalidades ou as
prioridades mudarem.
