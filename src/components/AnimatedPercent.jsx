import useAnimatedNumber from '../lib/useAnimatedNumber.js'

/** Displays a probability (0-1) as an animated percentage. */
export default function AnimatedPercent({ value, digits = 1, className = '' }) {
  const v = useAnimatedNumber(value)
  return <span className={className}>{(v * 100).toFixed(digits)}%</span>
}
