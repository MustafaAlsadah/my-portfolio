"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

const techIcons = [
  { name: "React", path: "/placeholder.svg?height=40&width=40" },
  { name: "Next.js", path: "/placeholder.svg?height=40&width=40" },
  { name: "TypeScript", path: "/placeholder.svg?height=40&width=40" },
  { name: "Node.js", path: "/placeholder.svg?height=40&width=40" },
  { name: "Three.js", path: "/placeholder.svg?height=40&width=40" },
  { name: "GSAP", path: "/placeholder.svg?height=40&width=40" },
]

export default function FloatingIcons() {
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const icons = iconsRef.current?.children
    if (!icons) return

    // Create random animations for each icon
    Array.from(icons).forEach((icon, index) => {
      // Random starting position
      gsap.set(icon, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        opacity: 0,
      })

      // Animate in
      gsap.to(icon, {
        duration: 1,
        opacity: 0.8,
        delay: 0.1 * index,
        ease: "power2.out",
      })

      // Continuous floating animation
      gsap.to(icon, {
        duration: 10 + Math.random() * 10,
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 300 - 150}`,
        rotation: Math.random() * 360,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [])

  return (
    <div ref={iconsRef} className="absolute inset-0 pointer-events-none z-0">
      {techIcons.map((icon, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-background/20 backdrop-blur-sm p-2 shadow-[0_0_10px_rgba(138,75,255,0.3)]"
        >
          <Image
            src={icon.path || "/placeholder.svg"}
            alt={icon.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  )
}

