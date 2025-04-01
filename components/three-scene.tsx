"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stars } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 500

  // Create particles
  const particlesPosition = new Float32Array(particleCount * 3)
  const particlesSizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    particlesPosition[i3] = (Math.random() - 0.5) * 15
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 15
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 15
    particlesSizes[i] = Math.random() * 2
  }

  useFrame((state) => {
    if (!particlesRef.current) return

    // Rotate particles
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particlesPosition} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={particlesSizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.1} sizeAttenuation transparent color="#f5b742" opacity={0.8} />
    </points>
  )
}

function FloatingLines() {
  const linesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!linesRef.current) return

    // Rotate lines
    linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    linesRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2
  })

  // Create 20 random lines
  const lines = []
  for (let i = 0; i < 20; i++) {
    const startPoint = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    )

    const endPoint = new THREE.Vector3(
      startPoint.x + (Math.random() - 0.5) * 5,
      startPoint.y + (Math.random() - 0.5) * 5,
      startPoint.z + (Math.random() - 0.5) * 5,
    )

    const points = []
    points.push(startPoint)
    points.push(endPoint)

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    lines.push(
      <line key={i} geometry={geometry}>
        <lineBasicMaterial color="#f5b742" opacity={0.3} transparent linewidth={1} />
      </line>,
    )
  }

  return <group ref={linesRef}>{lines}</group>
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <FloatingParticles />
      <FloatingLines />
      <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}

