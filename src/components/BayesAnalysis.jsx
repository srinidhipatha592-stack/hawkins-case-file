import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa'
import { SUSPECTS } from '../data/suspects.js'
import { EVIDENCE } from '../data/evidence.js'
import { pct, signedPts } from '../lib/bayes.js'
import ProbabilityBar from './ProbabilityBar.jsx'
import AnimatedPercent from './AnimatedPercent.jsx'
import ProbabilityDashboard from './ProbabilityDashboard.jsx'
import ProbabilityTimeline from './ProbabilityTimeline.jsx'
import HowBayesWorks from './HowBayesWorks.jsx'

/**
 * Shows the Bayesian update for history[focus] (focus = 1..7),
 * i.e. the step produced by investigating EVIDENCE[focus - 1].
 */
export default function BayesAnalysis({ history, focus, setFocus, onRoom, onReport }) {
  const investigated = history.length - 1
  const step = history[focus]
  const evidence = EVIDENCE[focus - 1]
  const visibleHistory = history.slice(0, focus + 1)

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <p className="label">Bayesian probability update</p>
        <h2 className="font-display text-3xl uppercase tracking-[0.15em] text-slate-100">Probability Analysis</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: investigated }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setFocus(n)}
              aria-pressed={focus === n}
              className={`h-10 w-10 rounded border font-mono text-sm transition ${
                focus === n ? 'border-cyan bg-cyan/10 text-cyan' : 'border-edge text-slate-400 hover:border-slate-400'
              }`}
            >
              E{n}
            </button>
          ))}
        </div>
      </div>

      <section key={focus} className="panel animate-rise p-5 sm:p-6">
        <p className="label">Evidence {focus}</p>
        <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.15em] text-blood">{evidence.type}</h3>
        <p className="mt-3 leading-relaxed text-slate-300">{evidence.finding}</p>

        <div className="mt-5 rounded border border-edge bg-ink/60 p-4 font-mono text-xs text-slate-300 sm:text-sm">
          <p className="text-slate-400">P(Suspect | Evidence) = P(Evidence | Suspect) × P(Suspect) ÷ P(Evidence)</p>
          <p className="mt-2">
            P(Evidence) = Σ P(E | Sᵢ) × P(Sᵢ) = <span className="text-cyan">{step.pEvidence.toFixed(4)}</span>{' '}
            <span className="text-slate-500">({pct(step.pEvidence)})</span>
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {step.rows.map((r) => {
            const s = SUSPECTS.find((x) => x.id === r.id)
            const up = r.change > 0.0005
            const down = r.change < -0.0005
            const Icon = up ? FaArrowUp : down ? FaArrowDown : FaMinus
            const tone = up ? 'text-emerald-400' : down ? 'text-blood' : 'text-slate-400'
            return (
              <article key={r.id} className="rounded border border-edge bg-ink/40 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl uppercase tracking-wider" style={{ color: s.color }}>
                    {s.name}
                  </h4>
                  <span className={`flex items-center gap-1 font-mono text-sm ${tone}`}>
                    <Icon aria-hidden /> {signedPts(r.change)}%
                  </span>
                </div>

                <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <dt className="label">Prior</dt>
                    <dd className="font-mono text-base text-slate-200">{pct(r.prior)}</dd>
                  </div>
                  <div>
                    <dt className="label">Likelihood</dt>
                    <dd className="font-mono text-base text-slate-200">{pct(r.likelihood, 0)}</dd>
                  </div>
                  <div>
                    <dt className="label">Updated</dt>
                    <dd>
                      <AnimatedPercent value={r.posterior} className="font-mono text-base text-slate-100" />
                    </dd>
                  </div>
                </dl>

                <div className="mt-3">
                  <ProbabilityBar value={r.posterior} color={s.color} marker={r.prior} />
                </div>
                <p className="mt-2 font-mono text-[11px] text-slate-500">
                  {pct(r.likelihood, 0)} × {pct(r.prior)} ÷ {pct(step.pEvidence)} = {pct(r.posterior)}
                </p>
                <p className="mt-2 text-xs text-slate-400">{evidence.reasons[r.id]}</p>
              </article>
            )
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProbabilityDashboard posteriors={step.posteriors} />
        <ProbabilityTimeline history={visibleHistory} />
      </div>

      <HowBayesWorks defaultOpen={false} />

      <div className="flex flex-wrap justify-center gap-3">
        {investigated < EVIDENCE.length ? (
          <button onClick={onRoom} className="btn-primary">
            Continue to Evidence Room
          </button>
        ) : (
          <button onClick={onReport} className="btn-primary">
            View Final Report
          </button>
        )}
      </div>
    </main>
  )
}
