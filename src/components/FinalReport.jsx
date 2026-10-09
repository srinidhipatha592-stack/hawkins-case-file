import { useState } from 'react'
import { FaPrint, FaDownload, FaRedo, FaFileAlt } from 'react-icons/fa'
import { CASE, SUSPECTS } from '../data/suspects.js'
import { EVIDENCE } from '../data/evidence.js'
import { confidenceLevel, leader, pct, signedPts } from '../lib/bayes.js'
import ProbabilityTimeline from './ProbabilityTimeline.jsx'
import ProbabilityDashboard from './ProbabilityDashboard.jsx'

const DISCLAIMER =
  'This result represents the highest posterior probability based on the simulated evidence. It does not represent proof of guilt.'

function buildTextReport(history) {
  const final = history.at(-1).posteriors
  const [topId, topP] = leader(final)
  const top = SUSPECTS.find((s) => s.id === topId)
  const lines = [
    'HAWKINS POLICE DEPARTMENT - FINAL CASE REPORT',
    `${CASE.number} | Missing person: ${CASE.missingPerson} | Status: ${CASE.status}`,
    '',
    `Most probable suspect (simulated evidence): ${top.name}`,
    `Final probability: ${pct(topP)}`,
    `Evidence analysed: ${history.length - 1} / ${EVIDENCE.length}`,
    '',
    'PROBABILITY AFTER EACH EVIDENCE ITEM (%)',
    ['Step'.padEnd(26), ...SUSPECTS.map((s) => s.name.padEnd(8))].join(''),
  ]
  history.forEach((h, i) => {
    const label = i === 0 ? 'Initial (priors)' : `E${i} ${EVIDENCE[i - 1].type}`
    lines.push([label.padEnd(26), ...SUSPECTS.map((s) => pct(h.posteriors[s.id]).padEnd(8))].join(''))
  })
  lines.push('', 'METHOD: P(S|E) = P(E|S) x P(S) / P(E), P(E) = sum of P(E|Si) x P(Si); posterior becomes next prior.', '', DISCLAIMER)
  return lines.join('\n')
}

export default function FinalReport({ history, onRestart }) {
  const [full, setFull] = useState(false)
  const final = history.at(-1).posteriors
  const [topId, topP] = leader(final)
  const top = SUSPECTS.find((s) => s.id === topId)
  const conf = confidenceLevel(final)

  const download = () => {
    const blob = new Blob([buildTextReport(history)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hawkins-case-1986-011-report.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="print-area mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="panel animate-rise p-6 text-center sm:p-10">
        <p className="label">Hawkins Police Department · {CASE.number}</p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.2em] text-slate-100 sm:text-4xl">Case Investigation Complete</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="label">Most Probable Suspect</p>
            <p className="mt-2 font-display text-5xl uppercase tracking-wider" style={{ color: top.color }}>
              {top.name}
            </p>
            <p className="mt-1 text-xs text-slate-400">based on the available simulated evidence</p>
          </div>
          <div>
            <p className="label">Final Probability</p>
            <p className="mt-2 font-display text-5xl text-blood">{pct(topP)}</p>
          </div>
          <div>
            <p className="label">Evidence Analysed</p>
            <p className="mt-2 font-display text-5xl text-cyan">
              {history.length - 1} / {EVIDENCE.length}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <p className="label">Confidence Indicator: {conf.label}</p>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-blood transition-all duration-1000" style={{ width: `${conf.score * 100}%` }} />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-sm italic text-slate-400">{DISCLAIMER}</p>

        <div className="no-print mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onRestart} className="btn-ghost">
            <FaRedo aria-hidden /> Restart Investigation
          </button>
          <button onClick={() => setFull((f) => !f)} className="btn-primary" aria-expanded={full}>
            <FaFileAlt aria-hidden /> {full ? 'Hide Full Report' : 'View Full Report'}
          </button>
          <button onClick={() => window.print()} className="btn-ghost">
            <FaPrint aria-hidden /> Print
          </button>
          <button onClick={download} className="btn-ghost">
            <FaDownload aria-hidden /> Download
          </button>
        </div>
      </section>

      <section className="panel p-5">
        <h3 className="font-display text-lg uppercase tracking-[0.2em] text-slate-100">Probability After Each Evidence Item</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-edge text-slate-400">
                <th className="py-2 pr-3 font-normal">Step</th>
                {SUSPECTS.map((s) => (
                  <th key={s.id} className="px-2 py-2 font-normal" style={{ color: s.color }}>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => {
                const [lead] = leader(h.posteriors)
                return (
                  <tr key={i} className="border-b border-edge/50">
                    <td className="py-2 pr-3 text-slate-300">{i === 0 ? 'Initial' : `Evidence ${i}`}</td>
                    {SUSPECTS.map((s) => (
                      <td key={s.id} className={`px-2 py-2 ${lead === s.id && i > 0 ? 'font-semibold text-slate-100' : 'text-slate-400'}`}>
                        {pct(h.posteriors[s.id])}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProbabilityDashboard posteriors={final} />
        <ProbabilityTimeline history={history} />
      </div>

      {full && (
        <section className="space-y-4">
          <h3 className="font-display text-xl uppercase tracking-[0.2em] text-slate-100">Full Report: Evidence by Evidence</h3>
          {EVIDENCE.map((e, i) => {
            const step = history[i + 1]
            const biggest = [...step.rows].sort((a, b) => Math.abs(b.change) - Math.abs(a.change))[0]
            const s = SUSPECTS.find((x) => x.id === biggest.id)
            return (
              <article key={e.id} className="panel p-5">
                <p className="label">Evidence {i + 1}</p>
                <h4 className="font-display text-lg uppercase tracking-wider text-blood">{e.type}</h4>
                <p className="mt-2 text-sm text-slate-300">{e.finding}</p>
                <p className="mt-3 font-mono text-xs text-slate-400">
                  P(E) = {step.pEvidence.toFixed(4)} · Largest change: <span style={{ color: s.color }}>{s.name}</span>{' '}
                  {pct(biggest.prior)} → {pct(biggest.posterior)} ({signedPts(biggest.change)} pts)
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[420px] font-mono text-xs">
                    <thead>
                      <tr className="text-slate-500">
                        <th className="py-1 text-left font-normal">Suspect</th>
                        <th className="py-1 text-right font-normal">Prior</th>
                        <th className="py-1 text-right font-normal">Likelihood</th>
                        <th className="py-1 text-right font-normal">Posterior</th>
                        <th className="py-1 text-right font-normal">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {step.rows.map((r) => (
                        <tr key={r.id} className="border-t border-edge/50 text-slate-300">
                          <td className="py-1">{SUSPECTS.find((x) => x.id === r.id).name}</td>
                          <td className="py-1 text-right">{pct(r.prior)}</td>
                          <td className="py-1 text-right">{pct(r.likelihood, 0)}</td>
                          <td className="py-1 text-right">{pct(r.posterior)}</td>
                          <td className="py-1 text-right">{signedPts(r.change)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            )
          })}
        </section>
      )}
    </main>
  )
}
