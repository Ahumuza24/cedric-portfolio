import { Component, lazy, Suspense, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { HeroRenderMode } from '@/lib/capabilities'

const HeroScene = lazy(() => import('./HeroScene'))

function StaticConstellation() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[14%] top-[18%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_3px_rgba(228,87,46,0.7)]" />
      <div className="absolute left-[31%] top-[9%] h-1 w-1 rounded-full bg-cyan-300" />
      <div className="absolute right-[24%] top-[19%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_18px_4px_rgba(251,146,60,0.6)]" />
      <div className="absolute right-[10%] top-[45%] h-1 w-1 rounded-full bg-cyan-300" />
      <div className="absolute bottom-[15%] left-[24%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_3px_rgba(228,87,46,0.55)]" />
      <div className="absolute bottom-[20%] right-[25%] h-1.5 w-1.5 rounded-full bg-cyan-200" />
      <div className="absolute inset-[8%] rounded-[50%] border border-cyan-300/15 [transform:rotate(-12deg)]" />
      <div className="absolute inset-[18%_6%] rounded-[50%] border border-cyan-400/15 [transform:rotate(30deg)]" />
      <svg className="h-full w-full opacity-40" viewBox="0 0 600 600" fill="none">
        <path d="M85 116 186 62l153 55 118 126-74 194-181 53L72 362l13-246Z" stroke="url(#constellation)" />
        <path d="m85 116 254 1 44 320M186 62l16 428m255-247L72 362" stroke="url(#constellation)" strokeOpacity=".45" />
        <defs>
          <linearGradient id="constellation" x1="72" y1="62" x2="467" y2="490" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E4572E" />
            <stop offset=".6" stopColor="#F5B49E" />
            <stop offset="1" stopColor="#FB923C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <StaticConstellation /> : this.props.children
  }
}

export function HeroVisual({ mode }: { mode: HeroRenderMode }) {
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    if (mode !== 'webgl') return
    const frame = window.requestAnimationFrame(() => setSceneReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [mode])

  return (
    <div data-hero-visual={mode} className="absolute inset-0" aria-hidden="true">
      {mode === 'webgl' && sceneReady ? (
        <SceneBoundary>
          <Suspense fallback={<StaticConstellation />}><HeroScene /></Suspense>
        </SceneBoundary>
      ) : (
        <StaticConstellation />
      )}
    </div>
  )
}
