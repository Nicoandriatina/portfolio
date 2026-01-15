'use client'

import { useEffect, useRef } from 'react'
import styles from './About.module.css'

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.slide-in-left, .slide-in-right')
            elements.forEach((el) => {
              const htmlEl = el as HTMLElement
              htmlEl.style.opacity = '1'
              if (el.classList.contains('slide-in-left')) {
                htmlEl.style.transform = 'translateX(0)'
              } else if (el.classList.contains('slide-in-right')) {
                htmlEl.style.transform = 'translateX(0)'
              }
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const coreValues = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Adaptability',
      description: 'Flexible approach to challenges'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Team Spirit',
      description: 'Strong collaboration skills'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
        </svg>
      ),
      title: 'Autonomy',
      description: 'Self-driven and responsible'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      title: 'Rigor',
      description: 'Best practices focused'
    }
  ]

  return (
    <section id="about" className="section" ref={aboutRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className={styles.aboutContent}>
          <div className={`${styles.aboutText} slide-in-left`}>
            <p>
              Versatile JavaScript Developer specialized in ReactJS, Next.js, and React Native, 
              with a strong interest in modern architectures (JAMstack, microservices, serverless). 
              Experienced in full-stack development and creating secure RESTful APIs.
            </p>
            <p>
              Curious and motivated, I transform ideas into performant and scalable web solutions. 
              Experienced in project management and team coordination, I am committed to delivering 
              quality products on time.
            </p>
            <div className={styles.skills}>
              <h3>Skills & Technologies</h3>
              <div className={styles.skillsGrid}>
                <span className={styles.skillTag}>JavaScript</span>
                <span className={styles.skillTag}>TypeScript</span>
                <span className={styles.skillTag}>Python</span>
                <span className={styles.skillTag}>React.js</span>
                <span className={styles.skillTag}>Next.js</span>
                <span className={styles.skillTag}>React Native</span>
                <span className={styles.skillTag}>Node.js</span>
                <span className={styles.skillTag}>Express.js</span>
                <span className={styles.skillTag}>Django</span>
                <span className={styles.skillTag}>MongoDB</span>
                <span className={styles.skillTag}>PostgreSQL</span>
                <span className={styles.skillTag}>Git</span>
                <span className={styles.skillTag}>Docker</span>
                <span className={styles.skillTag}>Kubernetes</span>
                <span className={styles.skillTag}>RESTful APIs</span>
                <span className={styles.skillTag}>GraphQL</span>
                <span className={styles.skillTag}>Tailwind CSS</span> 
                <span className={styles.skillTag}>UI/UX</span> 
                <span className={styles.skillTag}>Responsive Design</span> 
              </div>
            </div>
          </div>
          <div className={`${styles.aboutVisual} slide-in-right`}>
            <div className={styles.coreValuesGrid}>
              {coreValues.map((value, index) => (
                <div key={index} className={styles.valueCard}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h4 className={styles.valueTitle}>{value.title}</h4>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}