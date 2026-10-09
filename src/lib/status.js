import { EVIDENCE } from '../data/evidence.js'

/** Number of investigated evidence items that point toward the suspect (likelihood >= 50%). */
export function evidenceCount(suspectId, investigated) {
  return EVIDENCE.slice(0, investigated).filter((e) => e.likelihoods[suspectId] >= 0.5).length
}

/** Rank (1 = highest) of a suspect by current probability. */
export function rankOf(suspectId, posteriors) {
  const order = Object.entries(posteriors)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id)
  return order.indexOf(suspectId) + 1
}

/** Text status derived from the posterior, not hard-coded. */
export function statusOf(suspectId, posteriors, investigated) {
  if (investigated === 0) return { label: 'UNDER REVIEW', tone: 'text-slate-400 border-slate-600' }
  const p = posteriors[suspectId]
  if (rankOf(suspectId, posteriors) === 1) return { label: 'MOST PROBABLE', tone: 'text-blood border-blood' }
  if (p < 0.08) return { label: 'UNLIKELY', tone: 'text-slate-500 border-slate-700' }
  if (p < 0.2) return { label: 'FALLING', tone: 'text-amber-400 border-amber-500' }
  return { label: 'PERSON OF INTEREST', tone: 'text-cyan border-cyan' }
}
