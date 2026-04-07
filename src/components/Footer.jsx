import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  
  // State for Scroll Reveal
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      // Trigger slightly earlier since the footer is now shorter
      { threshold: 0.2 } 
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  /* Navigation Logic */
  const handleScrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const socialLinks = [
    {
      id: 'x',
      url: 'https://x.com/TiesIndia?s=20',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      url: 'https://www.instagram.com/tiesverse?igsh=bGIwZGVvYjhybXhj',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.355 2.618 6.778 6.98 6.978 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.199-4.354-2.618-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324zM18.406 4.155a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
        </svg>
      )
    },
    {
      id: 'substack',
      url: 'https://tiesindia.substack.com/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.077V0z" />
        </svg>
      )
    },
    {
      id: 'discord',
      url: 'https://discord.gg/fpfKFwxa',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" />
        </svg>
      )
    },
    {
      id: 'youtube',
      url: 'https://youtube.com/@tiesindia?si=o8xr1TJgM4Teoprs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ]

  return (
    <>
      <style>{`
        .footer-wrapper {
          position: relative;
          background: #000;
          overflow: hidden;
          margin-top: -1px; 
        }

        .footer {
          position: relative;
          z-index: 10;
          /* Drastically reduced padding for a tighter, more compact look */
          padding: 40px 20px 30px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          
          /* The 'Sarvam' Style Bottom Glow */
          background-color: #000000;
          background-image: radial-gradient(ellipse 100% 100% at bottom center, 
            rgba(254, 122, 0, 0.4) 0%,   /* Intense orange at the very bottom */
            rgba(255, 255, 255, 0.1) 40%, /* Fades to a white-ish tint mid-way */
            #000000 80%                   /* Reverts to solid black at the top */
          );
          
          /* Slow upward reveal, reduced travel distance since it's smaller */
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.5s ease-out, transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Triggered by IntersectionObserver */
        .footer.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .footer__content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Tighter gap between rows */
          gap: 15px;
        }

        .footer__logo-image {
          height: 45px; /* Unchanged size */
          object-fit: contain;
          transition: transform 0.4s ease;
        }
        
        .footer__logo-image:hover {
          transform: scale(1.05);
        }

        .footer__socials {
          display: flex;
          /* Tighter gap */
          gap: 15px;
          margin-top: 0;
        }

        .footer__social-link {
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s ease, transform 0.3s ease, background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; /* Unchanged size */
          height: 42px; /* Unchanged size */
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer__social-link:hover {
          color: #FE7A00;
          background: #000; 
          border-color: rgba(254, 122, 0, 0.5);
          transform: translateY(-4px);
        }

        .footer__links {
          display: flex;
          /* Tighter gap */
          gap: 25px;
          margin-top: 5px;
        }

        .footer__link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 13px; /* Unchanged size */
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0;
          transition: color 0.3s ease;
        }

        .footer__link:hover {
          color: #FE7A00;
        }

        .footer__text {
          font-size: 13px; /* Unchanged size */
          color: rgba(255, 255, 255, 0.4);
          /* Tighter margin */
          margin: 5px 0 0 0;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 35px 20px 25px;
            transform: translateY(20px);
          }
          .footer__content {
            gap: 20px;
          }
          .footer__links {
            gap: 20px;
          }
        }
      `}</style>

      <div className="footer-wrapper">
        <footer 
          ref={footerRef} 
          className={`footer ${isVisible ? 'visible' : ''}`}
        >
          <div className="footer__content">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="Tiesverse Foundation" className="footer__logo-image" />
            </Link>

            <div className="footer__socials">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-link"
                  aria-label={`Follow us on ${social.id}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <nav className="footer__links">
              <button 
                type="button" 
                className="footer__link" 
                onClick={() => handleScrollToSection('about-section')}
              >
                About
              </button>
              
              <button 
                type="button" 
                className="footer__link" 
                onClick={() => handleScrollToSection('contact-section')}
              >
                Contact
              </button>
            </nav>

            <p className="footer__text">
              © {currentYear} Tiesverse Foundation. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer