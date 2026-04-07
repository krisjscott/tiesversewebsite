import React, { useEffect, useState } from 'react';

const Preloader = ({ onLoadComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Artificial wait time for a "flash" effect (approx 1.2s total)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadComplete, 800); 
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className={`simple-loader ${isExiting ? 'exit' : ''}`}>
      <style>{`
        .simple-loader {
          position: fixed; inset: 0;
          background: #000;
          z-index: 999999;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.6s ease, filter 0.6s ease;
        }

        .simple-loader.exit {
          opacity: 0;
          filter: blur(10px);
          pointer-events: none;
        }

        .loader-line {
          width: 120px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .loader-line::after {
          content: "";
          position: absolute;
          left: -100%;
          top: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, transparent, #FE7A00, transparent);
          animation: slide 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .brand-mark {
          position: absolute;
          bottom: 40px;
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          letter-spacing: 5px;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
        }
      `}</style>

      <div className="loader-line" />
      <div className="brand-mark">Establishing Link</div>
    </div>
  );
};

export default Preloader;