'use client'

import { useEffect, useState } from 'react'
import { translations, currencyRates, basePrices, type Language, type Currency } from './translations'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [language, setLanguage] = useState<Language>('en')
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [mounted, setMounted] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    
    // Can't book past dates
    if (checkDate < today) return false
    
    // Example: Make weekends unavailable (Saturday = 6, Sunday = 0)
    const dayOfWeek = checkDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return false
    
    // Example: Make some specific dates unavailable (you can customize this)
    // For demo, let's make dates that are multiples of 7 unavailable
    // In production, you'd check against actual booked dates
    
    return true
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(calendarYear, calendarMonth, day)
    if (isDateAvailable(selectedDate)) {
      const dateString = selectedDate.toISOString().split('T')[0]
      setBookingForm({
        ...bookingForm,
        date: dateString,
      })
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (calendarMonth === 0) {
        setCalendarMonth(11)
        setCalendarYear(calendarYear - 1)
      } else {
        setCalendarMonth(calendarMonth - 1)
      }
    } else {
      if (calendarMonth === 11) {
        setCalendarMonth(0)
        setCalendarYear(calendarYear + 1)
      } else {
        setCalendarMonth(calendarMonth + 1)
      }
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarYear, calendarMonth)
    const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth)
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(calendarYear, calendarMonth, day)
      days.push({
        day,
        date,
        available: isDateAvailable(date),
        selected: bookingForm.date === date.toISOString().split('T')[0],
      })
    }
    
    return days
  }

  useEffect(() => {
    setMounted(true)
    // Get saved preferences or defaults
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    const savedLanguage = localStorage.getItem('language') as Language | null
    const savedCurrency = localStorage.getItem('currency') as Currency | null
    
    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
    if (savedCurrency) setCurrency(savedCurrency)
    
    // Detect browser language
    if (!savedLanguage) {
      const browserLang = navigator.language.split('-')[0]
      if (['hu', 'en', 'de', 'ru'].includes(browserLang)) {
        setLanguage(browserLang as Language)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const applyTheme = () => {
      const root = document.documentElement
      let effectiveTheme: 'light' | 'dark'

      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        effectiveTheme = systemPrefersDark ? 'dark' : 'light'
      } else {
        effectiveTheme = theme
      }

      if (effectiveTheme === 'dark') {
        root.setAttribute('data-theme', 'dark')
      } else {
        root.removeAttribute('data-theme')
      }
    }

    applyTheme()
    localStorage.setItem('theme', theme)

    // Listen for system preference changes when theme is set to 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => applyTheme()
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, mounted])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  const getThemeLabel = () => {
    if (theme === 'light') return 'Light'
    if (theme === 'dark') return 'Dark'
    return 'Auto'
  }

  const t = translations[language]
  
  const formatPrice = (basePrice: number) => {
    const rate = currencyRates[currency]
    let converted = basePrice * rate.rate
    // Round up to nice numbers
    if (currency === 'HUF') {
      converted = Math.ceil(converted / 1000) * 1000 // Round up to nearest 1000
    } else {
      converted = Math.ceil(converted / 10) * 10 // Round up to nearest 10
    }
    return `${rate.symbol}${converted.toLocaleString()}`
  }

  const getDurationText = (hours: number) => {
    const hourText = hours === 1 ? t.pricing.hour : t.pricing.hours
    return `${hours} ${hourText}`
  }

  // Pricing packages with translations and currency conversion - Small/Medium/Large strategy
  const pricingPackages = [
    {
      id: 1,
      name: t.pricing.basic,
      price: formatPrice(basePrices.basic),
      duration: getDurationText(1),
      includes: [
        language === 'hu' ? '1 órás fotózás' : language === 'de' ? '1 Stunde Fotosession' : language === 'ru' ? '1 час фотосессии' : '1 hour photo session',
        language === 'hu' ? '15 szerkesztett digitális kép' : language === 'de' ? '15 bearbeitete digitale Bilder' : language === 'ru' ? '15 отредактированных цифровых изображений' : '15 edited digital images',
        language === 'hu' ? 'Online galéria hozzáférés' : language === 'de' ? 'Online-Galerie-Zugang' : language === 'ru' ? 'Доступ к онлайн-галерее' : 'Online gallery access',
        language === 'hu' ? 'Nyomtatási engedély' : language === 'de' ? 'Druckfreigabe' : language === 'ru' ? 'Право на печать' : 'Print release'
      ]
    },
    {
      id: 2,
      name: t.pricing.premium,
      price: formatPrice(basePrices.premium),
      duration: getDurationText(2),
      includes: [
        language === 'hu' ? '2 órás fotózás' : language === 'de' ? '2 Stunden Fotosession' : language === 'ru' ? '2 часа фотосессии' : '2 hour photo session',
        language === 'hu' ? '30 szerkesztett digitális kép' : language === 'de' ? '30 bearbeitete digitale Bilder' : language === 'ru' ? '30 отредактированных цифровых изображений' : '30 edited digital images',
        language === 'hu' ? 'Online galéria hozzáférés' : language === 'de' ? 'Online-Galerie-Zugang' : language === 'ru' ? 'Доступ к онлайн-галерее' : 'Online gallery access',
        language === 'hu' ? 'Nyomtatási engedély' : language === 'de' ? 'Druckfreigabe' : language === 'ru' ? 'Право на печать' : 'Print release',
        language === 'hu' ? '2 nyomtatott fotó (8x10)' : language === 'de' ? '2 gedruckte Fotos (8x10)' : language === 'ru' ? '2 напечатанных фото (8x10)' : '2 printed photos (8x10)',
        language === 'hu' ? '2 ruhaváltás' : language === 'de' ? '2 Outfit-Wechsel' : language === 'ru' ? '2 смены наряда' : '2 outfit changes'
      ]
    },
    {
      id: 3,
      name: t.pricing.deluxe,
      price: formatPrice(basePrices.deluxe),
      duration: getDurationText(3),
      includes: [
        language === 'hu' ? '3 órás fotózás' : language === 'de' ? '3 Stunden Fotosession' : language === 'ru' ? '3 часа фотосессии' : '3 hour photo session',
        language === 'hu' ? '50 szerkesztett digitális kép' : language === 'de' ? '50 bearbeitete digitale Bilder' : language === 'ru' ? '50 отредактированных цифровых изображений' : '50 edited digital images',
        language === 'hu' ? 'Online galéria hozzáférés' : language === 'de' ? 'Online-Galerie-Zugang' : language === 'ru' ? 'Доступ к онлайн-галерее' : 'Online gallery access',
        language === 'hu' ? 'Nyomtatási engedély' : language === 'de' ? 'Druckfreigabe' : language === 'ru' ? 'Право на печать' : 'Print release',
        language === 'hu' ? '5 nyomtatott fotó (különböző méretek)' : language === 'de' ? '5 gedruckte Fotos (verschiedene Größen)' : language === 'ru' ? '5 напечатанных фото (разные размеры)' : '5 printed photos (various sizes)',
        language === 'hu' ? 'Korlátlan ruhaváltás' : language === 'de' ? 'Unbegrenzte Outfit-Wechsel' : language === 'ru' ? 'Неограниченная смена нарядов' : 'Unlimited outfit changes',
        language === 'hu' ? 'Helyszín felderítés' : language === 'de' ? 'Location-Scouting' : language === 'ru' ? 'Разведка локации' : 'Location scouting'
      ]
    }
  ]

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  const openBooking = (packageId: number) => {
    const now = new Date()
    setSelectedPackage(packageId)
    setBookingOpen(true)
    setBookingSubmitted(false)
    setCalendarMonth(now.getMonth())
    setCalendarYear(now.getFullYear())
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
    })
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setSelectedPackage(null)
    setTimeout(() => setBookingSubmitted(false), 300)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a backend/email service
    // For now, we'll just show success message
    console.log('Booking submitted:', {
      package: selectedPackage,
      ...bookingForm,
    })
    setBookingSubmitted(true)
    // In production, you'd send this to your backend/email service
    setTimeout(() => {
      closeBooking()
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    })
  }

  // Portrait images - Couples, Nice Portraits, Kids photos
  const portraitImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&q=80&fit=crop', alt: 'Romantic Couple' },
    { id: 2, src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=800&q=80&fit=crop', alt: 'Couple Portrait' },
    { id: 3, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&q=80&fit=crop', alt: 'Elegant Portrait' },
    { id: 4, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&q=80&fit=crop', alt: 'Beautiful Portrait' },
    { id: 5, src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=800&q=80&fit=crop', alt: 'Child Portrait' },
    { id: 6, src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=800&q=80&fit=crop', alt: 'Kids Portrait' },
    { id: 7, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&q=80&fit=crop', alt: 'Portrait' },
    { id: 8, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&q=80&fit=crop', alt: 'Portrait' },
  ]

  // Gallery images - Highly aesthetic nature and landscape photos
  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop', alt: 'Mountain Landscape' },
    { id: 2, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop', alt: 'Forest Path' },
    { id: 3, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80&fit=crop', alt: 'Nature Scene' },
    { id: 4, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop', alt: 'Landscape' },
    { id: 5, src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80&fit=crop', alt: 'Nature' },
    { id: 6, src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&fit=crop', alt: 'Mountain View' },
    { id: 7, src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80&fit=crop', alt: 'Landscape' },
    { id: 8, src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80&fit=crop', alt: 'Nature' },
    { id: 9, src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80&fit=crop', alt: 'Landscape' },
  ]


  return (
    <main>
      {/* Navigation */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="logo">Anna Papfalusi</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="nav-links">
              <li><a href="#home">{t.nav.home}</a></li>
              <li><a href="#portraits">{t.nav.portraits}</a></li>
              <li><a href="#gallery">{t.nav.gallery}</a></li>
              <li><a href="#pricing">{t.nav.pricing}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
            {mounted && (
              <div className="settings-controls">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="settings-select"
                  aria-label="Select language"
                >
                  <option value="hu">HU</option>
                  <option value="en">EN</option>
                  <option value="de">DE</option>
                  <option value="ru">RU</option>
                </select>
                <span className="settings-divider" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="settings-select"
                  aria-label="Select currency"
                >
                  <option value="HUF">HUF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
                <span className="settings-divider" />
                <button
                  onClick={toggleTheme}
                  className="theme-toggle"
                  aria-label="Toggle theme"
                >
                  {getThemeLabel()}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Portraits Section */}
      <section id="portraits" className="portraits">
        <div className="container">
          <h2 className="section-title">{t.sections.portraits}</h2>
          <div className="portrait-grid">
            {portraitImages.map((image) => (
              <div key={image.id} className="portrait-item">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <h2 className="section-title">{t.sections.gallery}</h2>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="section-title">{t.sections.pricing}</h2>
          <div className="pricing-grid">
            {pricingPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`pricing-card ${pkg.id === 2 ? 'popular' : ''}`}
              >
                {pkg.id === 2 && (
                  <div className="popular-badge">{t.pricing.mostPopular}</div>
                )}
                <h3 className="pricing-name">{pkg.name}</h3>
                <div className="pricing-price">{pkg.price}</div>
                <div className="pricing-duration">{pkg.duration}</div>
                <ul className="pricing-features">
                  {pkg.includes.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button 
                  onClick={() => openBooking(pkg.id)}
                  className="pricing-button"
                >
                  {t.pricing.book}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">{t.sections.about}</h2>
          <div className="about-content">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <p>{t.about.p4}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">{t.sections.contact}</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <strong>{t.contact.email}</strong>
                <span>anna@papfalusiphotography.com</span>
              </div>
              <div className="contact-item">
                <strong>{t.contact.follow}</strong>
                <a href="https://www.instagram.com/preteann/" target="_blank" rel="noopener noreferrer">preteann</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Anna Papfalusi <span>•</span> {t.footer.rights}</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="booking-overlay" onClick={closeBooking}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="booking-close" onClick={closeBooking}>
              {t.booking.close}
            </button>
            {bookingSubmitted ? (
              <div className="booking-success">
                <h3>{t.booking.success}</h3>
              </div>
            ) : (
              <>
                <h2 className="booking-title">{t.booking.title}</h2>
                {selectedPackage && (
                  <div className="booking-package">
                    {pricingPackages.find(p => p.id === selectedPackage)?.name}
                  </div>
                )}
                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-group">
                    <label htmlFor="name">{t.booking.name} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t.booking.email} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t.booking.phone} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.booking.date} *</label>
                    <div className="calendar-container">
                      <div className="calendar-header">
                        <button
                          type="button"
                          className="calendar-nav"
                          onClick={() => navigateMonth('prev')}
                        >
                          ←
                        </button>
                        <div className="calendar-month-year">
                          {t.booking.months[calendarMonth]} {calendarYear}
                        </div>
                        <button
                          type="button"
                          className="calendar-nav"
                          onClick={() => navigateMonth('next')}
                        >
                          →
                        </button>
                      </div>
                      <div className="calendar-weekdays">
                        {t.booking.weekdays.map((day, index) => (
                          <div key={index} className="calendar-weekday">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="calendar-days">
                        {renderCalendar().map((dayData, index) => {
                          if (dayData === null) {
                            return <div key={index} className="calendar-day empty"></div>
                          }
                          return (
                            <button
                              key={index}
                              type="button"
                              className={`calendar-day ${
                                !dayData.available ? 'unavailable' : ''
                              } ${dayData.selected ? 'selected' : ''}`}
                              onClick={() => handleDateSelect(dayData.day)}
                              disabled={!dayData.available}
                            >
                              {dayData.day}
                            </button>
                          )
                        })}
                      </div>
                      {bookingForm.date && (
                        <div className="calendar-selected">
                          {t.booking.selectDate}: {new Date(bookingForm.date).toLocaleDateString(language === 'hu' ? 'hu-HU' : language === 'de' ? 'de-DE' : language === 'ru' ? 'ru-RU' : 'en-US')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">{t.booking.time} *</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t.booking.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={bookingForm.message}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="booking-submit"
                    disabled={!bookingForm.date || !bookingForm.time}
                  >
                    {t.booking.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

