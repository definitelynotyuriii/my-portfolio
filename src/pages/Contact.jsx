import { useState } from "react";
import { FaGithub, FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=delacruztristan02@gmail.com",
    Icon: FaEnvelope,
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.25)",
    desc: "delacruztristan02@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tristan-dela-cruz-268143374/",
    Icon: FaLinkedin,
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.25)",
    desc: "tristan-dela-cruz",
  },
  {
    label: "GitHub",
    href: "https://github.com/definitelynotyuriii",
    Icon: FaGithub,
    accent: "#e2e8f0",
    glow: "rgba(226,232,240,0.2)",
    desc: "definitelynotyuriii",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/smthtrstn_/",
    Icon: FaInstagram,
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.25)",
    desc: "@smthtrstn_",
  },
];

function Logo() {
  return (
    <div className="logo-wrap">
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
        <defs>
          <linearGradient id="ring1" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="ring2" x1="56" y1="0" x2="0" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f472b6" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="glow-logo">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="28" cy="28" r="24" stroke="url(#ring1)" strokeWidth="1.5" strokeDasharray="4 3" filter="url(#glow-logo)" className="spin-slow" />
        <circle cx="28" cy="28" r="16" stroke="url(#ring2)" strokeWidth="1" strokeDasharray="2 4" filter="url(#glow-logo)" className="spin-rev" />
        <circle cx="28" cy="28" r="8" fill="url(#ring1)" opacity="0.9" />
        <circle cx="28" cy="12" r="2.5" fill="#a78bfa" />
        <circle cx="44" cy="28" r="2.5" fill="#38bdf8" />
        <circle cx="28" cy="44" r="2.5" fill="#f472b6" />
        <circle cx="12" cy="28" r="2.5" fill="#a78bfa" />
      </svg>
      <span className="logo-text">TD</span>
    </div>
  );
}

export default function Contact() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <section className="contact-root">
        <div className="contact-inner">

          <div className="header-row">
            <Logo />
            <div>
              <h2 className="heading">Get In Touch</h2>
              <p className="subheading">Let's build something together</p>
            </div>
          </div>

          <div className="divider" />

          <p className="body-text">
            I'm open to collaborations, opportunities, or just a good conversation.
            Reach out through any of the channels below.
          </p>

          <div className="socials-grid">
            {socials.map(({ label, href, Icon, accent, glow, desc }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`social-card ${hovered === label ? "active" : ""}`}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                style={{ "--accent": accent, "--glow": glow }}
              >
                <div className="icon-wrap">
                  <Icon />
                  <div className="icon-glow" />
                </div>
                <div className="social-info">
                  <span className="social-label">{label}</span>
                  <span className="social-desc">{desc}</span>
                </div>
                <svg className="arrow" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>

          <p className="footer-note">Based in the Philippines · Available for remote work</p>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

        .contact-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          font-family: 'DM Sans', sans-serif;
        }

        .contact-inner {
          width: 100%;
          max-width: 540px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 44px 40px;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }

        .contact-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(167,139,250,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .header-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
        }

        /* LOGO */
        .logo-wrap {
          position: relative;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
        }

        .logo-svg {
          width: 56px;
          height: 56px;
          position: absolute;
          inset: 0;
        }

        .logo-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); transform-origin: 28px 28px; }
          to { transform: rotate(360deg); transform-origin: 28px 28px; }
        }

        @keyframes spin-rev {
          from { transform: rotate(0deg); transform-origin: 28px 28px; }
          to { transform: rotate(-360deg); transform-origin: 28px 28px; }
        }

        .spin-slow { animation: spin-slow 12s linear infinite; }
        .spin-rev { animation: spin-rev 8s linear infinite; }

        .heading {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 4px;
          letter-spacing: -0.3px;
        }

        .subheading {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-weight: 300;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent);
          margin-bottom: 24px;
        }

        .body-text {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.7;
          margin: 0 0 32px;
          font-weight: 300;
        }

        .socials-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .social-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .social-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .social-card:hover,
        .social-card.active {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
          transform: translateX(4px);
          box-shadow: 0 0 24px var(--glow);
        }

        .social-card:hover::before,
        .social-card.active::before {
          opacity: 1;
        }

        .icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          transition: background 0.25s ease;
          font-size: 18px;
          color: var(--accent);
        }

        .social-card:hover .icon-wrap {
          background: rgba(255,255,255,0.08);
        }

        .icon-glow {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: var(--glow);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .social-card:hover .icon-glow {
          opacity: 1;
        }

        .social-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .social-label {
          font-size: 14px;
          font-weight: 500;
          color: #e2e8f0;
          letter-spacing: 0.1px;
        }

        .social-desc {
          font-size: 12px;
          color: #475569;
          font-weight: 300;
          transition: color 0.25s ease;
        }

        .social-card:hover .social-desc {
          color: #64748b;
        }

        .arrow {
          width: 16px;
          height: 16px;
          color: #334155;
          transition: color 0.25s ease, transform 0.25s ease;
          flex-shrink: 0;
        }

        .social-card:hover .arrow {
          color: var(--accent);
          transform: translateX(2px);
        }

        .footer-note {
          font-size: 12px;
          color: #334155;
          text-align: center;
          margin: 28px 0 0;
          font-weight: 300;
          letter-spacing: 0.3px;
        }
      `}</style>
    </>
  );
}
