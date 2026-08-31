'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import styles from './Projects.module.css'

export default function Projects() {
  const t = useTranslations('projects')
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.slide-in-up')
            elements.forEach((el) => {
              const htmlEl = el as HTMLElement
              htmlEl.style.opacity = '1'
              htmlEl.style.transform = 'translateY(0)'
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: t('items.saas.title'),
      description: t('items.saas.description'),
      image: '/saas.png',
      tech: ['NextJs', 'Clerk','vapi','Sentry','Supabase'],
      liveDemo: '#',
      github: 'https://github.com/Nicoandriatina/SaaS-with-nextjs'
    },
    {
      title: t('items.portfolio.title'),
      description: t('items.portfolio.description'),
      image: '/pf.png',
      tech: ['HTML', 'CSS', 'NextJS', 'Tailwind CSS'],
      liveDemo: '#',
      github: '#https://github.com/Nicoandriatina/portfolio'
    },
    {
      title: t('items.taskManager.title'),
      description: t('items.taskManager.description'),
      image: '/task.png',
      tech: ['ReactJS','Tailwind CSS','Django', 'SQLite'],
      liveDemo: '#',
      github: '#'
    },
    {
      title: t('items.seam.title'),
      description: t('items.seam.description'),
      image: '/seam.png',
      tech: ['ReactJS', 'Chart.js', 'Tailwind CSS'],
      liveDemo: '#',
      github: 'https://github.com/Nicoandriatina/dashbord'
    },
    {
      title: t('items.madaSocial.title'),
      description: t('items.madaSocial.description'),
      image: '/msn.png',
      tech: ['NextJS', 'JWT','Prisma', 'PostgreSQL'],
      liveDemo: '#',
      github: 'https://github.com/Nicoandriatina/social-network'
    },
    {
      title: t('items.employeeManagement.title'),
      description: t('items.employeeManagement.description'),
      image: '/native.jpg',
      tech: ['React Native', 'NodeJS', 'Expo' ,'PostgreSQL'],
      liveDemo: '#',
      github: '#'
    }
  ]

  return (
    <section id="projects" className="section" ref={projectsRef}>
      <div className="container">
        <h2 className="section-title">{t('title')}</h2>
        <div className={`${styles.projectsGrid} slide-in-up`}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  <a href={project.liveDemo} className={styles.projectLink}>{t('viewDemo')}</a>
                  <a href={project.github} className={styles.projectLink}>{t('viewCode')}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}