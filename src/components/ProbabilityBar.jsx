/** Horizontal probability bar. `value` and `marker` are 0-1. */
export default function ProbabilityBar({ value, color = '#22d3ee', marker, height = 'h-2' }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-slate-800 ${height}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${Math.max(value * 100, 0.5)}%`, background: color, boxShadow: `0 0 10px ${color}66` }}
      />
      {marker !== undefined && (
        <div className="absolute top-0 h-full w-px bg-white/60" style={{ left: `${marker * 100}%` }} title="Initial 20%" />
      )}
    </div>
  )
}
