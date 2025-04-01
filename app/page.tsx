"use client"
import dynamic from "next/dynamic"

// Static components
import About from "@/components/about"
import Skills from "@/components/skills"
import Contact from "@/components/contact"

// Dynamically import components with client-side rendering issues
const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

// Note: Projects, Testimonials, and Blog sections are hidden as requested
export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      <CustomCursor />
      <Hero />
      <About />
      <Skills />
      <Contact />
    </main>
  )
}

