import { getHeroRenderMode, isWebGLSupported } from './capabilities'

describe('getHeroRenderMode', () => {
  it.each([
    { reducedMotion: true, webglSupported: true },
    { reducedMotion: false, webglSupported: false },
    { reducedMotion: true, webglSupported: false },
  ])('returns a static visual for $reducedMotion/$webglSupported', (capabilities) => {
    expect(getHeroRenderMode(capabilities)).toBe('static')
  })

  it('returns the WebGL scene only for capable motion-enabled devices', () => {
    expect(
      getHeroRenderMode({ reducedMotion: false, webglSupported: true }),
    ).toBe('webgl')
  })
})

describe('isWebGLSupported', () => {
  it('returns false when the browser has no WebGL constructor', () => {
    Object.defineProperty(window, 'WebGLRenderingContext', {
      configurable: true,
      value: undefined,
    })

    expect(isWebGLSupported()).toBe(false)
  })

  it('returns true when a WebGL context can be created', () => {
    Object.defineProperty(window, 'WebGLRenderingContext', {
      configurable: true,
      value: function WebGLRenderingContext() {},
    })
    const canvas = document.createElement('canvas')
    vi.spyOn(canvas, 'getContext').mockReturnValue({} as WebGLRenderingContext)
    vi.spyOn(document, 'createElement').mockReturnValue(canvas)

    expect(isWebGLSupported()).toBe(true)
  })

  it('checks the WebGL 1 fallback when WebGL 2 is unavailable', () => {
    Object.defineProperty(window, 'WebGLRenderingContext', {
      configurable: true,
      value: function WebGLRenderingContext() {},
    })
    const canvas = document.createElement('canvas')
    vi.spyOn(canvas, 'getContext').mockImplementation((contextId) =>
      contextId === 'webgl' ? ({} as WebGLRenderingContext) : null,
    )
    vi.spyOn(document, 'createElement').mockReturnValue(canvas)

    expect(isWebGLSupported()).toBe(true)
  })

  it('returns false when every WebGL context request fails', () => {
    Object.defineProperty(window, 'WebGLRenderingContext', {
      configurable: true,
      value: function WebGLRenderingContext() {},
    })
    const canvas = document.createElement('canvas')
    vi.spyOn(canvas, 'getContext').mockReturnValue(null)
    vi.spyOn(document, 'createElement').mockReturnValue(canvas)

    expect(isWebGLSupported()).toBe(false)
  })

  it('fails closed when context detection throws', () => {
    Object.defineProperty(window, 'WebGLRenderingContext', {
      configurable: true,
      value: function WebGLRenderingContext() {},
    })
    vi.spyOn(document, 'createElement').mockImplementation(() => {
      throw new Error('canvas unavailable')
    })

    expect(isWebGLSupported()).toBe(false)
  })
})
