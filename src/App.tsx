import { useEffect, useMemo, useState } from 'react'
import { germanNumberWord, numbersInRange, rangeKeys, speakGerman, type RangeKey } from './data/germanNumbers'
import { detectLocale, locales, modeLabels, rangeLabels, ui, type Locale, type ModeKey } from './i18n'
import { getStoredConsent, loadAnalytics } from './analytics'
import CookieConsent from './CookieConsent'

const modeKeys: ModeKey[] = ['flashcards', 'quizWord', 'quizNumber', 'listening']

function shuffle<T>(items: T[]): T[] {
  const array = [...items]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function pickNumber(pool: number[], exclude: number | null): number {
  const choices = pool.filter(item => item !== exclude)
  const source = choices.length > 0 ? choices : pool
  return source[Math.floor(Math.random() * source.length)]
}

function buildOptions(pool: number[], target: number): number[] {
  const distractors = shuffle(pool.filter(item => item !== target)).slice(0, 3)
  return shuffle([target, ...distractors])
}

const readBestStreak = () => {
  try {
    const value = Number(window.localStorage.getItem('zahlendrill-best-streak') ?? 0)
    return Number.isFinite(value) && value >= 0 ? value : 0
  } catch { return 0 }
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => detectLocale())
  const [range, setRange] = useState<RangeKey>('basic')
  const [mode, setMode] = useState<ModeKey>('flashcards')
  const [current, setCurrent] = useState<number | null>(null)
  const [options, setOptions] = useState<number[]>([])
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(readBestStreak)

  const t = ui[locale]
  const pool = useMemo(() => numbersInRange(range), [range])

  useEffect(() => {
    window.localStorage.setItem('zahlendrill-locale', locale)
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  useEffect(() => {
    window.localStorage.setItem('zahlendrill-best-streak', String(bestStreak))
  }, [bestStreak])

  useEffect(() => {
    if (getStoredConsent() === 'granted') loadAnalytics()
  }, [])

  function newRound(nextPool: number[] = pool, nextMode: ModeKey = mode) {
    const target = pickNumber(nextPool, current)
    setCurrent(target)
    setRevealed(false)
    setSelected(null)
    if (nextMode !== 'flashcards') setOptions(buildOptions(nextPool, target))
    if (nextMode === 'listening') window.setTimeout(() => speakGerman(germanNumberWord(target)), 250)
  }

  useEffect(() => {
    newRound(pool, mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, mode])

  function resetSession() {
    setScore({ correct: 0, total: 0 })
    setStreak(0)
    newRound()
  }

  function handleAnswer(choice: number) {
    if (selected !== null || current === null) return
    setSelected(choice)
    const isCorrect = choice === current
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }))
    const nextStreak = isCorrect ? streak + 1 : 0
    setStreak(nextStreak)
    if (nextStreak > bestStreak) setBestStreak(nextStreak)
  }

  if (current === null) return null
  const word = germanNumberWord(current)

  return <div className="app-shell">
    <header>
      <h1 className="brand"><span className="brand-mark">DE</span><div><strong>ZahlenDrill</strong><small>{t.brandTagline}</small></div></h1>
      <div className="locale-switch" role="group" aria-label="Language">
        {locales.map(item => (
          <button key={item.id} type="button" className={locale === item.id ? 'active' : ''} onClick={() => setLocale(item.id)}>{item.label}</button>
        ))}
      </div>
    </header>

    <main>
      <p className="intro">{t.intro}</p>

      <section className="controls">
        <div className="control-group">
          <span>{t.rangeLabel}</span>
          <div className="segmented">
            {rangeKeys.map(key => <button key={key} className={range === key ? 'active' : ''} onClick={() => setRange(key)}>{rangeLabels[locale][key]}</button>)}
          </div>
        </div>
        <div className="control-group">
          <span>{t.modeLabel}</span>
          <div className="segmented">
            {modeKeys.map(key => <button key={key} className={mode === key ? 'active' : ''} onClick={() => setMode(key)}>{modeLabels[locale][key]}</button>)}
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stat"><strong>{score.correct}/{score.total}</strong><span>{t.score}</span></div>
        <div className="stat"><strong>{streak}</strong><span>{t.streak}</span></div>
        <div className="stat"><strong>{bestStreak}</strong><span>{t.bestStreak}</span></div>
        <button className="reset-button" onClick={resetSession}>{t.resetButton}</button>
      </section>

      {mode === 'flashcards' && <section className="card-zone">
        <p className="hint">{t.flashcardHint}</p>
        <div className={`flashcard ${revealed ? 'is-revealed' : ''}`}>
          <span className="digit">{current}</span>
          {revealed && <span className="word">{word}</span>}
        </div>
        <div className="card-actions">
          {!revealed
            ? <button className="primary" onClick={() => setRevealed(true)}>{t.reveal}</button>
            : <>
              <button className="ghost" onClick={() => speakGerman(word)}>🔊 {t.listenButton}</button>
              <button className="secondary" onClick={() => newRound()}>{t.practiceAgain}</button>
              <button className="primary" onClick={() => { setStreak(s => { const next = s + 1; if (next > bestStreak) setBestStreak(next); return next }); setScore(p => ({ correct: p.correct + 1, total: p.total + 1 })); newRound() }}>{t.knewIt}</button>
            </>}
        </div>
      </section>}

      {mode === 'quizWord' && <section className="card-zone">
        <p className="prompt">{t.quizWordPrompt}</p>
        <div className="flashcard static"><span className="digit">{current}</span></div>
        <div className="options">
          {options.map(option => {
            const optionWord = germanNumberWord(option)
            const state = selected === null ? '' : option === current ? 'correct' : option === selected ? 'incorrect' : ''
            return <button key={option} className={`option ${state}`} onClick={() => handleAnswer(option)} disabled={selected !== null}>{optionWord}</button>
          })}
        </div>
        {selected !== null && <div className={`feedback ${selected === current ? 'correct' : 'incorrect'}`}>
          {selected === current ? t.correct : t.incorrect(word)}
        </div>}
        {selected !== null && <button className="primary" onClick={() => newRound()}>{t.nextButton}</button>}
      </section>}

      {mode === 'quizNumber' && <section className="card-zone">
        <p className="prompt">{t.quizNumberPrompt}</p>
        <div className="flashcard static word-only">
          <span className="word">{word}</span>
          <button className="ghost small" onClick={() => speakGerman(word)}>🔊</button>
        </div>
        <div className="options">
          {options.map(option => {
            const state = selected === null ? '' : option === current ? 'correct' : option === selected ? 'incorrect' : ''
            return <button key={option} className={`option ${state}`} onClick={() => handleAnswer(option)} disabled={selected !== null}>{option}</button>
          })}
        </div>
        {selected !== null && <div className={`feedback ${selected === current ? 'correct' : 'incorrect'}`}>
          {selected === current ? t.correct : t.incorrect(String(current))}
        </div>}
        {selected !== null && <button className="primary" onClick={() => newRound()}>{t.nextButton}</button>}
      </section>}

      {mode === 'listening' && <section className="card-zone">
        <p className="prompt">{t.listeningPrompt}</p>
        <div className="flashcard static">
          <button className="listen-big" onClick={() => speakGerman(word)} aria-label={t.replayButton}>🔊</button>
        </div>
        <div className="options">
          {options.map(option => {
            const state = selected === null ? '' : option === current ? 'correct' : option === selected ? 'incorrect' : ''
            return <button key={option} className={`option ${state}`} onClick={() => handleAnswer(option)} disabled={selected !== null}>{option}</button>
          })}
        </div>
        {selected !== null && <div className={`feedback ${selected === current ? 'correct' : 'incorrect'}`}>
          {selected === current ? t.correct : t.incorrect(String(current))}
        </div>}
        {selected !== null && <button className="primary" onClick={() => newRound()}>{t.nextButton}</button>}
      </section>}
    </main>

    <footer>
      <span>{t.footerTagline}</span>
      <a href="https://vibe-portfolio-one.vercel.app/" target="_blank" rel="noreferrer">Created by Bruno Rendeiro</a>
      <span className="powered-badge">⚡ Powered by AI</span>
    </footer>
    <CookieConsent locale={locale} />
  </div>
}
