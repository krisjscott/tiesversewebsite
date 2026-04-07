import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

// ============================================================
// ASSETS
// ============================================================
import tiesverseLogo from '../assets/planets/tiesverse.png';
import tiesLogo from '../assets/planets/ties.png';
import tbaLogo from '../assets/planets/tba.png';
import fintiesLogo from '../assets/planets/finties.png';
import indiLogo from '../assets/planets/indi.png';
import fpiLogo from '../assets/planets/fpi.png';
import uptiesLogo from '../assets/planets/upties.png';
import nimbleLogo from '../assets/planets/nimble.png';

// ============================================================
// COMPONENT: StarField (Canvas optimization)
// ============================================================
const StarFieldCanvas = React.memo(({ isMobile }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    const starCount = isMobile ? 35 : 90;
    const stars = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isMobile ? 1.2 : 1.8),
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.08 + 0.03
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.y -= star.speed; 
        if (star.y < 0) star.y = canvas.height;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
});

// ============================================================
// COMPONENT: Planet Visuals
// ============================================================
const Planet = React.memo(({ item, isActive, progress, index, total, isMobile }) => {
  const offset = index / (total - 1);
  const localProgress = (progress - offset) * 3.5;
  
  let opacity = 0, scale = 0, x = 0, y = 0, rotation = 0, glowIntensity = 0;

  if (localProgress > -1.5 && localProgress < 1.5) {
    opacity = Math.max(0, Math.min(1, 1 - Math.abs(localProgress) * 0.7));
    scale = isActive ? (isMobile ? 1.05 : 1.3) : (isMobile ? 0.65 : 0.8);
    scale = scale * (1 - Math.abs(localProgress) * 0.15);
    glowIntensity = Math.max(0, 1 - Math.abs(localProgress));
    
    // Orbit radius logic perfectly tuned for both views
    const orbitRadius = isMobile ? 180 : 350;
    const angleDeg = 180 + (localProgress * 55); 
    const angleRad = (angleDeg * Math.PI) / 180;

    x = Math.cos(angleRad) * orbitRadius;
    y = Math.sin(angleRad) * orbitRadius;
    rotation = localProgress * 40;
  }

  if (opacity < 0.01) return null;

  return (
    <div
      style={{
        position: 'absolute', top: '50%', left: '50%',
        width: isMobile ? '80px' : '170px', height: isMobile ? '80px' : '170px',
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotation}deg) scale(${scale})`,
        opacity, zIndex: isActive ? 20 : 5, willChange: 'transform, opacity', pointerEvents: 'none', backfaceVisibility: 'hidden',
      }}
    >
        <img src={item.src} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 2, position: 'relative' }} />
        <div style={{
            position: 'absolute', inset: isMobile ? -10 : -40,
            background: `radial-gradient(circle, ${item.color}${Math.floor(glowIntensity * 50)} 0%, transparent 75%)`,
            borderRadius: '50%', zIndex: 1, filter: `blur(${isMobile ? '12px' : '25px'})`,
            opacity: glowIntensity, transform: 'translateZ(0)', transition: 'opacity 0.2s ease-out'
        }} />
    </div>
  );
});

// ============================================================
// MAIN SECTION
// ============================================================
const InitiativesSection = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const initiatives = useMemo(() => [
    { id: 'fpi', name: 'Foreign Policy India', src: fpiLogo, desc: "Tracking global shifts and India's strategic role in a multipolar world.", color: '#FE7A00', web: 'https://ties.tiesverse.com/' },
    { id: 'upties', name: 'Upties', src: uptiesLogo, desc: 'Building technology that adapts to how people think, behave, and evolve.', color: '#00D4FF', web: 'https://upties.in/' },
    { id: 'tba', name: 'The Bharat Age', src: tbaLogo, desc: 'Shaping informed minds for India’s future through UPSC-focused insights.', color: '#FFD700', web: 'https://ties.tiesverse.com/' },
    { id: 'ties', name: '.ties', src: tiesLogo, desc: 'In-depth geopolitical analysis and high-level strategic discourse.', color: '#FFFFFF', web: 'https://ties.tiesverse.com/' },
    { id: 'indi', name: 'India Elections', src: indiLogo, desc: 'Real-time data and in-depth analysis of electoral trends.', color: '#00FF41', web: '#' },
    { id: 'finties', name: 'Finties', src: fintiesLogo, desc: 'Democratizing financial literacy with deep market insights.', color: '#B026FF', web: 'https://finties.tiesverse.com/' },
    { id: 'nimble', name: 'Nimble', src: nimbleLogo, desc: 'The creative powerhouse behind the ecosystem identity.', color: '#FF007F', web: 'https://thenimble.in/' },
  ], []);

  useLenis(({ scroll }) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;
    const totalScrollableDistance = rect.height - window.innerHeight;
    const currentScroll = scrollTop - offsetTop;
    const scrollRatio = currentScroll / totalScrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, scrollRatio));
    setProgress(parseFloat(clampedProgress.toFixed(4)));
  });

  useEffect(() => {
    // 1024px Breakpoint ensures tablets map to the mobile/stacked layout before elements cramp
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeIndex = Math.min(Math.round(progress * (initiatives.length - 1)), initiatives.length - 1);
  const activeItem = initiatives[activeIndex] || initiatives[0];

  const jumpToNext = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.bottom, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} style={{ 
        height: '700vh', position: 'relative', zIndex: 10, background: '#000', 
        marginTop: '-2px', display: 'flow-root', overflow: 'clip' 
    }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* TOP TRANSITION BRIDGE */}
        <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '15vh',
            background: 'linear-gradient(to bottom, #000000, transparent)',
            zIndex: 10, pointerEvents: 'none'
        }} />

        {/* DYNAMIC GLOW */}
        <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: `radial-gradient(circle at 75% 50%, ${activeItem.color}18 0%, transparent 65%)`,
            transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none'
        }} />

        {/* FILM GRAIN */}
        <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
            pointerEvents: 'none', opacity: 0.8
        }} />

        <StarFieldCanvas isMobile={isMobile} />
        
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: isMobile ? 'column' : 'row', zIndex: 5 }}>
            {/* TEXT CONTAINER */}
            <div style={{ 
                flex: isMobile ? '0 0 45%' : '0 0 50%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: isMobile ? '80px 8% 0' : '0 0 0 10%', 
                position: 'relative', 
                zIndex: 30 
            }}>
                 <div style={{ maxWidth: '500px', margin: isMobile ? '0 auto' : '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ height: '2px', width: '35px', background: activeItem.color, transition: 'background 0.5s' }} />
                        <span style={{ color: activeItem.color, fontWeight: '900', letterSpacing: '5px', fontSize: '0.75rem', transition: 'color 0.5s', fontFamily: "'Space Mono', monospace" }}>
                            PROJECT 0{activeIndex + 1}
                        </span>
                    </div>
                    
                    <h2 style={{ color: 'white', fontSize: isMobile ? 'clamp(2.4rem, 8vw, 3.5rem)' : '4.8rem', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 15px 0', lineHeight: 0.95, textTransform: 'uppercase', fontWeight: 900, textShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'color 0.4s ease' }}>
                        {activeItem.name}
                    </h2>
                    
                    <p style={{ color: '#aaaaaa', fontSize: isMobile ? '0.95rem' : '1.15rem', lineHeight: 1.6, marginBottom: '40px', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                        {activeItem.desc}
                    </p>

                    <a href={activeItem.web} target="_blank" rel="noreferrer" style={{
                        pointerEvents: 'auto', background: activeItem.color, color: activeItem.color === '#FFFFFF' ? 'black' : 'white',
                        padding: '16px 36px', borderRadius: '2px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem',
                        display: 'inline-block', letterSpacing: '2px', boxShadow: `0 10px 30px ${activeItem.color}30`, cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        LAUNCH EXPLORER
                    </a>
                 </div>
            </div>

            {/* GLOBE CONTAINER */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-end' }}>
                <div style={{ 
                    position: 'absolute', 
                    // THE EXACT FIX: 
                    // mathematically shifting exactly 100px right from the absolute center on mobile
                    right: isMobile ? 'calc(50% - 300px)' : '8%', 
                    width: isMobile ? '400px' : '650px', 
                    height: isMobile ? '400px' : '650px', 
                    pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                    <img src={tiesverseLogo} alt="Hub" style={{ width: isMobile ? '55%' : '65%', height: 'auto', filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.08))', zIndex: 10, userSelect: 'none', transform: 'translateZ(0)' }} />
                    {initiatives.map((item, index) => (
                        <Planet key={item.id} item={item} index={index} total={initiatives.length} isActive={index === activeIndex} progress={progress} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </div>

        {/* UI CONTROLS */}
        <div style={{ position: 'absolute', bottom: isMobile ? '35px' : '50px', left: '5%', right: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, pointerEvents: 'none' }}>
            <button onClick={jumpToNext} style={{
                    pointerEvents: 'auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', padding: isMobile ? '10px 20px' : '14px 28px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', letterSpacing: '1.5px', fontFamily: "'Space Mono', monospace"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'black'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'white'; }}
            >
                SKIP SECTION ↓
            </button>

            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', letterSpacing: '3px', textAlign: 'right', fontFamily: "'Space Mono', monospace" }}>
                SCROLL TO <br/> NAVIGATE
            </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: 'rgba(255,255,255,0.05)', width: '100%', zIndex: 101, pointerEvents: 'none' }}>
            <div style={{ height: '100%', width: `${progress * 100}%`, background: activeItem.color, boxShadow: `0 0 20px ${activeItem.color}`, transition: 'width 0.15s linear, background 0.6s ease' }} />
        </div>
      </div>
    </div>
  );
};

export default InitiativesSection;