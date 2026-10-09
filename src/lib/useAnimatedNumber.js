import { useEffect, useRef, useState } from 'react'

/** Smoothly animates a number from its previous value to `target`. */
export default function useAnimatedNumber(target, duration = 900) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const from = current.current
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      current.current = from + (target - from) * eased
      setValue(current.current)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}
