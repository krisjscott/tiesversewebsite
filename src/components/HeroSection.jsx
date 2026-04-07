import React from 'react';

// ====================================================================
// GLOBAL CSS: Animations, Typography, and Aesthetics
// ====================================================================
const STATIC_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  /* Orange and White Mix Gradient Text */
  .text-gradient {
    background: linear-gradient(135deg, #FFFFFF 10%, #FE7A00 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;
  }

  /* Cinematic Film Grain Overlay */
  .noise-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E");
    z-index: 1;
    pointer-events: none;
  }

  /* Reveal Animations */
  .fade-in-up {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Looping Light Drop for Scroll Indicator */
  .scroll-line-anim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to bottom, transparent, #FE7A00, transparent);
    animation: scrollDrop 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  @keyframes scrollDrop {
    0% { transform: translateY(-100%); opacity: 0; }
    30% { opacity: 1; }
    70% { opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  @media (max-width: 768px) {
    .responsive-headline {
      font-size: 2.8rem !important; 
      line-height: 1.1 !important;
      letter-spacing: -1px !important;
    }
    .responsive-subhead {
      font-size: 1rem !important;
      padding: 0 15px;
    }
  }
`;

const HeroSection = () => {
  return (
    <section style={styles.hero}>
      <style>{STATIC_CSS}</style>
      
      {/* Background Layers: Black base, Vibrant Asymmetrical Orange/White Mix, and Noise */}
      <div style={styles.ambientBackground} />
      <div className="noise-overlay" />

      {/* Main Content Container */}
      <div style={styles.container}>

        {/* Framing Content */}
        <div style={styles.contentWrapper}>

          {/* Main Headline */}
          <h1 className="responsive-headline fade-in-up" style={{...styles.headline, animationDelay: '0.1s'}}>
            INDIA'S LEADING<br/>
            <span className="text-gradient">YOUTH-LED</span><br/>
            ORGANISATION.
          </h1>

          {/* Subheadline */}
          <p className="responsive-subhead fade-in-up" style={{...styles.subhead, animationDelay: '0.2s'}}>
            <span style={{color: '#fff', fontWeight: '500'}}>210,000</span> followers. <span style={{color: '#fff', fontWeight: '500'}}>52,000</span> subscribers. <span style={{color: '#fff', fontWeight: '500'}}>Millions</span> of monthly impressions.<br/>
            <span style={{color: '#fff', fontWeight: '500'}}>100+</span> team members from India's and the world's leading institutions.
          </p>

          {/* Footer Text / Animated Scroll Indicator */}
          <div className="fade-in-up" style={{...styles.footerNoteContainer, animationDelay: '0.3s'}}>
            <div style={styles.footerNote}>SCROLL TO EXPLORE TIESVERSE</div>
            <div style={styles.scrollTrack}>
              <div className="scroll-line-anim" />
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM TRANSITION FADE: 
          This creates a smooth gradient "bridge" into the next section 
          so the transition doesn't feel like a sharp cut. 
      */}
      <div style={styles.bottomTransition} />
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    paddingTop: '80px', 
    backgroundColor: '#000000', 
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
    marginBottom: '-1px', // Prevents sub-pixel gap lines
  },
  ambientBackground: {
    position: 'absolute',
    inset: 0,
    /* Updated gradient: We extend the range so the glow doesn't end abruptly 
       at the bottom of the viewport.
    */
    background: `
      radial-gradient(circle at 85% 5%, rgba(254, 122, 0, 0.22) 0%, transparent 60%),
      radial-gradient(circle at 15% 10%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 50%, rgba(254, 122, 0, 0.08) 0%, transparent 70%)
    `,
    zIndex: 0,
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px', 
  },
  contentWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '20px 0',
  },
  headline: {
    fontFamily: "'Space Grotesk', sans-serif", 
    fontSize: '5.8rem',
    lineHeight: '1.05',
    fontWeight: '800',
    margin: '0 0 20px 0', 
    color: '#ffffff',
    letterSpacing: '-2px',
    textTransform: 'uppercase',
    textShadow: '0 10px 40px rgba(0,0,0,0.8)', 
  },
  subhead: {
    fontSize: '1.15rem',
    lineHeight: '1.7',
    color: '#a0a0a0', 
    margin: 0,
    fontWeight: '300',
    maxWidth: '650px',
    letterSpacing: '0px',
  },
  footerNoteContainer: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  footerNote: {
    fontSize: '0.7rem',
    color: '#666666',
    letterSpacing: '5px',
    fontFamily: "'Space Mono', monospace",
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  scrollTrack: {
    position: 'relative',
    width: '1px',
    height: '60px',
    background: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  bottomTransition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '25vh',
    background: 'linear-gradient(to bottom, transparent, #000000)',
    zIndex: 5,
    pointerEvents: 'none',
  }
};

export default HeroSection;