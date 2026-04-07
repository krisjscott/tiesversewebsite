import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/ContentButtons.css'

const ContentButtons = () => {
  const location = useLocation()

  const handleScroll = (id) => {
    // If not on homepage, go there first
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const buttons = [
    {
      id: 'article',
      label: 'Article',
      path: '/article',
      hasIcon: true,
    },
    {
      id: 'about',
      label: 'Context',
      sectionId: 'about-section',
    },
    {
      id: 'works',
      label: 'Works',
      sectionId: 'events-section',
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      path: '/upcoming',
    },
  ]

  const ArticleIcon = () => (
    <svg
      className="content-buttons__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  )

  return (
    <div className="content-buttons">
      {buttons.map((btn) =>
        btn.path ? (
          <Link key={btn.id} to={btn.path} className="content-buttons__btn">
            {btn.hasIcon && <ArticleIcon />}
            {btn.label}
          </Link>
        ) : (
          <button
            key={btn.id}
            type="button"
            className="content-buttons__btn"
            onClick={() => handleScroll(btn.sectionId)}
          >
            {btn.label}
          </button>
        )
      )}
    </div>
  )
}

export default ContentButtons
