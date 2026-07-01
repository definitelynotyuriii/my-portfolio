import { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const socials = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=delacruztristan02@gmail.com",
    Icon: FaEnvelope,
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.18)",
    desc: "delacruztristan02@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tristan-dela-cruz-268143374/",
    Icon: FaLinkedin,
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.18)",
    desc: "tristan-dela-cruz",
  },
  {
    label: "GitHub",
    href: "https://github.com/definitelynotyuriii",
    Icon: FaGithub,
    accent: "#94a3b8",
    glow: "rgba(148,163,184,0.18)",
    desc: "definitelynotyuriii",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/smthtrstn_/",
    Icon: FaInstagram,
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.18)",
    desc: "@smthtrstn_",
  },
];

// ── Replace with your actual image path or import ────────────────────────────
const AVATAR_SRC = "/imgs/YURI.jpeg"; // e.g. import avatarImg from "./assets/photo.jpg"
// ─────────────────────────────────────────────────────────────────────────────                                                                

// Page transition variants (used by AnimatePresence in your router/layout)
export const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

// Stagger children (card header, body rows)
const containerVariants = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Logo() {
  return (
    <div className="logo-wrap">
      <svg
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <defs>
          <clipPath id="avatar-clip">
            <circle cx="26" cy="26" r="16" />
          </clipPath>
        </defs>
        <circle
          cx="26" cy="26" r="22"
          stroke="#a78bfa" strokeWidth="1.2"
          strokeDasharray="4 3" opacity="0.6"
          className="spin-slow"
        />
        <circle
          cx="26" cy="26" r="14"
          stroke="#38bdf8" strokeWidth="0.8"
          strokeDasharray="2 4" opacity="0.5"
          className="pulse-ring"
        />
        <circle cx="26" cy="4"  r="2" fill="#a78bfa" opacity="0.5" />
        <circle cx="48" cy="26" r="2" fill="#38bdf8" opacity="0.5" />
        <circle cx="26" cy="48" r="2" fill="#f472b6" opacity="0.5" />
        <circle cx="4"  cy="26" r="2" fill="#a78bfa" opacity="0.5" />
        <image
          href={AVATAR_SRC}
          x="10" y="10"
          width="32" height="32"
          clipPath="url(#avatar-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}

export default function Contact() {
  const [hovered, setHovered] = useState(null);

  return (
    // ── Wrap with motion.section for page-level enter/exit transition ──
    // AnimatePresence must wrap your <Routes> in main App for exit to fire.
    <motion.section
      className="contact-root"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="contact-card"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >

        {/* ── Header ── */}
        <motion.div className="card-header" variants={itemVariants}>
          <Logo />
          <div className="header-text">
            <h2 className="heading">Contact Me</h2>
            <p className="subheading">For more Information</p>
          </div>
        </motion.div>

        <div className="divider" />

        {/* ── Body ── */}
        <div className="card-body">
          <motion.p className="bio" variants={itemVariants}>
            I'm open to collaborations, opportunities, learning new things.
          </motion.p>

          <div className="socials">
            {socials.map(({ label, href, Icon, accent, glow, desc }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`social-link ${hovered === label ? "active" : ""}`}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                style={{ "--accent": accent, "--glow": glow }}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="accent-bar" />
                <div className="icon-wrap">
                  <Icon />
                </div>
                <div className="social-info">
                  <span className="social-label">{label}</span>
                  <span className="social-desc">{desc}</span>
                </div>
                <svg className="arrow" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <motion.div className="card-footer" variants={itemVariants}>
          <span className="availability-dot" />
          <span className="footer-text">
            Based in the Philippines
          </span>
        </motion.div>

      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.7; }
        }

        .contact-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .contact-card {
          width: 100%;
          max-width: 800px;
          background: var(--card);
          border: 0.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }

       .card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 28px 28px 0;
        }

        .logo-wrap {
          width: 120px; height: 120px;
          position: relative; flex-shrink: 0;
        }
        .logo-svg { width: 120px; height: 120px; }

        .spin-slow {
          animation: spin-slow 12s linear infinite;
          transform-origin: 26px 26px;
        }
        .pulse-ring {
          animation: pulse-ring 3s ease infinite;
        }

        .header-text { flex: 1; }

        .heading {
          font-family: 'Syne', sans-serif;
          font-size: 22px; font-weight: 700;
          color: var(--text); margin: 0 0 3px;
          letter-spacing: -0.3px;
          text-align: center;
        }

        .subheading {
          font-size: 13px; color: var(--muted);
          margin: 0; font-weight: 300;
          text-align: center;
        }

        .divider {
          height: 0.5px;
          background: var(--border);
          margin: 22px 28px 0;
        }

        .card-body { padding: 20px 28px 28px; }

        .bio {
          font-size: 13px; line-height: 1.75;
          color: var(--muted); margin: 0 0 22px; font-weight: 300;
          text-align: center;
        }

        .socials {
          display: flex; flex-direction: column; gap: 8px;
        }

        .social-link {
          position: relative;
          display: flex; align-items: center; gap: 14px;
          padding: 12px 14px; border-radius: 12px;
          background: var(--bg3);
          border: 0.5px solid var(--border);
          text-decoration: none; overflow: hidden;
          transition:
            background  0.22s ease,
            border-color 0.22s ease,
            box-shadow  0.22s ease;
        }

        .social-link:hover,
        .social-link.active {
          border-color: var(--accent);
          box-shadow: 0 0 20px var(--glow);
        }

        .accent-bar {
          position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 3px; border-radius: 0 2px 2px 0;
          background: var(--accent); opacity: 0;
          transition: opacity 0.22s ease;
        }
        .social-link:hover .accent-bar,
        .social-link.active .accent-bar { opacity: 1; }

        .icon-wrap {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--bg3);
          border: 0.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 17px; color: var(--muted);
          transition: color 0.22s ease, background 0.22s ease;
        }
        .social-link:hover .icon-wrap,
        .social-link.active .icon-wrap {
          color: var(--accent);
        }

        .social-info {
          flex: 1; display: flex; flex-direction: column; gap: 2px;
          min-width: 0;
        }
        .social-label {
          font-size: 13px; font-weight: 500;
          color: var(--text); letter-spacing: 0.1px;
        }
        .social-desc {
          font-size: 12px; color: var(--muted); font-weight: 300;
          transition: color 0.22s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .social-link:hover .social-desc { color: var(--text); }

        .arrow {
          width: 15px; height: 15px; flex-shrink: 0;
          color: var(--muted);
          transition: color 0.22s ease, transform 0.22s ease;
        }
        .social-link:hover .arrow,
        .social-link.active .arrow {
          color: var(--accent);
          transform: translateX(3px);
        }

        .card-footer {
          border-top: 0.5px solid var(--border);
          padding: 14px 28px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .availability-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
          flex-shrink: 0;
        }
        .footer-text {
          font-size: 12px; color: var(--muted);
          font-weight: 300; letter-spacing: 0.2px;
        }

        /* ── Mobile fixes ── */
        @media (max-width: 480px) {
          .contact-root {
            padding: 30px 12px;
          }

          .contact-card {
            border-radius: 16px;
          }

          .card-header {
            padding: 20px 16px 0;
            gap: 8px;
          }

          .logo-wrap {
            width: 88px; height: 88px;
          }
          .logo-svg { width: 88px; height: 88px; }

          .heading {
            font-size: 18px;
          }

          .subheading {
            font-size: 12px;
          }

          .divider {
            margin: 16px 16px 0;
          }

          .card-body {
            padding: 16px 16px 20px;
          }

          .bio {
            font-size: 12px;
            margin: 0 0 16px;
          }

          .social-link {
            padding: 10px 12px;
            gap: 10px;
          }

          .icon-wrap {
            width: 32px; height: 32px;
            font-size: 15px;
          }

          .social-label {
            font-size: 12px;
          }

          .social-desc {
            font-size: 11px;
          }

          .arrow {
            width: 13px; height: 13px;
          }

          .card-footer {
            padding: 12px 16px;
          }

          .footer-text {
            font-size: 11px;
          }
        }
      `}</style>
    </motion.section>
  );
}