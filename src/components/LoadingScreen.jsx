import { useEffect, useState } from 'react'

const LINES = [
  'CONNECTING TO HAWKINS P.D. ARCHIVE...',
  'DECRYPTING CASE #1986-011...',
  'LOADING PRIOR PROBABILITIES...',
  'READY.',
]

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          return 100
        }
        return p + 4
      })
    }, 90)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onDone, 400)
      return () => clearTimeout(t)
    }
  }, [progress, onDone])

  const lineCount = Math.min(LINES.length, Math.floor(progress / 26) + 1)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="animate-flicker font-display text-3xl uppercase tracking-[0.35em] text-blood sm:text-5xl">Hawkins</h1>
      <div className="mt-8 w-full max-w-md">
        <div className="h-1 w-full overflow-hidden rounded bg-slate-800">
          <div className="h-full bg-cyan transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 min-h-[5.5rem] font-mono text-xs leading-6 text-slate-400">
          {LINES.slice(0, lineCount).map((l) => (
            <p key={l}>&gt; {l}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
