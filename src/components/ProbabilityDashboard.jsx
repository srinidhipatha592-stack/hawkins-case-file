import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { SUSPECTS } from '../data/suspects.js'
import { pct } from '../lib/bayes.js'

/** Live ranking + horizontal bar chart of current posterior probabilities. */
export default function ProbabilityDashboard({ posteriors }) {
  const data = SUSPECTS.map((s) => ({ name: s.name, value: +(posteriors[s.id] * 100).toFixed(1), color: s.color })).sort(
    (a, b) => b.value - a.value,
  )

  return (
    <section className="panel p-5" aria-label="Current suspect probability">
      <h3 className="font-display text-lg uppercase tracking-[0.2em] text-slate-100">Current Suspect Probability</h3>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 48, bottom: 0, left: 0 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} stroke="#1c2a44" />
            <YAxis type="category" dataKey="name" width={64} stroke="#1c2a44" />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              formatter={(v) => [`${v}%`, 'Probability']}
              contentStyle={{ background: '#0e1626', border: '1px solid #1c2a44', color: '#e2e8f0' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={900}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
              <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} fill="#e2e8f0" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ol className="mt-4 space-y-1 font-mono text-sm">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center justify-between border-b border-edge/60 py-1">
            <span className="text-slate-400">
              {i + 1}. <span style={{ color: d.color }}>{d.name}</span>
            </span>
            <span className="text-slate-100">{pct(d.value / 100)}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
