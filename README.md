# HAWKINS CASE FILE: A Bayesian Missing Person Investigation System

A Statistics & Probability project. The only statistical topic used is **Bayes' theorem**.
Fictional case #1986-011: five suspects, seven pieces of evidence, no backend.

## 1. Architecture

```
Data (suspects.js, evidence.js)  ->  Engine (bayes.js)  ->  State (App.jsx)  ->  UI components
   priors + likelihoods              pure functions         history[] of         pages, charts,
                                                            posteriors           report
```

- `src/lib/bayes.js` is a pure, framework-free calculation module. A backend can replace `src/data/*` later without touching the maths.
- `App.jsx` holds one `history` array. `history[0]` is the 20% starting state and `history[i]` is the state after evidence *i*. Every screen is derived from it.

## 2. Folder structure

```
hawkins-case-file/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                     page flow + state
    ├── index.css                   Tailwind + theme + print styles
    ├── data/
    │   ├── suspects.js             5 suspects + case details
    │   └── evidence.js             7 evidence items, likelihoods, reasons
    ├── lib/
    │   ├── bayes.js                BAYES' THEOREM IMPLEMENTATION
    │   ├── bayes.test.js           self-test (npm test)
    │   ├── status.js               rank / status / evidence count
    │   └── useAnimatedNumber.js
    └── components/
        LoadingScreen, Home, CaseIntro, Header, SuspectBoard, EvidenceRoom,
        InvestigationOverlay, BayesAnalysis, ProbabilityDashboard,
        ProbabilityTimeline, FinalReport, HowBayesWorks,
        ProbabilityBar, AnimatedPercent
```

## 3. Install and run

```bash
npm install
npm run dev        # open the printed http://localhost:5173
npm run build      # production build
npm test           # Bayes self-test (no browser needed)
```

Requires Node 18+.

## 4. Where Bayes' theorem is implemented

`src/lib/bayes.js`, function `bayesUpdate(priors, likelihoods)`:

1. `P(E) = Σ P(E|Sᵢ) · P(Sᵢ)` (law of total probability)
2. `P(S|E) = P(E|S) · P(S) / P(E)` (Bayes' theorem) for each suspect
3. Normalise so the posteriors sum to exactly 1 (a floating-point safety step)

`App.jsx` calls it on every investigation, passing the **previous posterior as the new prior**.

## 5. How evidence changes the probabilities

Each evidence item stores P(E | suspect) in `evidence.js`: how likely that clue would be if that suspect were responsible. Nothing is hardcoded as a final percentage. Suspects whose profile fits the clue (high likelihood) gain probability and the others lose it, because the posteriors must sum to 100%.

## 6. Sample expected output (`npm test`)

```
Step      Steve   Mike    Dustin  Lucas   Eddie
Start     20.0%   20.0%   20.0%   20.0%   20.0%
E1        42.1%   13.2%   10.5%   15.8%   18.4%
E2        39.4%   9.2%    6.2%    12.9%   32.3%
E3        23.5%   4.4%    4.4%    21.6%   46.2%
E4        12.1%   6.8%    7.9%    13.9%   59.4%
E5        6.9%    3.3%    3.2%    9.0%    77.5%
E6        2.9%    0.9%    0.7%    3.8%    91.7%
E7        0.3%    0.2%    0.1%    1.1%    98.2%
```

Check E1 by hand for Steve: P(E) = 0.8·0.2 + 0.25·0.2 + 0.2·0.2 + 0.3·0.2 + 0.35·0.2 = 0.38, so P(Steve|E1) = 0.16 / 0.38 = **42.1%**.

## 7. Testing instructions

- `npm test` checks: a textbook 2-hypothesis case (0.5/0.5 priors, likelihoods 0.9/0.3 gives 0.75/0.25), equal 20% priors, posteriors sum to 1 at every step, uninformative evidence changes nothing, and the final result does not depend on evidence order.
- Manual: open the app, investigate evidence 1 and confirm Steve shows 42.1%. Confirm evidence 2 stays locked until evidence 1 is done. Finish all 7, then use Print, Download and Restart. Resize to phone width and confirm there is no horizontal scroll.

## 8. Viva explanation (30 seconds)

"My project is a missing-person investigation that uses only Bayes' theorem. Five suspects start with equal prior probability of 20%. Each clue has a likelihood for each suspect: the chance of seeing that clue if that suspect did it. I compute P(E) by summing likelihood × prior over all suspects, then the posterior is likelihood × prior ÷ P(E). The posterior after one clue becomes the prior for the next, so the probabilities update sequentially and always sum to 100%. The result is the most probable suspect given the simulated evidence, not proof of guilt. The likelihood values are assumptions I chose for the fiction, which is the main limitation, and the method also assumes exactly one suspect is responsible."

**Likely viva questions:** Why do posteriors sum to 1? (Dividing by P(E).) Why does order not matter? (Multiplication is commutative, which the test checks.) What is a likelihood vs a posterior? (P(E|S) vs P(S|E).) What if a likelihood is 0? (That suspect is eliminated permanently.)
