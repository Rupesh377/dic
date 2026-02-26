'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export interface VRHeadsetScene3DProps {
  followMode: boolean
  pointerNorm: { x: number; y: number }
  accentColor?: number
}

function createVRHeadset(parent: THREE.Group, accentColor = 0x8b5cf6) {
  const metal = new THREE.MeshStandardMaterial({
    color: 0x1e1b4b,
    metalness: 0.6,
    roughness: 0.3,
  })
  const lens = new THREE.MeshStandardMaterial({
    color: accentColor,
    metalness: 0.3,
    roughness: 0.2,
    emissive: accentColor,
    emissiveIntensity: 0.4,
  })
  const strap = new THREE.MeshStandardMaterial({
    color: 0x312e81,
    metalness: 0.2,
    roughness: 0.6,
  })

  // Main headset body (curved front)
  const bodyGeom = new THREE.BoxGeometry(0.5, 0.25, 0.2)
  const body = new THREE.Mesh(bodyGeom, metal)
  body.position.y = 0
  parent.add(body)

  // Front face / visor
  const visorGeom = new THREE.BoxGeometry(0.48, 0.22, 0.08)
  const visor = new THREE.Mesh(visorGeom, metal)
  visor.position.set(0, 0, 0.14)
  parent.add(visor)

  // Left lens
  const lensGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 24)
  const lensL = new THREE.Mesh(lensGeom, lens)
  lensL.rotation.x = Math.PI / 2
  lensL.position.set(-0.12, 0.02, 0.18)
  parent.add(lensL)
  const lensR = new THREE.Mesh(lensGeom, lens)
  lensR.rotation.x = Math.PI / 2
  lensR.position.set(0.12, 0.02, 0.18)
  parent.add(lensR)

  // Side arms (headband)
  const armGeom = new THREE.BoxGeometry(0.06, 0.06, 0.25)
  const armL = new THREE.Mesh(armGeom, strap)
  armL.position.set(-0.28, 0, -0.02)
  parent.add(armL)
  const armR = new THREE.Mesh(armGeom, strap)
  armR.position.set(0.28, 0, -0.02)
  parent.add(armR)

  // Top band
  const bandGeom = new THREE.BoxGeometry(0.42, 0.05, 0.08)
  const band = new THREE.Mesh(bandGeom, strap)
  band.position.set(0, 0.15, -0.08)
  parent.add(band)
}

export function VRHeadsetScene3D({
  followMode,
  pointerNorm,
  accentColor = 0x8b5cf6,
}: VRHeadsetScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef({ followMode, pointerNorm })
  propsRef.current = { followMode, pointerNorm }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 2.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.outline = 'none'
    container.appendChild(canvas)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(5, 5, 5)
    scene.add(dir)
    const point = new THREE.PointLight(accentColor, 0.5)
    point.position.set(-2, -2, 2)
    scene.add(point)

    const headsetGroup = new THREE.Group()
    headsetGroup.scale.setScalar(1.2)
    createVRHeadset(headsetGroup, accentColor)
    scene.add(headsetGroup)

    let raf = 0
    const clock = new THREE.Clock()
    const currentRot = { x: 0, y: 0 }
    const currentPosY = { value: 0 }
    const smooth = 8

    function animate() {
      raf = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const { followMode, pointerNorm } = propsRef.current

      if (followMode) {
        const targetX = (pointerNorm.y - 0.5) * Math.PI * 0.4
        const targetY = (pointerNorm.x - 0.5) * Math.PI * 0.8
        currentRot.x += (targetX - currentRot.x) * Math.min(1, delta * smooth)
        currentRot.y += (targetY - currentRot.y) * Math.min(1, delta * smooth)
        headsetGroup.rotation.x = currentRot.x
        headsetGroup.rotation.y = currentRot.y
        headsetGroup.rotation.z = 0
      } else {
        currentRot.y += delta * 0.6
        headsetGroup.rotation.x = currentRot.x
        headsetGroup.rotation.y = currentRot.y
        headsetGroup.rotation.z = 0
      }
      const targetPosY = Math.sin(clock.elapsedTime * 1) * 0.06
      currentPosY.value += (targetPosY - currentPosY.value) * Math.min(1, delta * smooth)
      headsetGroup.position.y = currentPosY.value

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!container) return
      const w = container.offsetWidth
      const h = container.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      renderer.dispose()
      if (container.contains(canvas)) container.removeChild(canvas)
    }
  }, [accentColor])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full min-h-[200px] rounded-2xl overflow-hidden bg-card/40 border-0 [contain:strict]"
      style={{ display: 'block' }}
    />
  )
}
