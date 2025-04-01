"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Text } from "@react-three/drei"
import type { Group } from "three"

export default function CodeSphere() {
  const groupRef = useRef<Group>(null)

  // Generate random positions for code snippets
  const codeSnippets = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / 20)
      const theta = Math.sqrt(20 * Math.PI) * phi

      return {
        position: [5 * Math.cos(theta) * Math.sin(phi), 5 * Math.sin(theta) * Math.sin(phi), 5 * Math.cos(phi)],
        text: ["</>", "{ }", "=>", "[]", "const", "let", "function", "return", "import", "export"][
          Math.floor(Math.random() * 10)
        ],
        color: ["#8a4bff", "#ff4b8a", "#4b8aff", "#4bff8a"][Math.floor(Math.random() * 4)],
        scale: Math.random() * 0.5 + 0.5,
      }
    })
  }, [])

  // Animate the sphere rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.x += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[4.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#000" wireframe opacity={0.2} transparent />
      </Sphere>

      {codeSnippets.map((snippet, index) => (
        <Text
          key={index}
          position={snippet.position as [number, number, number]}
          color={snippet.color}
          fontSize={snippet.scale}
          font="/fonts/Geist-Bold.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {snippet.text}
        </Text>
      ))}
    </group>
  )
}

