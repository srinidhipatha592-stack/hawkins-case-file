import { FaSearch } from 'react-icons/fa'
import { CASE } from '../data/suspects.js'

export default function Home({ onStart }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(217,43,58,0.12),transparent_60%)]" />
      <p className="label animate-rise">Hawkins Police Department</p>
      <p className="stamp mt-4 animate-rise" style={{ animationDelay: '0.15s' }}>
        {CASE.number}
      </p>
      <h1
        className="mt-8 animate-rise font-display text-5xl font-bold uppercase leading-none tracking-[0.12em] text-slate-100 sm:text-7xl md:text-8xl"
        style={{ animationDelay: '0.3s', textShadow: '0 0 30px rgba(217,43,58,0.55)' }}
      >
        Hawkins
        <br />
        <span className="text-blood">Case File</span>
      </h1>
      <p className="mt-5 animate-rise font-display text-lg uppercase tracking-[0.35em] text-cyan sm:text-xl" style={{ animationDelay: '0.5s' }}>
        A Bayesian Investigation
      </p>
      <p className="mt-8 max-w-xl animate-rise text-base text-slate-400 sm:text-lg" style={{ animationDelay: '0.7s' }}>
        “A disappearance. Five suspects. Seven pieces of evidence. One statistical investigation.”
      </p>
      <button onClick={onStart} className="btn-primary mt-12 animate-rise" style={{ animationDelay: '0.9s' }}>
        <FaSearch aria-hidden /> Start Investigation
      </button>
    </main>
  )
}
