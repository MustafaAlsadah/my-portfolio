"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

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

      // Contact info animation
      gsap.from(contactInfoRef.current, {
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/95 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
          Get In Touch
        </h2>

        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div ref={contactInfoRef} className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>

              {/* Animated contact cards */}
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="h-5 w-5 text-primary" />,
                    title: "Email",
                    content: "mustafa.alsadah1@gmail.com",
                    link: "mailto:mustafa.alsadah1@gmail.com",
                    color: "#f5b742",
                  },
                  {
                    icon: <Phone className="h-5 w-5 text-primary" />,
                    title: "Phone",
                    content: "+966 54 029 1230",
                    link: "tel:+966540291230",
                    color: "#3b82f6",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 10px 25px -10px ${item.color}40`,
                    }}
                    className="flex items-start p-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
                  >
                    <div className="mt-1 p-2 rounded-full mr-4" style={{ backgroundColor: `${item.color}20` }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.title}</div>
                      {item.link ? (
                        <a href={item.link} className="text-foreground/70 hover:text-primary transition-colors">
                          {item.content}
                        </a>
                      ) : (
                        <div className="text-foreground/70">{item.content}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Connect</h3>
              <div className="flex space-x-4">
                {[
                  {
                    platform: "Github",
                    icon: <Github className="h-5 w-5" />,
                    color: "#f5b742",
                    url: "https://github.com/MustafaAlsadah",
                  },
                  {
                    platform: "Linkedin",
                    icon: <Linkedin className="h-5 w-5" />,
                    color: "#3b82f6",
                    url: "https://www.linkedin.com/in/mustafa-alsadah1/",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    whileHover={{
                      y: -5,
                      boxShadow: `0 10px 25px -10px ${social.color}60`,
                    }}
                    className="relative"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-foreground/70 hover:text-primary transition-colors duration-300"
                      style={{ backgroundColor: `${social.color}20` }}
                    >
                      {social.icon}
                    </div>

                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: social.color }}
                      initial={{ opacity: 0.2, scale: 1 }}
                      animate={{
                        opacity: 0,
                        scale: 1.8,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border"
            >
              <h4 className="text-lg font-medium mb-2 text-foreground">Availability</h4>
              <p className="text-foreground/70">
                I'm currently working at Tamara. Feel free to reach out for networking or collaboration opportunities.
              </p>

              {/* Availability indicator */}
              <div className="flex items-center mt-4">
                <div className="relative mr-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <motion.div
                    className="absolute inset-0 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <span className="text-sm text-yellow-500 font-medium">Limited Availability</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

