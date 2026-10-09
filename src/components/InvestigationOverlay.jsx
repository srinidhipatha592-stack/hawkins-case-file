import { useEffect, useState } from 'react'
import { EVIDENCE } from '../data/evidence.js'

const STAGES = ['Collecting evidence...', 'Estimating likelihoods...', 'Applying Bayes’ theorem...', 'Normalising posteriors...']

/** Full-screen "investigating" animation shown while an update is computed. */
export default function InvestigationOverlay({ evidenceIndex }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/95 px-6" role="status" aria-live="polite">
      <div className="relative h-40 w-40 overflow-hidden rounded border border-cyan/40 sm:h-52 sm:w-52">
        <div className="absolute inset-x-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />
        <div className="flex h-full items-center justify-center font-display text-6xl text-slate-600">?</div>
      </div>
      <p className="label mt-6">Evidence {evidenceIndex + 1}</p>
      <h2 className="mt-1 text-center font-display text-2xl uppercase tracking-[0.2em] text-slate-100">{EVIDENCE[evidenceIndex].type}</h2>
      <p className="mt-4 font-mono text-sm text-cyan">&gt; {STAGES[stage]}</p>
    </div>
  )
}
