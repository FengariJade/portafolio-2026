'use client'

export function BartechCircuitTopLeft() {
  return (
    <svg viewBox="0 0 300 400" className="h-full w-full overflow-visible">
      <rect x="-102" y="0" width="6" height="230" fill="#fff" className="origin-top bartech-circuit-draw-y" />
      <circle cx="-99" cy="230" r="13" fill="#fff" className="bartech-circuit-pop" />
    </svg>
  )
}

export function BartechCircuitRight() {
  return (
    <svg viewBox="0 0 300 700" className="h-full w-full overflow-visible">
      <rect x="200" y="400" width="6" height="200" fill="#fff" className="origin-bottom bartech-circuit-draw-y bartech-circuit-delay-1" />
      <rect x="200" y="400" width="280" height="6" fill="#fff" className="origin-right bartech-circuit-draw-x" />
      <rect x="72" y="600" width="130" height="6" fill="#fff" className="origin-right bartech-circuit-draw-x bartech-circuit-delay-2" />
      <circle cx="70" cy="601" r="13" fill="#fff" className="bartech-circuit-pop bartech-circuit-delay-3" />
    </svg>
  )
}

export function BartechGradientRing() {
  return (
    <svg viewBox="0 0 768 768" className="h-full w-full">
      <defs>
        <linearGradient id="bartech-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60C3DC" />
          <stop offset="45%" stopColor="#56B4E8" />
          <stop offset="100%" stopColor="#504D9B" />
        </linearGradient>
      </defs>

      <circle
        cx="384"
        cy="384"
        r="299"
        fill="none"
        stroke="url(#bartech-ring-gradient)"
        strokeWidth="16"
        strokeLinecap="round"
        transform="rotate(36 384 384)"
      />
    </svg>
  )
}
