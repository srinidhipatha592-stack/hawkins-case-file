import { useCallback, useEffect, useState } from 'react'
import { SUSPECTS } from './data/suspects.js'
import { EVIDENCE } from './data/evidence.js'
import { bayesUpdate, equalPriors } from './lib/bayes.js'
import LoadingScreen from './components/LoadingScreen.jsx'
import Home from './components/Home.jsx'
import CaseIntro from './components/CaseIntro.jsx'
import Header from './components/Header.jsx'
import SuspectBoard from './components/SuspectBoard.jsx'
import EvidenceRoom from './components/EvidenceRoom.jsx'
import InvestigationOverlay from './components/InvestigationOverlay.jsx'
import BayesAnalysis from './components/BayesAnalysis.jsx'
import FinalReport from './components/FinalReport.jsx'

// history[0] = starting priors; history[i] = state after evidence i
const initialHistory = () => {
  const priors = equalPriors(SUSPECTS)
  return [{ posteriors: priors, priors, pEvidence: null, rows: [] }]
}

export default function App() {
  const [stage, setStage] = useState('loading')
  const [history, setHistory] = useState(initialHistory)
  const [focus, setFocus] = useState(1)
  const [investigating, setInvestigating] = useState(null) // evidence index being analysed

  const investigated = history.length - 1
  const posteriors = history[history.length - 1].posteriors

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [stage])

  const finishLoading = useCallback(() => setStage('home'), [])

  const investigate = (index) => {
    if (index !== investigated || investigating !== null) return
    setInvestigating(index)
    setTimeout(() => {
      // Bayesian update: the previous posterior is the new prior
      const result = bayesUpdate(posteriors, EVIDENCE[index].likelihoods)
      setHistory((h) => [...h, { evidenceIndex: index, ...result, priors: posteriors, likelihoods: EVIDENCE[index].likelihoods }])
      setFocus(index + 1)
      setInvestigating(null)
      setStage('analysis')
    }, 2200)
  }

  const restart = () => {
    setHistory(initialHistory())
    setFocus(1)
    setStage('intro')
  }

  const reviewEvidence = (n) => {
    setFocus(n)
    setStage('analysis')
  }

  if (stage === 'loading') return <div className="scanlines"><LoadingScreen onDone={finishLoading} /></div>

  const inCase = ['board', 'evidence', 'analysis', 'report'].includes(stage)

  return (
    <div className="scanlines min-h-screen">
      {inCase && <Header stage={stage} setStage={setStage} investigated={investigated} />}
      {investigating !== null && <InvestigationOverlay evidenceIndex={investigating} />}

      {stage === 'home' && <Home onStart={() => setStage('intro')} />}
      {stage === 'intro' && <CaseIntro onBegin={() => setStage('board')} />}
      {stage === 'board' && <SuspectBoard posteriors={posteriors} investigated={investigated} onEvidenceRoom={() => setStage('evidence')} />}
      {stage === 'evidence' && (
        <EvidenceRoom investigated={investigated} onInvestigate={investigate} onReview={reviewEvidence} onReport={() => setStage('report')} />
      )}
      {stage === 'analysis' && investigated > 0 && (
        <BayesAnalysis
          history={history}
          focus={Math.min(focus, investigated)}
          setFocus={setFocus}
          onRoom={() => setStage('evidence')}
          onReport={() => setStage('report')}
        />
      )}
      {stage === 'report' && investigated === EVIDENCE.length && <FinalReport history={history} onRestart={restart} />}
    </div>
  )
}
