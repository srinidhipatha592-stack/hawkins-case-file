/**
 * BAYES' THEOREM ENGINE
 * ---------------------
 * For a suspect S and a piece of evidence E:
 *
 *            P(E | S) * P(S)
 * P(S | E) = ----------------
 *                 P(E)
 *
 *  P(S)      PRIOR       - belief in S BEFORE seeing E
 *  P(E | S)  LIKELIHOOD  - chance of observing E if S were responsible
 *  P(E)      EVIDENCE    - total probability of E over all suspects
 *                          (law of total probability):
 *                          P(E) = sum over all suspects of P(E | Si) * P(Si)
 *  P(S | E)  POSTERIOR   - belief in S AFTER seeing E
 *
 * The posterior of one step becomes the prior of the next step.
 * Exactly one suspect is assumed responsible (mutually exclusive and
 * exhaustive hypotheses), which is why the posteriors sum to 1.
 */

/**
 * Perform one Bayesian update.
 * @param {Object<string, number>} priors       suspectId -> P(S)
 * @param {Object<string, number>} likelihoods  suspectId -> P(E | S)
 * @returns {{pEvidence:number, posteriors:Object, rows:Array}}
 */
export function bayesUpdate(priors, likelihoods) {
  const ids = Object.keys(priors)

  // Step 1: P(E) = sum( P(E|Si) * P(Si) )  -- law of total probability
  const pEvidence = ids.reduce((sum, id) => sum + likelihoods[id] * priors[id], 0)
  if (pEvidence <= 0) throw new Error('P(E) must be greater than zero')

  // Step 2: P(S|E) = P(E|S) * P(S) / P(E)  -- Bayes' theorem
  const raw = {}
  ids.forEach((id) => {
    raw[id] = (likelihoods[id] * priors[id]) / pEvidence
  })

  // Step 3: normalise (safety step so the total is exactly 1 despite
  // floating-point rounding; mathematically it is already 1)
  const total = ids.reduce((sum, id) => sum + raw[id], 0)
  const posteriors = {}
  ids.forEach((id) => {
    posteriors[id] = raw[id] / total
  })

  const rows = ids.map((id) => ({
    id,
    prior: priors[id],
    likelihood: likelihoods[id],
    joint: likelihoods[id] * priors[id], // numerator of Bayes' theorem
    posterior: posteriors[id],
    change: posteriors[id] - priors[id], // in probability (x100 = percentage points)
  }))

  return { pEvidence, posteriors, rows }
}

/** Equal priors for every suspect (1 / n). */
export function equalPriors(suspects) {
  const p = 1 / suspects.length
  return Object.fromEntries(suspects.map((s) => [s.id, p]))
}

/**
 * Apply the first `count` evidence items in order.
 * Returns history[0] = start state, history[i] = state after evidence i.
 */
export function runInvestigation(suspects, evidence, count = evidence.length) {
  let priors = equalPriors(suspects)
  const history = [{ evidenceIndex: null, posteriors: priors, priors, pEvidence: null, rows: [] }]
  for (let i = 0; i < count; i++) {
    const result = bayesUpdate(priors, evidence[i].likelihoods)
    history.push({ evidenceIndex: i, priors, likelihoods: evidence[i].likelihoods, ...result })
    priors = result.posteriors
  }
  return history
}

/** Formatting helpers */
export const pct = (x, digits = 1) => `${(x * 100).toFixed(digits)}%`
export const signedPts = (x, digits = 1) => `${x >= 0 ? '+' : '−'}${Math.abs(x * 100).toFixed(digits)}`

/** Suspect with the highest posterior. */
export function leader(posteriors) {
  return Object.entries(posteriors).sort((a, b) => b[1] - a[1])[0]
}

/** Qualitative confidence based on the posterior and lead over runner-up. */
export function confidenceLevel(posteriors) {
  const sorted = Object.values(posteriors).sort((a, b) => b - a)
  const top = sorted[0]
  const margin = top - sorted[1]
  if (top >= 0.85 && margin >= 0.6) return { label: 'VERY HIGH', score: top }
  if (top >= 0.65) return { label: 'HIGH', score: top }
  if (top >= 0.4) return { label: 'MODERATE', score: top }
  return { label: 'LOW', score: top }
}
