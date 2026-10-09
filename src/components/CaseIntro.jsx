import { FaFolderOpen } from 'react-icons/fa'
import { CASE, SUSPECTS } from '../data/suspects.js'
import { EVIDENCE } from '../data/evidence.js'
import HowBayesWorks from './HowBayesWorks.jsx'

export default function CaseIntro({ onBegin }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <section className="panel animate-rise p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-edge pb-5">
          <div>
            <p className="label">Hawkins Police Department</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-[0.15em] text-slate-100 sm:text-3xl">{CASE.number}</h2>
          </div>
          <span className="stamp">{CASE.status}</span>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="label">Missing Person</dt>
            <dd className="mt-1 font-display text-2xl uppercase tracking-wider text-blood">{CASE.missingPerson}</dd>
          </div>
          <div>
            <dt className="label">Case Status</dt>
            <dd className="mt-1 font-display text-2xl uppercase tracking-wider text-cyan">{CASE.status}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="label">Last Seen</dt>
            <dd className="mt-1 text-slate-300">{CASE.lastSeen}</dd>
          </div>
        </dl>

        <p className="mt-6 leading-relaxed text-slate-300">{CASE.description}</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded border border-edge bg-ink/50 p-4 text-center">
            <p className="label">Suspects</p>
            <p className="mt-1 font-display text-4xl text-slate-100">{SUSPECTS.length}</p>
          </div>
          <div className="rounded border border-edge bg-ink/50 p-4 text-center">
            <p className="label">Evidence Items</p>
            <p className="mt-1 font-display text-4xl text-slate-100">{EVIDENCE.length}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={onBegin} className="btn-primary">
            <FaFolderOpen aria-hidden /> Begin Investigation
          </button>
        </div>
      </section>

      <div className="mt-8">
        <HowBayesWorks />
      </div>
    </main>
  )
}
