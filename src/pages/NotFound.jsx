import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PlaceholderPage.css'

const NotFound = () => {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__title">404</h1>
      <div className="placeholder-page__divider"></div>
      <p className="placeholder-page__subtitle">Page not found.</p>
      <Link to="/" className="placeholder-page__back-link">
        ← Back to Home
      </Link>
    </div>
  )
}

export default NotFound