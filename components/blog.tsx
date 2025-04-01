"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const blogPosts = [
  {
    id: 1,
    title: "Building Performant React Applications",
    excerpt: "Learn how to optimize your React applications for better performance and user experience.",
    date: "March 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    color: "#3b82f6",
    content: `
      <p>Performance optimization is crucial for delivering a great user experience in React applications. In this article, we'll explore various techniques to improve the performance of your React apps.</p>
      
      <h3>1. Use React.memo for Component Memoization</h3>
      <p>React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders when the props haven't changed.</p>
      
      <h3>2. Implement Code Splitting</h3>
      <p>Code splitting allows you to split your code into smaller chunks that can be loaded on demand, reducing the initial load time of your application.</p>
      
      <h3>3. Virtualize Long Lists</h3>
      <p>When rendering long lists, use virtualization libraries like react-window or react-virtualized to only render items that are currently visible in the viewport.</p>
      
      <h3>4. Optimize Images</h3>
      <p>Use modern image formats, lazy loading, and proper sizing to reduce the impact of images on your application's performance.</p>
      
      <h3>5. Implement Proper State Management</h3>
      <p>Organize your state efficiently to avoid unnecessary re-renders and optimize data flow in your application.</p>
      
      <p>By implementing these techniques, you can significantly improve the performance of your React applications, leading to better user experiences and higher engagement.</p>
    `,
  },
  {
    id: 2,
    title: "The Future of Web Development with AI",
    excerpt: "Explore how artificial intelligence is transforming the landscape of web development.",
    date: "April 22, 2023",
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=600",
    color: "#10b981",
    content: `
      <p>Artificial Intelligence is rapidly changing how we approach web development, automating repetitive tasks and enabling new capabilities. Let's explore the current and future impact of AI on web development.</p>
      
      <h3>1. AI-Powered Code Generation</h3>
      <p>Tools like GitHub Copilot and other AI code assistants can generate code snippets, complete functions, and even entire components based on natural language descriptions.</p>
      
      <h3>2. Automated Testing and Debugging</h3>
      <p>AI systems can automatically generate test cases, identify potential bugs, and suggest fixes, significantly reducing the time spent on testing and debugging.</p>
      
      <h3>3. Personalized User Experiences</h3>
      <p>AI algorithms can analyze user behavior and preferences to create highly personalized web experiences that adapt to individual users.</p>
      
      <h3>4. Design Automation</h3>
      <p>AI tools can generate UI designs, optimize layouts, and even create animations based on simple prompts or requirements.</p>
      
      <h3>5. Intelligent Content Management</h3>
      <p>AI can help manage, organize, and optimize content, making it easier to maintain large websites and applications.</p>
      
      <p>As AI continues to evolve, we can expect even more profound changes in how we build and interact with web applications. Developers who embrace these technologies will be well-positioned for the future of web development.</p>
    `,
  },
  {
    id: 3,
    title: "Mastering TypeScript for Modern Web Development",
    excerpt: "A comprehensive guide to leveraging TypeScript's powerful features in your projects.",
    date: "May 10, 2023",
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=600",
    color: "#f59e0b",
    content: `
      <p>TypeScript has become an essential tool for modern web development, providing type safety and improved developer experience. This guide will help you master TypeScript and use it effectively in your projects.</p>
      
      <h3>1. Advanced Type System</h3>
      <p>Learn how to use TypeScript's advanced type features like conditional types, mapped types, and template literal types to create flexible and type-safe code.</p>
      
      <h3>2. Type Inference and Type Guards</h3>
      <p>Understand how TypeScript infers types and how to use type guards to narrow types in your code, making it more robust and easier to maintain.</p>
      
      <h3>3. Generics</h3>
      <p>Master generics to create reusable components and functions that work with a variety of types while maintaining type safety.</p>
      
      <h3>4. TypeScript with React</h3>
      <p>Learn best practices for using TypeScript with React, including typing props, state, events, and hooks.</p>
      
      <h3>5. Migration Strategies</h3>
      <p>Discover strategies for gradually migrating existing JavaScript projects to TypeScript without disrupting development.</p>
      
      <p>By mastering TypeScript, you'll write more maintainable code, catch errors earlier in the development process, and improve collaboration within your team.</p>
    `,
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    excerpt: "Why accessibility matters and how to implement it effectively in your web projects.",
    date: "June 5, 2023",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    color: "#ec4899",
    content: `
      <p>Web accessibility is not just a nice-to-have feature—it's essential for creating inclusive experiences and often required by law. This article covers practical approaches to building accessible web applications.</p>
      
      <h3>1. Semantic HTML</h3>
      <p>Learn how using semantic HTML elements properly forms the foundation of accessible web applications.</p>
      
      <h3>2. ARIA Attributes</h3>
      <p>Understand when and how to use ARIA attributes to enhance accessibility when HTML semantics aren't sufficient.</p>
      
      <h3>3. Keyboard Navigation</h3>
      <p>Implement proper keyboard navigation to ensure your application is usable without a mouse or touch input.</p>
      
      <h3>4. Color Contrast and Visual Design</h3>
      <p>Learn how to design with accessibility in mind, ensuring sufficient color contrast and clear visual indicators.</p>
      
      <h3>5. Testing for Accessibility</h3>
      <p>Discover tools and techniques for testing your applications for accessibility compliance.</p>
      
      <p>By prioritizing accessibility in your development process, you'll create applications that can be used by everyone, regardless of their abilities or how they access the web.</p>
    `,
  },
]

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Carousel animation
      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setActiveIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="min-h-screen py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/90 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text">
          Insights & Stories
        </h2>

        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Explore my thoughts on technology, design, and development through these articles and insights.
        </p>

        {/* Featured Post */}
        <div ref={carouselRef} className="relative mb-20">
          <div className="absolute -top-16 right-0 left-0 flex justify-center gap-2 z-10">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"
                }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
              aria-label="Previous article"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
              aria-label="Next article"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 300 : -300,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -300 : 300,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-lg">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={blogPosts[activeIndex].image || "/placeholder.svg"}
                      alt={blogPosts[activeIndex].title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background: `linear-gradient(to right, ${blogPosts[activeIndex].color}40, transparent)`,
                      }}
                    ></div>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4" style={{ color: blogPosts[activeIndex].color }}>
                        {blogPosts[activeIndex].date}
                      </span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-foreground/70">{blogPosts[activeIndex].readTime}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: blogPosts[activeIndex].color }}>
                      {blogPosts[activeIndex].title}
                    </h3>

                    <p className="text-foreground/80 mb-6 line-clamp-3 md:line-clamp-4">
                      {blogPosts[activeIndex].excerpt}
                    </p>

                    <Button
                      onClick={() => setSelectedPost(blogPosts[activeIndex].id)}
                      style={{
                        backgroundColor: blogPosts[activeIndex].color,
                        color: "#ffffff",
                      }}
                      className="self-start"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* More Articles */}
        <h3 className="text-2xl font-semibold text-center text-foreground mb-8">More Articles</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts
            .filter((_, index) => index !== activeIndex)
            .slice(0, 3)
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="cursor-pointer group"
                onClick={() => setSelectedPost(post.id)}
              >
                <div
                  className="h-full overflow-hidden rounded-lg border-2 transition-all duration-300 bg-card/50 backdrop-blur-sm"
                  style={{
                    borderColor: "transparent",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to top, ${post.color}, transparent)`,
                      }}
                    ></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-foreground/60 mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h4>

                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                    <div
                      className="text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300"
                      style={{ color: post.color }}
                    >
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-card rounded-lg shadow-[0_0_30px_rgba(138,75,255,0.3)]"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 rounded-full bg-background/80 hover:bg-background/60"
                  onClick={() => setSelectedPost(null)}
                >
                  <X className="h-5 w-5" />
                </Button>

                {(() => {
                  const post = blogPosts.find((p) => p.id === selectedPost)
                  if (!post) return null

                  return (
                    <>
                      <div className="relative h-64 md:h-80">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, ${post.color}90, transparent)`,
                          }}
                        ></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center text-sm text-white/90 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="mr-4">{post.date}</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">{post.title}</h3>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <div
                          className="prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
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

