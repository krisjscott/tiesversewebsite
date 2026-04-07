import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PlaceholderPage.css'

const Note = () => {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__title">Note</h1>
      <div className="placeholder-page__divider"></div>
      <p className="placeholder-page__subtitle">This page is coming soon.</p>
      <Link to="/" className="placeholder-page__back-link">
        ← Back to Home
      </Link>
    </div>
  )
}

export default Note