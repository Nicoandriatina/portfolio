'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: string) => {
    // Remplacer la locale dans le pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setIsOpen(false)
  }

  return (
    <div className={styles.languageSwitcher}>
      <button 
        className={styles.currentLang}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>{locale.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <button 
            onClick={() => switchLanguage('en')}
            className={locale === 'en' ? styles.active : ''}
          >
          EN English
          </button>
          <button 
            onClick={() => switchLanguage('fr')}
            className={locale === 'fr' ? styles.active : ''}
          >
            FR Français
          </button>
        </div>
      )}
    </div>
  )
}