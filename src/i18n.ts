export type Locale = 'pt' | 'en' | 'de'

export const locales: { id: Locale; label: string }[] = [
  { id: 'pt', label: 'PT' },
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
]

export function detectLocale(): Locale {
  const stored = window.localStorage.getItem('zahlendrill-locale')
  if (stored === 'pt' || stored === 'en' || stored === 'de') return stored
  const browser = navigator.language.slice(0, 2).toLowerCase()
  if (browser === 'de') return 'de'
  if (browser === 'pt') return 'pt'
  return 'en'
}

export type RangeLabelKey = 'basic' | 'tens' | 'hundreds'
export type ModeKey = 'flashcards' | 'quizWord' | 'quizNumber' | 'listening'

export const rangeLabels: Record<Locale, Record<RangeLabelKey, string>> = {
  pt: { basic: '0–20', tens: '21–100', hundreds: 'Centenas' },
  en: { basic: '0–20', tens: '21–100', hundreds: 'Hundreds' },
  de: { basic: '0–20', tens: '21–100', hundreds: 'Hunderter' },
}

export const modeLabels: Record<Locale, Record<ModeKey, string>> = {
  pt: { flashcards: 'Flashcards', quizWord: 'Número → palavra', quizNumber: 'Palavra → número', listening: 'Escuta' },
  en: { flashcards: 'Flashcards', quizWord: 'Number → word', quizNumber: 'Word → number', listening: 'Listening' },
  de: { flashcards: 'Karteikarten', quizWord: 'Zahl → Wort', quizNumber: 'Wort → Zahl', listening: 'Hörverstehen' },
}

type UiStrings = {
  brandTagline: string
  intro: string
  rangeLabel: string
  modeLabel: string
  score: string
  streak: string
  bestStreak: string
  flashcardHint: string
  reveal: string
  listenButton: string
  knewIt: string
  practiceAgain: string
  quizWordPrompt: string
  quizNumberPrompt: string
  listeningPrompt: string
  replayButton: string
  correct: string
  incorrect: (answer: string) => string
  nextButton: string
  resetButton: string
  footerTagline: string
  cookieBody: string
  cookieAccept: string
  cookieReject: string
}

export const ui: Record<Locale, UiStrings> = {
  pt: {
    brandTagline: 'Números em alemão',
    intro: 'Flashcards, quizzes e pronúncia para dominares os números em alemão, de 0 a 1000.',
    rangeLabel: 'Intervalo',
    modeLabel: 'Modo',
    score: 'Acertos',
    streak: 'Sequência',
    bestStreak: 'Melhor sequência',
    flashcardHint: 'Tenta dizer o número em alemão antes de revelar.',
    reveal: 'Revelar',
    listenButton: 'Ouvir pronúncia',
    knewIt: 'Eu sabia',
    practiceAgain: 'Praticar outra vez',
    quizWordPrompt: 'Como se diz este número em alemão?',
    quizNumberPrompt: 'Que número é esta palavra alemã?',
    listeningPrompt: 'Ouve e escolhe o número certo.',
    replayButton: 'Ouvir novamente',
    correct: 'Certo!',
    incorrect: answer => `Não é bem isso — a resposta certa era "${answer}".`,
    nextButton: 'Seguinte',
    resetButton: 'Recomeçar sessão',
    footerTagline: 'Sem contas · pronúncia no browser · só prática',
    cookieBody: 'Uso o Google Analytics e o Google AdSense para perceber quantas pessoas visitam este projeto. Aceitas cookies de análise e publicidade?',
    cookieAccept: 'Aceitar',
    cookieReject: 'Recusar',
  },
  en: {
    brandTagline: 'German numbers',
    intro: 'Flashcards, quizzes and pronunciation to master German numbers, from 0 to 1000.',
    rangeLabel: 'Range',
    modeLabel: 'Mode',
    score: 'Score',
    streak: 'Streak',
    bestStreak: 'Best streak',
    flashcardHint: 'Try saying the number in German before revealing it.',
    reveal: 'Reveal',
    listenButton: 'Hear pronunciation',
    knewIt: 'I knew it',
    practiceAgain: 'Practice again',
    quizWordPrompt: 'How do you say this number in German?',
    quizNumberPrompt: 'What number is this German word?',
    listeningPrompt: 'Listen and pick the right number.',
    replayButton: 'Play again',
    correct: 'Correct!',
    incorrect: answer => `Not quite — the right answer was "${answer}".`,
    nextButton: 'Next',
    resetButton: 'Restart session',
    footerTagline: 'No accounts · pronunciation in the browser · just practice',
    cookieBody: 'I use Google Analytics and Google AdSense to understand how many people visit this project. Do you accept analytics and advertising cookies?',
    cookieAccept: 'Accept',
    cookieReject: 'Reject',
  },
  de: {
    brandTagline: 'Zahlen auf Deutsch',
    intro: 'Karteikarten, Quiz und Aussprache, um Zahlen auf Deutsch zu meistern, von 0 bis 1000.',
    rangeLabel: 'Bereich',
    modeLabel: 'Modus',
    score: 'Punkte',
    streak: 'Serie',
    bestStreak: 'Beste Serie',
    flashcardHint: 'Versuch die Zahl auf Deutsch zu sagen, bevor du sie aufdeckst.',
    reveal: 'Aufdecken',
    listenButton: 'Aussprache hören',
    knewIt: 'Ich wusste es',
    practiceAgain: 'Nochmal üben',
    quizWordPrompt: 'Wie sagt man diese Zahl auf Deutsch?',
    quizNumberPrompt: 'Welche Zahl ist dieses deutsche Wort?',
    listeningPrompt: 'Hör zu und wähle die richtige Zahl.',
    replayButton: 'Nochmal abspielen',
    correct: 'Richtig!',
    incorrect: answer => `Nicht ganz — die richtige Antwort war "${answer}".`,
    nextButton: 'Weiter',
    resetButton: 'Sitzung neu starten',
    footerTagline: 'Keine Konten · Aussprache im Browser · nur Übung',
    cookieBody: 'Ich verwende Google Analytics und Google AdSense, um zu verstehen, wie viele Menschen dieses Projekt besuchen. Akzeptierst du Analyse- und Werbe-Cookies?',
    cookieAccept: 'Akzeptieren',
    cookieReject: 'Ablehnen',
  },
}
