'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export interface Scene3DProps {
  followMode: boolean
  pointerNorm: { x: number; y: number }
}

function createRobot(parent: THREE.Group) {
  const metal = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    metalness: 0.5,
    roughness: 0.35,
    emissive: 0x1e40af,
    emissiveIntensity: 0.15,
  })
  const accent = new THREE.MeshStandardMaterial({
    color: 0x60a5fa,
    metalness: 0.4,
    roughness: 0.3,
    emissive: 0x2563eb,
    emissiveIntensity: 0.25,
  })
  const eye = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    emissive: 0x0e7490,
    emissiveIntensity: 0.8,
  })
  const chest = new THREE.MeshStandardMaterial({
    color: 0x1e3a5f,
    metalness: 0.6,
    roughness: 0.2,
  })

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 0.25), metal)
  body.position.y = 0
  parent.add(body)

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), metal)
  head.position.y = 0.42
  parent.add(head)

  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.02), eye)
  eyeL.position.set(-0.08, 0.48, 0.18)
  parent.add(eyeL)
  const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.02), eye)
  eyeR.position.set(0.08, 0.48, 0.18)
  parent.add(eyeR)

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8), accent)
  antenna.position.y = 0.62
  parent.add(antenna)
  const antennaBall = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), accent)
  antennaBall.position.y = 0.7
  parent.add(antennaBall)

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.12), accent)
  armL.position.set(-0.38, 0.15, 0)
  armL.rotation.z = Math.PI / 6
  parent.add(armL)
  const armR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.12), accent)
  armR.position.set(0.38, 0.15, 0)
  armR.rotation.z = -Math.PI / 6
  parent.add(armR)

  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.35, 0.14), metal)
  legL.position.set(-0.12, -0.42, 0)
  parent.add(legL)
  const legR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.35, 0.14), metal)
  legR.position.set(0.12, -0.42, 0)
  parent.add(legR)

  const chestPanel = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.2, 0.02), chest)
  chestPanel.position.set(0, 0.05, 0.14)
  parent.add(chestPanel)
}

export function Scene3D({ followMode, pointerNorm }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef({ followMode, pointerNorm })
  propsRef.current = { followMode, pointerNorm }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.outline = 'none'
    container.appendChild(canvas)

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(5, 5, 5)
    scene.add(dir)
    const point = new THREE.PointLight(0x60a5fa, 0.4)
    point.position.set(-3, -3, 2)
    scene.add(point)

    const robotGroup = new THREE.Group()
    robotGroup.scale.setScalar(0.9)
    createRobot(robotGroup)
    scene.add(robotGroup)

    let raf = 0
    const clock = new THREE.Clock()
    const currentRot = { x: 0, y: 0 }
    const currentPosY = { value: 0 }
    const smooth = 8 // higher = snappier, lower = smoother

    function animate() {
      raf = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const { followMode, pointerNorm } = propsRef.current

      if (followMode) {
        const targetX = (pointerNorm.y - 0.5) * Math.PI * 0.5
        const targetY = (pointerNorm.x - 0.5) * Math.PI * 0.8
        currentRot.x += (targetX - currentRot.x) * Math.min(1, delta * smooth)
        currentRot.y += (targetY - currentRot.y) * Math.min(1, delta * smooth)
        robotGroup.rotation.x = currentRot.x
        robotGroup.rotation.y = currentRot.y
        robotGroup.rotation.z = 0
      } else {
        currentRot.y += delta * 0.8
        robotGroup.rotation.x = currentRot.x
        robotGroup.rotation.y = currentRot.y
        robotGroup.rotation.z = 0
      }
      const targetPosY = Math.sin(clock.elapsedTime * 1.2) * 0.08
      currentPosY.value += (targetPosY - currentPosY.value) * Math.min(1, delta * smooth)
      robotGroup.position.y = currentPosY.value

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
      container.removeChild(canvas)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full min-h-[200px] rounded-2xl overflow-hidden bg-card/40 border-0 [contain:strict]"
      style={{ display: 'block' }}
    />
  )
}
