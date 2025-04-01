"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, X } from "lucide-react"
import Image from "next/image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    id: 1,
    title: "Financial Dashboard",
    description:
      "A comprehensive financial analytics platform with real-time data visualization and predictive insights.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    link: "#",
    github: "#",
    details:
      "This enterprise-grade financial dashboard provides real-time analytics, custom reporting, and predictive modeling for financial institutions. Built with a React frontend and Node.js backend, it features responsive data visualizations using D3.js, secure authentication, and role-based access control. The application processes millions of transactions daily with optimized database queries and caching strategies.",
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "AI Content Studio",
    description:
      "An AI-powered content creation platform for marketers and content teams to streamline their workflow.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "PostgreSQL"],
    link: "#",
    github: "#",
    details:
      "AI Content Studio helps marketing teams create, edit, and optimize content at scale. The platform leverages OpenAI's GPT models to generate high-quality content while maintaining brand voice consistency. Features include content type templates, tone adjustment, SEO optimization suggestions, and collaborative editing. The application is built with Next.js for optimal performance and SEO, with a PostgreSQL database for content management.",
    color: "#10b981",
  },
  {
    id: 3,
    title: "3D Product Configurator",
    description:
      "An interactive 3D product visualization tool allowing customers to customize products before purchase.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Three.js", "React", "WebGL", "Firebase"],
    link: "#",
    github: "#",
    details:
      "This 3D product configurator enables e-commerce businesses to offer interactive product customization. Customers can modify colors, materials, and components in real-time with photorealistic rendering. Built with Three.js and React Three Fiber, the application features optimized 3D models, physically-based rendering, environment lighting, and configuration saving. The tool has increased conversion rates by 35% for client businesses by enhancing the pre-purchase experience.",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Collaborative Workspace",
    description:
      "A real-time collaboration platform for remote teams with document editing, video meetings, and project management.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Socket.io", "WebRTC", "React", "MongoDB"],
    link: "#",
    github: "#",
    details:
      "This all-in-one collaboration platform helps remote teams work together effectively. It features real-time document editing with operational transformation, video conferencing with screen sharing, task management with Kanban boards, and team chat. The application uses Socket.io for real-time communication, WebRTC for peer-to-peer video, and a microservices architecture for scalability. Used by over 200 companies, it has improved team productivity and communication for distributed teams.",
    color: "#ec4899",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isViewingAll, setIsViewingAll] = useState(false)
  const projectsContainerRef = useRef<HTMLDivElement>(null)

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

      // Projects container animation
      gsap.from(projectsContainerRef.current, {
        scrollTrigger: {
          trigger: projectsContainerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleProjectClick = (id: number) => {
    setSelectedProject(id)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-background/95 to-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
          Featured Projects
        </h2>

        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          A selection of my recent work showcasing my expertise in frontend development, UI/UX design, and full-stack
          application architecture.
        </p>

        {/* Project Cards */}
        <div ref={projectsContainerRef} className="relative min-h-[600px]">
          {isViewingAll ? (
            // Grid view
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div
                    className="h-full overflow-hidden rounded-xl border-2 transition-all duration-300 bg-card/50 backdrop-blur-sm"
                    style={{
                      borderColor: hoveredProject === project.id ? project.color : "transparent",
                      boxShadow:
                        hoveredProject === project.id
                          ? `0 10px 30px -10px ${project.color}60`
                          : "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background: `linear-gradient(to top, ${project.color}30, transparent)`,
                        }}
                      ></div>
                    </div>

                    <div className="p-6">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: hoveredProject === project.id ? project.color : "inherit" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-foreground/80 mb-4 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded-full border"
                            style={{
                              backgroundColor: `${project.color}10`,
                              borderColor: `${project.color}30`,
                              color: project.color,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        className="group p-0 hover:bg-transparent"
                        style={{ color: project.color }}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // 3D Stack view
            <div className="relative h-[600px] flex items-center justify-center">
              {projects.map((project, index) => {
                // Calculate position for 3D effect
                const zIndex = 40 - index
                const translateZ = -50 * index
                const translateY = 10 * index
                const opacity = 1 - index * 0.15
                const scale = 1 - index * 0.05

                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-full max-w-2xl"
                    style={{
                      zIndex,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity,
                      scale,
                      y: translateY,
                      z: translateZ,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      scale: scale + 0.02,
                      y: translateY - 5,
                    }}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div
                      className="overflow-hidden rounded-xl border-2 transition-all duration-300 bg-card/80 backdrop-blur-sm"
                      style={{
                        borderColor: `${project.color}${index === 0 ? "60" : "30"}`,
                        boxShadow: `0 ${10 + index * 5}px ${30 + index * 10}px -15px ${project.color}40`,
                      }}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, ${project.color}40, transparent)`,
                          }}
                        ></div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2" style={{ color: project.color }}>
                          {project.title}
                        </h3>

                        <p className="text-foreground/90 mb-4">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs rounded-full border"
                              style={{
                                backgroundColor: `${project.color}20`,
                                borderColor: `${project.color}40`,
                                color: project.color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {index === 0 && (
                          <Button
                            variant="ghost"
                            className="group p-0 hover:bg-transparent"
                            style={{ color: project.color }}
                          >
                            View Details
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* View toggle button */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center mt-8">
            <Button onClick={() => setIsViewingAll(!isViewingAll)} variant="outline" className="rounded-full">
              {isViewingAll ? "View 3D Stack" : "View All Projects"}
            </Button>
          </div>
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-2xl"
                style={{
                  backgroundColor: `${projects.find((p) => p.id === selectedProject)?.color}10`,
                  borderColor: projects.find((p) => p.id === selectedProject)?.color,
                  borderWidth: "2px",
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 rounded-full bg-background/50 hover:bg-background/70"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-5 w-5" />
                </Button>

                {(() => {
                  const project = projects.find((p) => p.id === selectedProject)
                  if (!project) return null

                  return (
                    <>
                      <div className="relative h-64 md:h-80">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, ${project.color}30, transparent)`,
                          }}
                        ></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: project.color }}>
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 text-sm rounded-full border"
                              style={{
                                backgroundColor: `${project.color}20`,
                                borderColor: `${project.color}40`,
                                color: project.color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-foreground/80 mb-8 leading-relaxed">{project.details}</p>
                        <div className="flex gap-4">
                          <Button
                            className="text-primary-foreground"
                            style={{
                              backgroundColor: project.color,
                              borderColor: project.color,
                            }}
                            onClick={() => window.open(project.link, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </Button>
                          <Button
                            variant="outline"
                            className="border-border text-foreground/80 hover:bg-secondary/50"
                            onClick={() => window.open(project.github, "_blank")}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Source Code
                          </Button>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

