import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { SUSPECTS } from '../data/suspects.js'
import { pct } from '../lib/bayes.js'

/** Line chart + "Previous → Current" chain of probabilities across evidence. */
export default function ProbabilityTimeline({ history }) {
  const data = history.map((h, i) => ({
    step: i === 0 ? 'Start' : `E${i}`,
    ...Object.fromEntries(SUSPECTS.map((s) => [s.name, +(h.posteriors[s.id] * 100).toFixed(1)])),
  }))

  return (
    <section className="panel p-5" aria-label="Probability timeline">
      <h3 className="font-display text-lg uppercase tracking-[0.2em] text-slate-100">Probability Timeline</h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
            <CartesianGrid stroke="#1c2a44" strokeDasharray="3 3" />
            <XAxis dataKey="step" stroke="#1c2a44" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} stroke="#1c2a44" />
            <Tooltip
              formatter={(v) => `${v}%`}
              contentStyle={{ background: '#0e1626', border: '1px solid #1c2a44', color: '#e2e8f0' }}
            />
            <Legend />
            {SUSPECTS.map((s) => (
              <Line key={s.id} type="monotone" dataKey={s.name} stroke={s.color} strokeWidth={2} dot={{ r: 3 }} animationDuration={900} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {SUSPECTS.map((s) => (
          <div key={s.id} className="rounded border border-edge bg-ink/40 p-3">
            <p className="font-display text-sm uppercase tracking-wider" style={{ color: s.color }}>
              {s.name}
            </p>
            <p className="mt-1 break-words font-mono text-xs text-slate-300">
              {history.map((h) => pct(h.posteriors[s.id], 0)).join(' → ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
