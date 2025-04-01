"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Reversed order - latest to oldest
const milestones = [
  {
    year: "2025",
    title: "Tamara",
    description: "Started working at Tamara where I currently work",
    icon: null,
    color: "#8b5cf6",
    image: "/images/milestones/tamara.png",
  },
  {
    year: "2024",
    title: "Graduated from KFUPM",
    description: "Completed my Software Engineering degree at King Fahd University of Petroleum and Minerals",
    icon: null,
    color: "#f59e0b",
    image: "/images/milestones/kfupm.jpg",
  },
  {
    year: "2024",
    title: "Olo",
    description: "Joined Olo as a Software Engineer",
    icon: null,
    color: "#ec4899",
    image: "/images/milestones/olo.jpeg",
  },
  {
    year: "2019",
    title: "LazyWait",
    description: "Started my first professional role at LazyWait while studying",
    icon: null,
    color: "#10b981",
    image: "/images/milestones/lw.png",
  },
  {
    year: "2019",
    title: "Started at KFUPM",
    description: "Began my Software Engineering degree at King Fahd University of Petroleum and Minerals",
    icon: null,
    color: "#3b82f6",
    image: "/images/milestones/kfupm.jpg",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

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

      // Bio section animation
      gsap.from(bioRef.current, {
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      })

      // Timeline animation
      gsap.from(timelineRef.current, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/95 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
          About Me
        </h2>

        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Get to know my background, journey, and the passion that drives my work in the tech industry.
        </p>

        <div ref={bioRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
              <Image src="/images/profile-full.jpg" alt="Mustafa Alsadah" fill className="object-cover" />
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 rounded-lg bg-primary/20 backdrop-blur-sm z-20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-3xl">💻</div>
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-[#10b981]/20 backdrop-blur-sm z-20"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-2xl">🚀</div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-0 w-24 h-24 rounded-lg bg-[#8b5cf6]/20 backdrop-blur-sm z-20"
              animate={{
                x: [0, 15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-3xl">🎨</div>
            </motion.div>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-foreground">
              I'm <span className="text-primary">Mustafa Alsadah</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-primary/30">
              <p className="text-foreground/80 leading-relaxed">
                Software Engineering graduate with a concentration in Cloud Computing, experienced in full-stack
                development and delivering user-centered solutions. Proven skills in Next.js, React Native, Express.js,
                and Spring Boot, with hands-on experience at Olo and LazyWait.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-primary/30">
              <p className="text-foreground/80 leading-relaxed">
                My approach combines technical excellence with design thinking, ensuring that the solutions I build are
                not only functionally robust but also delightful to use. I believe in continuous learning and staying at
                the forefront of technology trends.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-xl font-semibold text-foreground mb-4">Core Values</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Innovation", icon: "💡" },
                  { title: "Quality", icon: "✨" },
                  { title: "Collaboration", icon: "🤝" },
                  { title: "Continuous Learning", icon: "📚" },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border flex items-center space-x-3"
                  >
                    <div className="text-2xl">{value.icon}</div>
                    <div className="font-medium">{value.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center text-foreground mb-12">My Professional Journey</h3>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 rounded-full"></div>

          {/* Timeline items */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-16 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} md:flex-row-reverse md:even:flex-row`}
              >
                {/* Timeline dot */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: `${milestone.color}20`,
                      borderColor: milestone.color,
                      borderWidth: "2px",
                    }}
                  >
                    {milestone.icon}
                  </div>
                </div> */}

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12   md:pr-0 md:pl-8`}
                >
                  <div
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ borderColor: `${milestone.color}40` }}
                  >
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                      style={{
                        backgroundColor: `${milestone.color}20`,
                        color: milestone.color,
                      }}
                    >
                      {milestone.year}
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: milestone.color }}>
                      {milestone.title}
                    </h4>
                    <p className="text-foreground/80">{milestone.description}</p>

                    {/* Small image preview */}
                    <div className="mt-4 relative h-32 rounded-md overflow-hidden">
                      <Image
                        src={milestone.image || "/placeholder.svg?height=400&width=600"}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to right, ${milestone.color}20, transparent)` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

