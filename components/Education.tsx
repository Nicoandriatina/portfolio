'use client'

import { useEffect, useRef } from 'react'
import styles from './Education.module.css'

export default function Education() {
  const educationRef = useRef<HTMLDivElement>(null)

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

    if (educationRef.current) {
      observer.observe(educationRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const educationData = [
    {
      degree: "Master's in Computer Science",
      school: 'National School of Computer Science (ENI)',
      location: 'Fianarantsoa, Madagascar',
      period: '2024 - 2025',
      details: 'General Computer Science Track - Second Year',
      badge: 'Graduated with Honors',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      )
    },
    {
      degree: "Bachelor's in Computer Science",
      school: 'National School of Computer Science (ENI)',
      location: 'Fianarantsoa, Madagascar',
      period: '2020 - 2023',
      details: null,
      badge: 'Graduated with Honors',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      )
    },
    {
      degree: 'Baccalaureate, Series C — with Fairly Good distinction',
      school: 'Saint François Xavier High School (CSFX)',
      location: 'Fianarantsoa, Madagascar',
      period: '2019',
      details: null,
      badge: 'Good Honors',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
        </svg>
      )
    }
  ]

  return (
    <section id="education" className="section" ref={educationRef}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className={`${styles.educationGrid} slide-in-up`}>
          {educationData.map((edu, index) => (
            <div key={index} className={styles.educationCard}>
              <div className={styles.cardIcon}>
                {edu.icon}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.school}>{edu.school}</p>
                    <p className={styles.location}>{edu.location}</p>
                    {edu.details && (
                      <p className={styles.details}>{edu.details}</p>
                    )}
                  </div>
                  <span className={styles.period}>{edu.period}</span>
                </div>
                {edu.badge && (
                  <span className={styles.badge}>{edu.badge}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}