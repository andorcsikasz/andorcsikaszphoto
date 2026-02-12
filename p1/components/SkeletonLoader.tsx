export function SkeletonEventCard() {
  return (
    <div
      className="rounded-xl p-6 animate-pulse"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="flex justify-between mb-4">
        <div className="h-6 rounded-full w-2/3" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-6 rounded-full w-16" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
      </div>
      <div className="space-y-2">
        <div className="h-4 rounded-full w-full" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-4 rounded-full w-4/5" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-4 rounded-full w-3/5" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
      </div>
    </div>
  )
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg p-4 animate-pulse flex gap-3"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="w-5 h-5 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
          <div className="flex-1">
            <div className="h-4 rounded-full w-3/4 mb-2" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
            <div className="h-3 rounded-full w-1/2" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded ${className || ''}`}
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    />
  )
}
