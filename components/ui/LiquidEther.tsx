'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type LiquidEtherProps = {
  mouseForce?: number
  cursorSize?: number
  isViscous?: boolean
  viscous?: number
  iterationsViscous?: number
  iterationsPoisson?: number
  dt?: number
  BFECC?: boolean
  resolution?: number
  isBounce?: boolean
  colors?: string[]
  style?: React.CSSProperties
  className?: string
  autoDemo?: boolean
  autoSpeed?: number
  autoIntensity?: number
  takeoverDuration?: number
  autoResumeDelay?: number
  autoRampDuration?: number
}

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = true,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const webglRef = useRef<any>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const rafRef = useRef<number | null>(null)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
  const isVisibleRef = useRef(true)
  const resizeRafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    function makePaletteTexture(stops: string[]) {
      let arr: string[]
      if (Array.isArray(stops) && stops.length > 0) {
        if (stops.length === 1) {
          arr = [stops[0], stops[0]]
        } else {
          arr = stops
        }
      } else {
        arr = ['#ffffff', '#ffffff']
      }
      const w = arr.length
      const data = new Uint8Array(w * 4)
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i])
        data[i * 4 + 0] = Math.round(c.r * 255)
        data[i * 4 + 1] = Math.round(c.g * 255)
        data[i * 4 + 2] = Math.round(c.b * 255)
        data[i * 4 + 3] = 255
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat)
      tex.magFilter = THREE.LinearFilter
      tex.minFilter = THREE.LinearFilter
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.generateMipmaps = false
      tex.needsUpdate = true
      return tex
    }

    const paletteTex = makePaletteTexture(colors)
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0)

    class CommonClass {
      width = 0
      height = 0
      aspect = 1
      pixelRatio = 1
      container: HTMLElement | null = null
      renderer: THREE.WebGLRenderer | null = null
      clock: THREE.Clock | null = null

      init(container: HTMLElement) {
        this.container = container
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
        this.resize()
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.autoClear = false
        this.renderer.setClearColor(new THREE.Color(0x000000), 0)
        this.renderer.setPixelRatio(this.pixelRatio)
        this.renderer.setSize(this.width, this.height)
        this.renderer.domElement.style.width = '100%'
        this.renderer.domElement.style.height = '100%'
        this.renderer.domElement.style.display = 'block'
        this.clock = new THREE.Clock()
        this.clock.start()
      }

      resize() {
        if (!this.container) return
        const rect = this.container.getBoundingClientRect()
        this.width = Math.max(1, Math.floor(rect.width))
        this.height = Math.max(1, Math.floor(rect.height))
        this.aspect = this.width / this.height
        if (this.renderer) this.renderer.setSize(this.width, this.height, false)
      }

      update() {
        if (!this.clock) return
        this.clock.getDelta()
      }
    }
    const Common = new CommonClass()

    class MouseClass {
      mouseMoved = false
      coords = new THREE.Vector2()
      coords_old = new THREE.Vector2()
      diff = new THREE.Vector2()
      timer: number | null = null
      container: HTMLElement | null = null
      listenerTarget: Window | null = null
      isHoverInside = false
      isAutoActive = false
      autoIntensity = 2.0
      takeoverActive = false
      takeoverStartTime = 0
      takeoverDuration = 0.25
      takeoverFrom = new THREE.Vector2()
      takeoverTo = new THREE.Vector2()
      onInteract: (() => void) | null = null

      _onMouseMove = this.onDocumentMouseMove.bind(this)

      init(container: HTMLElement) {
        this.container = container
        const defaultView = container.ownerDocument.defaultView || window
        this.listenerTarget = defaultView
        this.listenerTarget.addEventListener('mousemove', this._onMouseMove)
      }

      dispose() {
        if (this.listenerTarget) {
          this.listenerTarget.removeEventListener('mousemove', this._onMouseMove)
        }
        this.listenerTarget = null
        this.container = null
      }

      isPointInside(clientX: number, clientY: number) {
        if (!this.container) return false
        const rect = this.container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return false
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      }

      updateHoverState(clientX: number, clientY: number) {
        this.isHoverInside = this.isPointInside(clientX, clientY)
        return this.isHoverInside
      }

      setCoords(x: number, y: number) {
        if (!this.container) return
        if (this.timer) window.clearTimeout(this.timer)
        const rect = this.container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return
        const nx = (x - rect.left) / rect.width
        const ny = (y - rect.top) / rect.height
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1))
        this.mouseMoved = true
        this.timer = window.setTimeout(() => {
          this.mouseMoved = false
        }, 100)
      }

      setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny)
        this.mouseMoved = true
      }

      onDocumentMouseMove(event: MouseEvent) {
        if (!this.updateHoverState(event.clientX, event.clientY)) return
        if (this.onInteract) this.onInteract()
        this.setCoords(event.clientX, event.clientY)
      }

      update() {
        this.diff.subVectors(this.coords, this.coords_old)
        this.coords_old.copy(this.coords)
        if (!this.isAutoActive) this.diff.multiplyScalar(this.autoIntensity)
      }
    }
    const Mouse = new MouseClass()

    class Simulation {
      options: any
      fbos: any
      fboSize = new THREE.Vector2()
      cellScale = new THREE.Vector2()

      constructor(options: any) {
        this.options = {
          iterations_poisson: 32,
          iterations_viscous: 32,
          mouse_force: 20,
          resolution: 0.5,
          cursor_size: 100,
          viscous: 30,
          isBounce: false,
          dt: 0.014,
          isViscous: false,
          BFECC: true,
          ...options,
        }
        this.fbos = {}
        this.init()
      }

      getFloatType() {
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent)
        return isIOS ? THREE.HalfFloatType : THREE.FloatType
      }

      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width))
        const height = Math.max(1, Math.round(this.options.resolution * Common.height))
        const px_x = 1.0 / width
        const px_y = 1.0 / height
        this.cellScale.set(px_x, px_y)
        this.fboSize.set(width, height)
      }

      init() {
        this.calcSize()
        const type = this.getFloatType()
        const opts = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        }
        this.fbos.vel = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts)
        this.fbos.out = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts)
      }

      resize() {
        this.calcSize()
        Object.values(this.fbos).forEach((fbo: any) => {
          fbo.setSize(this.fboSize.x, this.fboSize.y)
        })
      }

      update() {
        const renderer = Common.renderer
        if (!renderer) return
        renderer.setRenderTarget(null)
      }
    }

    class Output {
      simulation: Simulation
      scene: THREE.Scene
      camera: THREE.Camera

      constructor() {
        this.simulation = new Simulation({})
        this.scene = new THREE.Scene()
        this.camera = new THREE.Camera()
        const quad = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: `
              attribute vec3 position;
              varying vec2 vUv;
              void main() {
                vUv = position.xy * 0.5 + 0.5;
                gl_Position = vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              varying vec2 vUv;
              uniform sampler2D velocity;
              uniform sampler2D palette;
              uniform vec4 bgColor;
              void main() {
                vec2 vel = texture2D(velocity, vUv).xy;
                float lenv = clamp(length(vel), 0.0, 1.0);
                vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
                vec3 outRGB = mix(bgColor.rgb, c, lenv);
                float outA = mix(bgColor.a, 1.0, lenv);
                gl_FragColor = vec4(outRGB, outA);
              }
            `,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.vel.texture },
              palette: { value: paletteTex },
              bgColor: { value: bgVec4 },
            },
          }),
        )
        this.scene.add(quad)
      }

      resize() {
        this.simulation.resize()
      }

      render() {
        if (!Common.renderer) return
        Common.renderer.setRenderTarget(null)
        Common.renderer.render(this.scene, this.camera)
      }

      update() {
        this.simulation.update()
        this.render()
      }
    }

    class WebGLManager {
      output: Output
      running = false

      constructor(container: HTMLElement) {
        Common.init(container)
        Mouse.init(container)
        this.output = new Output()
        container.prepend(Common.renderer!.domElement)
        this.loop = this.loop.bind(this)
        this.resize = this.resize.bind(this)
        window.addEventListener('resize', this.resize)
      }

      resize() {
        Common.resize()
        this.output.resize()
      }

      render() {
        Mouse.update()
        Common.update()
        this.output.update()
      }

      loop() {
        if (!this.running) return
        this.render()
        rafRef.current = requestAnimationFrame(this.loop)
      }

      start() {
        if (this.running) return
        this.running = true
        this.loop()
      }

      pause() {
        this.running = false
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      }

      dispose() {
        try {
          window.removeEventListener('resize', this.resize)
          Mouse.dispose()
          if (Common.renderer) {
            const canvas = Common.renderer.domElement
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
            Common.renderer.dispose()
          }
        } catch {
          // ignore
        }
      }
    }

    const container = mountRef.current
    container.style.position = container.style.position || 'relative'
    container.style.overflow = container.style.overflow || 'hidden'

    const webgl = new WebGLManager(container)
    webglRef.current = webgl

    const applyOptionsFromProps = () => {
      if (!webglRef.current) return
      const sim = webglRef.current.output?.simulation
      if (!sim) return
      const prevRes = sim.options.resolution
      Object.assign(sim.options, {
        mouse_force: mouseForce,
        cursor_size: cursorSize,
        isViscous,
        viscous,
        iterations_viscous: iterationsViscous,
        iterations_poisson: iterationsPoisson,
        dt,
        BFECC,
        resolution,
        isBounce,
      })
      if (resolution !== prevRes) {
        sim.resize()
      }
    }
    applyOptionsFromProps()

    webgl.start()

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0
        isVisibleRef.current = isVisible
        if (!webglRef.current) return
        if (isVisible && !document.hidden) {
          webglRef.current.start()
        } else {
          webglRef.current.pause()
        }
      },
      { threshold: [0, 0.01, 0.1] },
    )
    io.observe(container)
    intersectionObserverRef.current = io

    const ro = new ResizeObserver(() => {
      if (!webglRef.current) return
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current)
      resizeRafRef.current = requestAnimationFrame(() => {
        if (!webglRef.current) return
        webglRef.current.resize()
      })
    })
    ro.observe(container)
    resizeObserverRef.current = ro

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (resizeObserverRef.current) {
        try {
          resizeObserverRef.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (intersectionObserverRef.current) {
        try {
          intersectionObserverRef.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (webglRef.current) {
        webglRef.current.dispose()
      }
      webglRef.current = null
    }
  }, [
    BFECC,
    cursorSize,
    dt,
    isBounce,
    isViscous,
    iterationsPoisson,
    iterationsViscous,
    mouseForce,
    resolution,
    viscous,
    colors,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
  ])

  useEffect(() => {
    const webgl = webglRef.current
    if (!webgl) return
    const sim = webgl.output?.simulation
    if (!sim) return
    const prevRes = sim.options.resolution
    Object.assign(sim.options, {
      mouse_force: mouseForce,
      cursor_size: cursorSize,
      isViscous,
      viscous,
      iterations_viscous: iterationsViscous,
      iterations_poisson: iterationsPoisson,
      dt,
      BFECC,
      resolution,
      isBounce,
    })
    if (resolution !== prevRes) {
      sim.resize()
    }
  }, [
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    dt,
    BFECC,
    resolution,
    isBounce,
  ])

  return <div ref={mountRef} className={`liquid-ether-container ${className || ''}`} style={style} />
}

