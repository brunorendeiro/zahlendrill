const units = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun']

const teens: Record<number, string> = {
  10: 'zehn', 11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn',
  15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn',
}

const tensWords: Record<number, string> = {
  20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig',
  60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig',
}

/** Gera a palavra alemã de um número seguindo as regras reais de formação (0-1000), em vez de uma lista escrita à mão. */
export function germanNumberWord(n: number): string {
  if (n === 1000) return 'tausend'
  if (n === 0) return 'null'
  if (n < 10) return units[n]
  if (n < 20) return teens[n]
  if (n < 100) {
    const tensDigit = Math.floor(n / 10) * 10
    const unit = n % 10
    if (unit === 0) return tensWords[tensDigit]
    const unitWord = unit === 1 ? 'ein' : units[unit]
    return `${unitWord}und${tensWords[tensDigit]}`
  }
  const hundredsDigit = Math.floor(n / 100)
  const remainder = n % 100
  const hundredWord = `${hundredsDigit === 1 ? 'ein' : units[hundredsDigit]}hundert`
  return remainder === 0 ? hundredWord : hundredWord + germanNumberWord(remainder)
}

export type RangeKey = 'basic' | 'tens' | 'hundreds'

export const rangeKeys: RangeKey[] = ['basic', 'tens', 'hundreds']

export function numbersInRange(range: RangeKey): number[] {
  if (range === 'basic') return Array.from({ length: 21 }, (_, i) => i)
  if (range === 'tens') return Array.from({ length: 80 }, (_, i) => i + 21)
  return Array.from({ length: 10 }, (_, i) => (i + 1) * 100)
}

export function speakGerman(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}
