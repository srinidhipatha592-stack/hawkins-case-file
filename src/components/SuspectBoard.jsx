import { SUSPECTS } from '../data/suspects.js'
import { EVIDENCE } from '../data/evidence.js'
import { equalPriors, pct } from '../lib/bayes.js'
import { evidenceCount, rankOf, statusOf } from '../lib/status.js'
import ProbabilityBar from './ProbabilityBar.jsx'
import AnimatedPercent from './AnimatedPercent.jsx'

export default function SuspectBoard({ posteriors, investigated, onEvidenceRoom }) {
  const priors = equalPriors(SUSPECTS)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">Evidence board</p>
          <h2 className="font-display text-3xl uppercase tracking-[0.15em] text-slate-100">Suspect Board</h2>
        </div>
        <button onClick={onEvidenceRoom} className="btn-primary">
          Go to Evidence Room
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SUSPECTS.map((s, i) => {
          const status = statusOf(s.id, posteriors, investigated)
          const current = posteriors[s.id]
          const count = evidenceCount(s.id, investigated)
          const rank = rankOf(s.id, posteriors)
          return (
            <article
              key={s.id}
              className="panel relative animate-rise p-5 transition hover:border-cyan/50"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="absolute -top-2 left-4 h-3 w-3 rounded-full bg-blood shadow-[0_0_8px_rgba(217,43,58,0.8)]" aria-hidden />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-[0.12em]" style={{ color: s.color }}>
                    {s.name}
                  </h3>
                  <p className="font-mono text-xs text-slate-400">
                    Age {s.age} · {s.role}
                  </p>
                </div>
                {investigated > 0 && <span className="font-mono text-xs text-slate-400">#{rank}</span>}
              </div>

              <p className="mt-3 min-h-[4.5rem] text-sm text-slate-400">{s.profile}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-edge pt-4">
                <div>
                  <p className="label">Initial</p>
                  <p className="font-mono text-lg text-slate-300">{pct(priors[s.id], 0)}</p>
                </div>
                <div>
                  <p className="label">Current</p>
                  <AnimatedPercent value={current} className="font-mono text-lg text-slate-100" />
                </div>
              </div>

              <div className="mt-3">
                <ProbabilityBar value={current} color={s.color} marker={priors[s.id]} />
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <p className="font-mono text-xs text-slate-400">
                  Evidence linked: <span className="text-slate-100">{count}</span>/{EVIDENCE.length}
                </p>
                <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${status.tone}`}>
                  {status.label}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
