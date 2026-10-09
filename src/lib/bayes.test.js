// Run with: npm test
import { bayesUpdate, equalPriors, runInvestigation, pct } from './bayes.js'
import { SUSPECTS } from '../data/suspects.js'
import { EVIDENCE } from '../data/evidence.js'

let failed = 0
const check = (name, cond) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`)
  if (!cond) failed++
}
const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps

// 1. Textbook two-hypothesis example: prior 0.5/0.5, likelihoods 0.9 / 0.3
const t = bayesUpdate({ a: 0.5, b: 0.5 }, { a: 0.9, b: 0.3 })
check('P(E) = 0.6', near(t.pEvidence, 0.6))
check('P(A|E) = 0.75', near(t.posteriors.a, 0.75))
check('P(B|E) = 0.25', near(t.posteriors.b, 0.25))

// 2. Equal priors are 20% each
const priors = equalPriors(SUSPECTS)
check('equal priors are 20%', Object.values(priors).every((p) => near(p, 0.2)))

// 3. Every update sums to 100%
const history = runInvestigation(SUSPECTS, EVIDENCE)
check(
  'posteriors sum to 1 after every evidence item',
  history.every((h) => near(Object.values(h.posteriors).reduce((a, b) => a + b, 0), 1)),
)

// 4. Equal likelihoods leave probabilities unchanged
const same = bayesUpdate(priors, Object.fromEntries(SUSPECTS.map((s) => [s.id, 0.5])))
check('uninformative evidence changes nothing', Object.values(same.posteriors).every((p) => near(p, 0.2)))

// 5. Order independence: reversing evidence gives the same final result
const reversed = runInvestigation(SUSPECTS, [...EVIDENCE].reverse())
check(
  'final posterior independent of evidence order',
  SUSPECTS.every((s) => near(history.at(-1).posteriors[s.id], reversed.at(-1).posteriors[s.id])),
)

console.log('\nStep-by-step posteriors (%):')
console.log(['Step'.padEnd(10), ...SUSPECTS.map((s) => s.name.padEnd(8))].join(''))
history.forEach((h, i) =>
  console.log(
    [(i === 0 ? 'Start' : `E${i}`).padEnd(10), ...SUSPECTS.map((s) => pct(h.posteriors[s.id]).padEnd(8))].join(''),
  ),
)

if (failed) {
  console.error(`\n${failed} test(s) failed`)
  process.exit(1)
}
console.log('\nAll tests passed')
