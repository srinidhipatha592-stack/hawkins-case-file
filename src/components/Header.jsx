import { FaUsers, FaBoxOpen, FaChartBar, FaFileAlt } from 'react-icons/fa'
import { EVIDENCE } from '../data/evidence.js'
import { CASE } from '../data/suspects.js'

const TABS = [
  { id: 'board', label: 'Suspects', icon: FaUsers },
  { id: 'evidence', label: 'Evidence', icon: FaBoxOpen },
  { id: 'analysis', label: 'Analysis', icon: FaChartBar },
  { id: 'report', label: 'Report', icon: FaFileAlt },
]

export default function Header({ stage, setStage, investigated }) {
  const total = EVIDENCE.length
  const disabled = (id) => (id === 'analysis' && investigated === 0) || (id === 'report' && investigated < total)

  return (
    <header className="no-print sticky top-0 z-40 border-b border-edge bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <button onClick={() => setStage('home')} className="text-left">
          <span className="block font-display text-lg uppercase tracking-[0.25em] text-blood">Hawkins Case File</span>
          <span className="label">{CASE.number}</span>
        </button>

        <nav aria-label="Sections" className="flex gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setStage(id)}
              disabled={disabled(id)}
              aria-current={stage === id ? 'page' : undefined}
              className={`flex items-center gap-2 rounded px-3 py-2 font-display text-xs uppercase tracking-[0.15em] transition disabled:cursor-not-allowed disabled:opacity-30 sm:text-sm ${
                stage === id ? 'bg-edge text-cyan' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <Icon aria-hidden />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        <div className="flex w-full items-center gap-3 sm:w-56">
          <div className="h-1.5 flex-1 overflow-hidden rounded bg-slate-800" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={investigated} aria-label="Investigation progress">
            <div className="h-full bg-cyan transition-all duration-700" style={{ width: `${(investigated / total) * 100}%` }} />
          </div>
          <span className="font-mono text-xs text-slate-300">
            {investigated}/{total}
          </span>
        </div>
      </div>
    </header>
  )
}
