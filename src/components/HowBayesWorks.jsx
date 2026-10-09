const STEPS = [
  {
    n: '1',
    title: 'Prior Probability',
    text: 'What we believe before the new clue. At the start each of the 5 suspects has P = 1/5 = 20%.',
  },
  {
    n: '2',
    title: 'New Evidence',
    text: 'A clue arrives, such as CCTV footage of a tall figure. It should make some suspects more likely and others less likely.',
  },
  {
    n: '3',
    title: 'Likelihood',
    text: 'How likely is this clue if the suspect did it? A tall athlete is more likely to match the footage than a short suspect: P(E | Steve) = 80%, P(E | Dustin) = 20%.',
  },
  {
    n: '4',
    title: 'Posterior Probability',
    text: 'The updated belief: P(S | E) = P(E | S) × P(S) ÷ P(E). It becomes the prior for the next clue.',
  },
]

export default function HowBayesWorks({ defaultOpen = true }) {
  return (
    <details className="panel group p-5" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <span className="font-display text-lg uppercase tracking-[0.2em] text-cyan">How Bayes’ Theorem Works</span>
        <span className="label group-open:hidden">Show</span>
        <span className="label hidden group-open:inline">Hide</span>
      </summary>
      <p className="mt-4 rounded border border-edge bg-ink/60 p-3 text-center font-mono text-sm text-slate-200 sm:text-base">
        P(Suspect | Evidence) = P(Evidence | Suspect) × P(Suspect) ÷ P(Evidence)
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded border border-edge bg-ink/40 p-4">
            <p className="font-mono text-xs text-blood">STEP {s.n}</p>
            <h3 className="mt-1 font-display text-base uppercase tracking-wider text-slate-100">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{s.text}</p>
          </div>
        ))}
      </div>
    </details>
  )
}
