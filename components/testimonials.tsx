"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO at TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Mustafa's technical expertise and attention to detail transformed our product. He delivered a solution that exceeded our expectations in both functionality and design.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Director at InnovateLabs",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Working with Mustafa was a game-changer for our startup. His ability to translate complex requirements into elegant solutions helped us launch our MVP ahead of schedule.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Lead Developer at DevHub",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "As a fellow developer, I was impressed by Mustafa's clean code architecture and documentation. His work is not only visually impressive but also maintainable and scalable.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder at FinTech Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Mustafa helped us reimagine our financial platform with a focus on user experience. The result was a 40% increase in user engagement and significantly improved customer satisfaction.",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Design Director at CreativeStudio",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Mustafa bridges the gap between design and development perfectly. He understands both worlds and delivers products that are beautiful, functional, and technically sound.",
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      // Testimonial card animations
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background/95 to-background"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
          Client Testimonials
        </h2>

        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Feedback from clients and colleagues I've had the pleasure of working with throughout my professional journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} ref={(el) => el && (cardsRef.current[index] = el)}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="h-full hover-lift"
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border border-border">
                  <CardContent className="p-6">
                    <Quote className="h-6 w-6 text-primary mb-4 opacity-80" />
                    <p className="text-foreground/80 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-foreground/60">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

