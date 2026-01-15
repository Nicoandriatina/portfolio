// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import styles from './Hero.module.css'

// export default function Hero() {
//   const [text, setText] = useState('')
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [loopNum, setLoopNum] = useState(0)
//   const [typingSpeed, setTypingSpeed] = useState(100)

//   const phrases = [
//     'Fullstack Developer',
//     'React & NextJS',
//     'Problem Solver',
//     'API Architect',
//     'Fast Learner',
//     'Innovator',
//     'Team Player',
//     'Innovation Seeker'
//   ]

//   useEffect(() => {
//     const handleTyping = () => {
//       const i = loopNum % phrases.length
//       const fullText = phrases[i]

//       setText(isDeleting 
//         ? fullText.substring(0, text.length - 1)
//         : fullText.substring(0, text.length + 1)
//       )

//       setTypingSpeed(isDeleting ? 50 : 100)

//       if (!isDeleting && text === fullText) {
//         setTimeout(() => setIsDeleting(true), 2000)
//       } else if (isDeleting && text === '') {
//         setIsDeleting(false)
//         setLoopNum(loopNum + 1)
//       }
//     }

//     const timer = setTimeout(handleTyping, typingSpeed)
//     return () => clearTimeout(timer)
//   }, [text, isDeleting, loopNum, typingSpeed, phrases])

//   useEffect(() => {
//     const planets = document.querySelectorAll(`.${styles.orbitIcon}`)
//     planets.forEach((planet, index) => {
//       const startAngle = Math.random() * 360
//       const radius = 120 + (index * 40)
//       const duration = 15 + Math.random() * 15
//       const direction = Math.random() > 0.5 ? 'normal' : 'reverse'

//       const el = planet as HTMLElement
//       el.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`
//       el.style.animation = `orbit${index} ${duration}s linear infinite ${direction}`

//       const keyframes = `
//         @keyframes orbit${index} {
//           from {
//             transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
//           }
//           to {
//             transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
//           }
//         }
//       `
//       const style = document.createElement('style')
//       style.textContent = keyframes
//       document.head.appendChild(style)
//     })
//   }, [])

//   return (
//     <section id="home" className={styles.hero}>
//       <div className="container">
//         <div className={styles.heroContent}>
//           <div className={styles.heroVisual}>
//             <div className={styles.avatarContainer}>
//               <div className={styles.sunCore}>
//                 <Image src="/profil.jpg" alt="Profile" width={168} height={168} priority />
//               </div>
              
//               {[
//                 { name: 'html', src: 'html5/html5-original.svg' },
//                 { name: 'tailwindcss', src: 'tailwindcss/tailwindcss-original.svg' },
//                 { name: 'js', src: 'javascript/javascript-original.svg' },
//                 { name: 'react', src: 'react/react-original.svg' },
//                 { name: 'nodejs', src: 'nodejs/nodejs-original.svg' },
//                 { name: 'python', src: 'python/python-original.svg' },
//                 { name: 'git', src: 'git/git-original.svg' },
//                 { name: 'nextjs', src: 'nextjs/nextjs-original.svg' },
//                 { name: 'docker', src: 'docker/docker-original.svg' },
//                 { name: 'kubernetes', src: 'kubernetes/kubernetes-plain.svg' }
//               ].map((tech, i) => (
//                 <button key={i} className={`${styles.orbitIcon} ${styles[tech.name]}`} type="button">
//                   <img 
//                     src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.src}`}
//                     alt={`${tech.name} icon`}
//                     style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className={styles.heroText}>
//             <p className={styles.greeting}>Hello, I&apos;m Andriatinasoa Jean Nico 👋</p>
//             <h1 className={styles.heroTitle}>
//               <span>{text}</span>
//               <span className={styles.cursor}>|</span>
//             </h1>
//             <p className={styles.heroQuote}>Passionate about crafting quality web experiences and continuous learning</p>
//             <div className={styles.heroButtons}>
//               <button className="glow-genz-button">Download CV</button>
//             </div>
//             <div className={styles.heroSocial}>
//               <a href="https://www.linkedin.com/in/nico-andriatina-34a37b250/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                 </svg>
//               </a>
//               <a href="https://www.instagram.com/nico_andriatina/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.5-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
//                 </svg>
//               </a>
//               <a href="https://wa.me/+261348923903" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
//                 </svg>
//               </a>
//               <a href="https://github.com/Nicoandriatina" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const phrases = [
    'Fullstack Developer',
    'React & NextJS',
    'Problem Solver',
    'API Architect',
    'Fast Learner',
    'Innovator',
    'Team Player',
    'Innovation Seeker'
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 100)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, phrases])

  useEffect(() => {
    const planets = document.querySelectorAll(`.${styles.orbitIcon}`)
    planets.forEach((planet, index) => {
      const startAngle = Math.random() * 360
      const radius = 120 + (index * 40)
      const duration = 15 + Math.random() * 15
      const direction = Math.random() > 0.5 ? 'normal' : 'reverse'

      const el = planet as HTMLElement
      el.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`
      el.style.animation = `orbit${index} ${duration}s linear infinite ${direction}`

      const keyframes = `
        @keyframes orbit${index} {
          from {
            transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
          }
          to {
            transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
          }
        }
      `
      const style = document.createElement('style')
      style.textContent = keyframes
      document.head.appendChild(style)
    })
  }, [])

  const handleDownloadCV = () => {
    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement('a')
    link.href = '/cv/CV_andriatinasoa_jean_nico.pdf'
    link.download = 'CV_andriatinasoa_jean_nico.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroVisual}>
            <div className={styles.avatarContainer}>
              <div className={styles.sunCore}>
                <Image src="/profil.jpg" alt="Profile" width={168} height={168} priority />
              </div>
              
              {[
                { name: 'html', src: 'html5/html5-original.svg' },
                { name: 'tailwindcss', src: 'tailwindcss/tailwindcss-original.svg' },
                { name: 'js', src: 'javascript/javascript-original.svg' },
                { name: 'react', src: 'react/react-original.svg' },
                { name: 'nodejs', src: 'nodejs/nodejs-original.svg' },
                { name: 'python', src: 'python/python-original.svg' },
                { name: 'git', src: 'git/git-original.svg' },
                { name: 'nextjs', src: 'nextjs/nextjs-original.svg' },
                { name: 'docker', src: 'docker/docker-original.svg' },
                { name: 'kubernetes', src: 'kubernetes/kubernetes-plain.svg' }
              ].map((tech, i) => (
                <button key={i} className={`${styles.orbitIcon} ${styles[tech.name]}`} type="button">
                  <img 
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.src}`}
                    alt={`${tech.name} icon`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.heroText}>
            <p className={styles.greeting}>Hello, I&apos;m Andriatinasoa Jean Nico 👋</p>
            <h1 className={styles.heroTitle}>
              <span>{text}</span>
              <span className={styles.cursor}>|</span>
            </h1>
            <p className={styles.heroQuote}>Passionate about crafting quality web experiences and continuous learning</p>
            <div className={styles.heroButtons}>
              <button 
                className="glow-genz-button" 
                onClick={handleDownloadCV}
                type="button"
              >
                Download CV
              </button>
            </div>
            <div className={styles.heroSocial}>
              <a href="https://www.linkedin.com/in/nico-andriatina-34a37b250/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/nico_andriatina/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.5-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </a>
              <a href="https://wa.me/+261348923903" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <a href="https://github.com/Nicoandriatina" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}