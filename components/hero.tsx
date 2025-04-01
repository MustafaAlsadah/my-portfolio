"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import Three.js components with no SSR
const ThreeScene = dynamic(() => import("./three-scene"), { ssr: false })

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(nameRef.current, {
        duration: 1.2,
        opacity: 0,
        y: 30,
        ease: "power3.out",
        delay: 0.5,
      })

      // Button animation
      gsap.to(buttonRef.current, {
        duration: 1.5,
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
      <div className="absolute inset-0 subtle-pattern opacity-10 z-0" />

      {/* 3D Scene */}
      {isMounted && (
        <div className="absolute inset-0 z-0 opacity-70">
          <ThreeScene />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 inline-block">
          <Image
            src="/images/profile.jpg"
            alt="Mustafa Alsadah"
            width={120}
            height={120}
            className="rounded-full border-4 border-primary/20 shadow-xl mx-auto"
          />
        </div>

        <h1 ref={nameRef} className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
          Mustafa Alsadah
        </h1>

        <div className="text-xl md:text-2xl font-medium mb-8 h-16 text-foreground/80">
          <TypeAnimation
            sequence={["Software Engineer", 2000, "UI/UX Designer", 2000, "Creative Developer", 2000]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </div>

        <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-10">
          I craft elegant digital experiences with modern technologies, focusing on performance, accessibility, and
          thoughtful interactions.
        </p>

        <Button
          ref={buttonRef}
          onClick={scrollToContact}
          size="lg"
          className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground border-none rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Contact Me
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-12">
          <a
            href="https://github.com/MustafaAlsadah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors duration-300">
              <Github className="h-5 w-5" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/mustafa-alsadah1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors duration-300">
              <Linkedin className="h-5 w-5" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

