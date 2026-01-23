'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

export default function Contact() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const contactRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [touched, setTouched] = useState<{[key: string]: boolean}>({})
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalMessage, setModalMessage] = useState('')

  useEffect(() => {
    emailjs.init("K09bN-PoP1JlSTBQi")

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

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fonctions de validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email.trim())
  }

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2
  }

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10
  }

  const handleBlur = (field: string, value: string) => {
    setTouched({ ...touched, [field]: true })
    
    const newErrors = { ...errors }
    
    switch (field) {
      case 'user_email':
        if (!value.trim()) {
          newErrors.user_email = t('form.errors.emailRequired') || 'L\'email est requis'
        } else if (!validateEmail(value)) {
          newErrors.user_email = t('form.errors.emailInvalid') || 'Adresse email invalide'
        } else {
          delete newErrors.user_email
        }
        break
        
      case 'user_name':
        if (!value.trim()) {
          newErrors.user_name = t('form.errors.nameRequired') || 'Le nom est requis'
        } else if (!validateName(value)) {
          newErrors.user_name = t('form.errors.nameInvalid') || 'Le nom doit contenir au moins 2 caractères'
        } else {
          delete newErrors.user_name
        }
        break
        
      case 'message':
        if (!value.trim()) {
          newErrors.message = t('form.errors.messageRequired') || 'Le message est requis'
        } else if (!validateMessage(value)) {
          newErrors.message = t('form.errors.messageInvalid') || 'Le message doit contenir au moins 10 caractères'
        } else {
          delete newErrors.message
        }
        break
    }
    
    setErrors(newErrors)
  }

  const showSuccessModal = () => {
    setModalType('success')
    setModalMessage(t('form.modal.success') || '')
    setShowModal(true)
  }

  const showErrorModal = (message: string) => {
    setModalType('error')
    setModalMessage(message)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!formRef.current) return
    
    const formData = new FormData(formRef.current)
    const name = (formData.get('user_name') as string).trim()
    const email = (formData.get('user_email') as string).trim()
    const message = (formData.get('message') as string).trim()

    const validationErrors: {[key: string]: string} = {}
    
    if (!validateName(name)) {
      validationErrors.user_name = t('form.errors.nameInvalid') || 'Le nom doit contenir au moins 2 caractères'
    }
    if (!validateEmail(email)) {
      validationErrors.user_email = t('form.errors.emailInvalid') || 'Adresse email invalide'
    }
    if (!validateMessage(message)) {
      validationErrors.message = t('form.errors.messageInvalid') || 'Le message doit contenir au moins 10 caractères'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched({ user_name: true, user_email: true, message: true })
      return
    }
    
    setIsSubmitting(true)

    try {
      const templateParams = {
        user_name: name,
        user_email: email,
        message: message,
        to_name: 'Nico Andriatinasoa',
        reply_to: email
      }

      const SERVICE_ID = "service_qsww15m"
      const TEMPLATE_NOTIFICATION = "template_apkc3b2"
      const TEMPLATE_AUTO_RESPONSE = "template_09c959s"

      await emailjs.send(SERVICE_ID, TEMPLATE_NOTIFICATION, templateParams)
      await emailjs.send(SERVICE_ID, TEMPLATE_AUTO_RESPONSE, templateParams)

      // Succès - Afficher le modal
      showSuccessModal()
      formRef.current.reset()
      setErrors({})
      setTouched({})
      
    } catch (error: unknown) {
      console.error('❌ Erreur EmailJS:', error)
      
      let errorMessage = t('form.error') || 'Une erreur est survenue lors de l\'envoi.'
      
      if (error && typeof error === 'object') {
        const err = error as any
        
        if (err.status === 400) {
          errorMessage = t('form.modal.error400') || 'Erreur de configuration. Veuillez réessayer plus tard.'
        } else if (err.status === 401 || err.status === 403) {
          errorMessage = t('form.modal.error401') || 'Erreur d\'authentification. Veuillez réessayer.'
        } else if (err.text) {
          errorMessage += `\n\n${err.text}`
        }
      }
      
      showErrorModal(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadCV = () => {
    const cvPaths = {
      en: '/cv/CV_andriatinasoa_jean_nico_en.pdf',
      fr: '/cv/CV_andriatinasoa_jean_nico_fr.pdf'
    }
    
    const cvFileNames = {
      en: 'CV_Andriatinasoa_Jean_Nico_EN.pdf',
      fr: 'CV_Andriatinasoa_Jean_Nico_FR.pdf'
    }

    const cvPath = cvPaths[locale as keyof typeof cvPaths] || cvPaths.en
    const cvFileName = cvFileNames[locale as keyof typeof cvFileNames] || cvFileNames.en

    const link = document.createElement('a')
    link.href = cvPath
    link.download = cvFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <section id="contact" className="section" ref={contactRef}>
        <div className="container">
          <h2 className="section-title">{t('title')}</h2>
          <div className={styles.contactContent}>
            <div className={`${styles.contactInfo} slide-in-left`}>
              <p>{t('description')}</p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>andriatina24@gmail.com</span>
                </div>
                <div className={styles.contactItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>+261348923903</span>
                </div>
                <div className={styles.contactItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{t('location')}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <button 
                  className="glow-genz-button" 
                  onClick={handleDownloadCV}
                  type="button"
                >
                  {t('downloadCV')}
                </button>
              </div>

              <div className={styles.socialLinks}>
                <a href="https://github.com/Nicoandriatina" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/nico-andriatina-34a37b250" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://wa.me/+261348923903" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className={`${styles.contactForm} slide-in-right`}>
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <input 
                    type="text" 
                    placeholder={t('form.name')}
                    required 
                    name="user_name"
                    onBlur={(e) => handleBlur('user_name', e.target.value)}
                    className={errors.user_name && touched.user_name ? 'error' : ''}
                  />
                  {errors.user_name && touched.user_name && (
                    <span style={{ color: '#ff4444', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                      {errors.user_name}
                    </span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <input 
                    type="email" 
                    placeholder={t('form.email')}
                    required 
                    name="user_email"
                    onBlur={(e) => handleBlur('user_email', e.target.value)}
                    className={errors.user_email && touched.user_email ? 'error' : ''}
                  />
                  {errors.user_email && touched.user_email && (
                    <span style={{ color: '#ff4444', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                      {errors.user_email}
                    </span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <textarea 
                    name="message" 
                    placeholder={t('form.message')}
                    rows={5} 
                    required
                    onBlur={(e) => handleBlur('message', e.target.value)}
                    className={errors.message && touched.message ? 'error' : ''}
                  />
                  {errors.message && touched.message && (
                    <span style={{ color: '#ff4444', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="glow-genz-button"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  style={{
                    opacity: isSubmitting || Object.keys(errors).length > 0 ? 0.6 : 1,
                    cursor: isSubmitting || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? t('form.sending') : t('form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Notification */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={`${styles.modalContent} ${styles[modalType]}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              {modalType === 'success' ? (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            
            <h3 className={styles.modalTitle}>
              {modalType === 'success' ? (t('form.modal.successTitle') || 'Message envoyé !') : (t('form.modal.errorTitle') || 'Erreur')}
            </h3>
            
            <p className={styles.modalMessage}>
              {modalMessage}
            </p>
            
            <button className={styles.modalButton} onClick={closeModal}>
              {t('form.modal.close') || 'Fermer'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}