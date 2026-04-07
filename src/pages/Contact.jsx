import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SYSTEM: DISPATCHING...');
    
    const formData = new FormData(e.target);
    const scriptURL = 'https://script.google.com/macros/s/AKfycby3J3y64XXMWSP9SDAfGApz3NVIMnv6fyQA7BbyVGL2weD0uQzMQwPvPzQc7N1HbCrH0A/exec';

    try {
      await fetch(scriptURL, { method: 'POST', body: formData });
      setStatus('SUCCESS: INQUIRY LOGGED.');
      e.target.reset();
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('FAILURE: RETRY CONNECTION.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section className="contact-interface">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Archivo+Black&display=swap');

        :root {
          --brand-orange: #FE7A00;
          --bg-main: #000000;
          --bg-card: #0a0a0a;
          --border-color: rgba(255, 255, 255, 0.08);
          --text-dim: #888888;
        }

        .contact-interface {
          min-height: 100vh;
          background: var(--bg-main);
          color: #fff;
          padding: 120px 5vw;
          font-family: 'Inter', sans-serif;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .master-container {
          max-width: 1300px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* --- TYPOGRAPHY --- */
        .title-group h1 {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(50px, 7vw, 100px);
          line-height: 0.85;
          margin: 0 0 60px 0;
          letter-spacing: -4px;
          text-transform: uppercase;
        }

        .label-micro {
          font-size: 11px;
          letter-spacing: 4px;
          color: var(--brand-orange);
          text-transform: uppercase;
          font-weight: 800;
          margin-bottom: 25px;
          display: block;
        }

        /* --- CONTACT DIRECTORY --- */
        .dir-container {
          border-top: 1px solid var(--border-color);
          margin-bottom: 40px;
        }

        .dir-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 35px 0;
          border-bottom: 1px solid var(--border-color);
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .dir-item:hover {
          padding-left: 20px;
          padding-right: 20px;
          background: rgba(254, 122, 0, 0.03);
          border-bottom-color: var(--brand-orange);
        }

        .dir-name {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -1px;
          margin-top: 5px;
        }

        .dir-role {
          font-size: 11px;
          color: var(--brand-orange);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .dir-contact {
          font-size: 18px;
          font-weight: 300;
          color: var(--text-dim);
          text-align: right;
          font-variant-numeric: tabular-nums;
        }

        /* --- EMAIL HUB --- */
        .email-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .email-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 30px;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
        }

        .email-card:hover {
          border-color: rgba(254, 122, 0, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .email-label {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        .email-link {
          font-size: 20px;
          color: #fff;
          font-weight: 400;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .email-card:hover .email-link {
          color: var(--brand-orange);
        }

        .email-dot {
          width: 8px;
          height: 8px;
          background: var(--brand-orange);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(254, 122, 0, 0.4);
        }

        /* --- FORM DESIGN --- */
        .form-container {
          padding: 50px;
          background: #080808;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }

        /* Subtle gradient glow inside form */
        .form-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, var(--brand-orange), transparent);
          opacity: 0.5;
        }

        .form-header {
          font-family: 'Archivo Black', sans-serif;
          font-size: 28px;
          margin-bottom: 50px;
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .input-row {
          margin-bottom: 40px;
          position: relative;
        }

        .minimal-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding: 15px 0;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .minimal-input::placeholder {
          color: rgba(255,255,255,0.3);
          font-weight: 300;
          letter-spacing: 1px;
        }

        .minimal-input:focus {
          border-bottom-color: var(--brand-orange);
          padding-left: 10px; /* Slight indent on focus for premium feel */
        }

        textarea.minimal-input {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 22px;
          background: var(--brand-orange);
          color: #000;
          border: none;
          border-radius: 4px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          font-size: 14px;
        }

        .submit-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(254, 122, 0, 0.2);
        }

        .status-feedback {
          margin-top: 20px;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--brand-orange);
          text-align: center;
          font-weight: 600;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 1000px) {
          .master-container { 
            grid-template-columns: 1fr; 
            gap: 60px; 
          }
          .contact-interface { padding: 100px 5vw; }
          .form-container { padding: 40px 30px; }
        }

        @media (max-width: 600px) {
          .dir-item { 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 15px; 
            padding: 30px 0;
          }
          .dir-contact { text-align: left; font-size: 16px; }
          .email-link { font-size: 16px; }
          .form-container { padding: 30px 20px; }
        }
      `}</style>

      <div className="master-container">
        
        {/* LEFT COLUMN: Info & Directory */}
        <div className="title-group">
          <span className="label-micro">Inquiry Terminal 2026</span>
          <h1>
            Bureau<br/>
            <span style={{color: '#FE7A00'}}>Access.</span>
          </h1>

          <div className="dir-container">
            {/* Updated Directory Item */}
            <a href="tel:+919650204805" className="dir-item">
              <div>
                <span className="dir-role">Dir. Management, Ops & Strategy</span>
                <div className="dir-name">Abhishek</div>
              </div>
              <div className="dir-contact">+91 96502 04805</div>
            </a>
          </div>

          <div className="email-section">
            {/* Partnership Queries */}
            <a href="mailto:hello@tiesverse.com" className="email-card">
              <span className="email-label">Partnership Queries</span>
              <div className="email-link">
                <div className="email-dot"></div> hello@tiesverse.com
              </div>
            </a>
            
            {/* General Inquiry */}
            <a href="mailto:tiesverse@gmail.com" className="email-card">
              <span className="email-label">General Inquiry</span>
              <div className="email-link">
                <div className="email-dot"></div> tiesverse@gmail.com
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="form-container">
          <div className="form-header">Secure Message</div>
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <input type="text" name="name" className="minimal-input" placeholder="FULL NAME" required />
            </div>
            <div className="input-row">
              <input type="email" name="email" className="minimal-input" placeholder="EMAIL ADDRESS" required />
            </div>
            <div className="input-row">
              <textarea name="message" className="minimal-input" placeholder="DETAILED INQUIRY" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Dispatch Message</button>
            {status && <div className="status-feedback">{status}</div>}
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;