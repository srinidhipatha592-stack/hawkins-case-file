import { FaLock, FaSearch, FaCheckCircle } from 'react-icons/fa'
import { EVIDENCE } from '../data/evidence.js'

export default function EvidenceRoom({ investigated, onInvestigate, onReview, onReport }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">
            Evidence counter: {investigated} / {EVIDENCE.length} analysed
          </p>
          <h2 className="font-display text-3xl uppercase tracking-[0.15em] text-slate-100">Evidence Room</h2>
        </div>
        {investigated === EVIDENCE.length && (
          <button onClick={onReport} className="btn-primary">
            View Final Report
          </button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EVIDENCE.map((e, i) => {
          const done = i < investigated
          const available = i === investigated
          const locked = i > investigated
          return (
            <article
              key={e.id}
              className={`panel relative p-5 transition ${
                available ? 'animate-pulseRed border-blood' : ''
              } ${locked ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">EVIDENCE {String(i + 1).padStart(2, '0')}</span>
                {done && <FaCheckCircle className="text-cyan" aria-label="Analysed" />}
                {locked && <FaLock className="text-slate-500" aria-label="Locked" />}
                {available && <span className="font-mono text-[10px] uppercase tracking-wider text-blood">Available</span>}
              </div>

              <h3 className="mt-3 font-display text-xl uppercase tracking-[0.12em] text-slate-100">{e.type}</h3>
              <p className="mt-2 min-h-[3rem] text-sm text-slate-400">
                {locked ? 'Classified. Investigate the previous evidence to unlock.' : e.short}
              </p>

              <div className="mt-4">
                {available && (
                  <button onClick={() => onInvestigate(i)} className="btn-primary w-full">
                    <FaSearch aria-hidden /> Investigate
                  </button>
                )}
                {done && (
                  <button onClick={() => onReview(i + 1)} className="btn-ghost w-full">
                    Review Analysis
                  </button>
                )}
                {locked && (
                  <p className="rounded border border-edge py-3 text-center font-mono text-xs uppercase tracking-wider text-slate-500">
                    Locked until evidence {i} is investigated
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
