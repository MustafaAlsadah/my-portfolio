"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Skill categories with their respective skills from CV
const skillCategories = [
  {
    name: "Frontend",
    icon: "🎨",
    color: "#3b82f6",
    skills: [
      { name: "React.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
      { name: "React Native", logo: "https://raw.githubusercontent.com/kristerkari/react-native-svg-transformer/master/images/react-native-logo.png" },
      { name: "Angular", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" },
      { name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { name: "HTML/CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
      { name: "Tailwind CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
  },
  {
    name: "Backend",
    icon: "⚙️",
    color: "#10b981",
    skills: [
      { name: "Java", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
      { name: "Spring Boot", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" },
      { name: "Node.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
      { name: "NestJS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" },
      { name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "REST APIs", logo: "https://www.svgrepo.com/download/375521/api.svg" },
      { name: "MongoDB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    color: "#f59e0b",
    skills: [
      { name: "Docker", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
      { name: "Google Cloud", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg" },
      { name: "AWS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg" },
      { name: "Firebase", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" },
      { name: "Git & GitHub", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
      { name: "CI/CD", logo: "https://www.svgrepo.com/download/473940/cicd.svg" },
    ],
  },
  {
    name: "Other Skills",
    icon: "🛠️",
    color: "#ec4899",
    skills: [
      { name: "OOP", logo: "https://www.svgrepo.com/download/375533/class.svg" },
      { name: "Design Patterns", logo: "https://www.svgrepo.com/download/375873/pattern.svg" },
      { name: "Data Structures", logo: "https://www.svgrepo.com/download/375520/algorithm.svg" },
      { name: "Agile & Scrum", logo: "https://www.svgrepo.com/download/375834/agile.svg" },
      { name: "Figma", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" },
      { name: "rti-Connext", logo: "https://www.svgrepo.com/download/375528/connection.svg" },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeCategory, setActiveCategory] = useState(0)
  const skillsRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([])

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

      // Category buttons animation
      categoryRefs.current.forEach((btn, index) => {
        gsap.from(btn, {
          scrollTrigger: {
            trigger: btn,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.2 + index * 0.1,
          ease: "power3.out",
        })
      })

      // Skills container animation
      gsap.from(skillsRef.current, {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/95 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
          Technical Expertise
        </h2>

        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          My professional toolkit includes a diverse range of technologies and methodologies that I've mastered
          throughout my career.
        </p>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {skillCategories.map((category, index) => (
            <Button
              key={index}
              ref={(el: HTMLButtonElement | null) => {
                categoryRefs.current[index] = el
              }}
              onClick={() => setActiveCategory(index)}
              variant={activeCategory === index ? "default" : "outline"}
              className={`
                text-lg px-6 py-6 rounded-full transition-all duration-500
                ${activeCategory === index ? "bg-gradient-to-r shadow-lg scale-105" : "hover:scale-105 hover:shadow-md"}
              `}
              style={{
                borderColor: activeCategory === index ? "transparent" : `${category.color}40`,
                background:
                  activeCategory === index ? `linear-gradient(90deg, ${category.color}90, ${category.color})` : "",
                color: activeCategory === index ? "white" : "",
                boxShadow: activeCategory === index ? `0 10px 25px -10px ${category.color}80` : "",
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Skills Display - Grid of technologies with logos */}
        <div ref={skillsRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5, boxShadow: `0 10px 25px -10px ${skillCategories[activeCategory].color}60` }}
                    className="flex flex-col items-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="mb-4 relative w-16 h-16">
                      <Image
                        src={skill.logo || "/placeholder.svg?height=60&width=60"}
                        alt={skill.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-center font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

