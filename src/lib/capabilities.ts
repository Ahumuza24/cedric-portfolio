export type HeroRenderMode = 'static' | 'webgl'

type HeroCapabilities = {
  reducedMotion: boolean
  webglSupported: boolean
}

export function getHeroRenderMode({
  reducedMotion,
  webglSupported,
}: HeroCapabilities): HeroRenderMode {
  return reducedMotion || !webglSupported ? 'static' : 'webgl'
}

export function isWebGLSupported(): boolean {
  if (typeof document === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}
