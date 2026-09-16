import { useState, useEffect, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Projects from "./pages/Projects.jsx";
import Certificates from "./pages/Certificates.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import { FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { ActivityCalendar } from "react-activity-calendar";
import { createPortal } from "react-dom";

const githubCalendarTheme = {
  light: ["#ececf6", "#d9d4f5", "#b3a8ec", "#8c7ce3", "#7c6cfa"],
  dark: ["#161626", "#2d2a5c", "#4d47a3", "#7c6cfa", "#a89ef5"],
};

function IntroScreen({ onEnter }) {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.4 + Math.random() * 1.2,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.05 + Math.random() * 0.25,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,200,${p.opacity})`;
        ctx.fill();
        p.y += p.speed;
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      onClick={onEnter}
      style={{
        position: "fixed", inset: 0,
        background: "#080808",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer", zIndex: 9999,
        overflow: "hidden", fontFamily: "'Syne', sans-serif",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        pointerEvents: "none",
        animation: "scanSweep 4s linear infinite",
      }} />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
      }} />

      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "rgba(255,255,255,0.03)", filter: "blur(80px)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
      }}>
        <p style={{
          fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)", margin: 0,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
        }}>
          Welcome to my 
        </p>

        <div style={{
          width: 160, height: 1, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden",
          opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease 0.5s",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.6))",
            width: loaded ? "100%" : "0%", transition: "width 1.4s ease 0.8s",
          }} />
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(36px, 8vw, 72px)", color: "#ffffff",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
          lineHeight: 1.1, margin: 0,
          textShadow: "0 0 60px rgba(255,255,255,0.08)",
          animation: loaded ? "glitchFlicker 6s infinite 2s" : "none",
        }}>
          PORT<span style={{ color: "rgba(255,255,255,0.35)" }}>FO</span>LIO
        </h1>

        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.6s ease 1.1s, transform 0.6s ease 1.1s",
          letterSpacing: "2px",
        }}>
          Tristan · Software Engineer &amp; Game Developer
        </p>

        <div style={{
          display: "flex", alignItems: "center", gap: 12, width: 280,
          opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease 1.3s",
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onEnter(); }}
          style={{
            marginTop: "4px", padding: "12px 36px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent", color: "rgba(255,255,255,0.55)",
            fontSize: "11px", borderRadius: "2px", cursor: "pointer",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease 1.5s, transform 0.6s ease 1.5s, background 0.2s, color 0.2s, border-color 0.2s",
            letterSpacing: "4px", fontFamily: "'Syne', sans-serif", fontWeight: 600,
            textTransform: "uppercase", position: "relative", overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          Enter →
        </button>
      </div>

      <p style={{
        position: "absolute", bottom: 28,
        fontSize: "10px", color: "rgba(255,255,255,0.12)", letterSpacing: "3px",
        textTransform: "uppercase",
        opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease 2s", margin: 0,
      }}>
        Click anywhere to enter
      </p>

      <style>{`
        @keyframes scanSweep {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glitchFlicker {
          0%, 92%  { opacity: 1; transform: none; }
          93%      { opacity: 0.8; transform: skewX(-6deg) translateX(3px); }
          94%      { opacity: 1; transform: none; }
          95%      { transform: skewX(4deg) translateX(-2px); }
          96%, 100% { transform: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-brand">PORT<span className="brand-dot">FO</span>LIO</div>
        <div className="nav-links">
          <NavLink to="/" end>HOME</NavLink>
          <NavLink to="/projects">PROJECTS</NavLink>
          <NavLink to="/certificates">CERTIFICATES</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.5" />
                <line x1="12" y1="2" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="5.9" y2="5.9" />
                <line x1="18.1" y1="18.1" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.9" y2="18.1" />
                <line x1="18.1" y1="5.9" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });
  const pinchRef = useRef({ dist: 0, scale: 1 });
  const overlayRef = useRef(null);

  const image = images[index];

  const resetZoom = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const goPrev = (e) => { e?.stopPropagation(); resetZoom(); setIndex((i) => (i - 1 + images.length) % images.length); };
  const goNext = (e) => { e?.stopPropagation(); resetZoom(); setIndex((i) => (i + 1) % images.length); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    const interval = setInterval(() => {
      resetZoom();
      setIndex((i) => (i + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const clampScale = (s) => Math.min(Math.max(s, 1), 5);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying((p) => !p);
  };

  const zoomInStep = (e) => {
    e.stopPropagation();
    setScale((s) => clampScale(s + 0.75));
  };

  const fitToScreen = (e) => {
    e.stopPropagation();
    resetZoom();
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      overlayRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleImgClick = (e) => {
    e.stopPropagation();
    if (scale === 1) setScale(2.5);
    else resetZoom();
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const next = clampScale(scale - e.deltaY * 0.0025);
    setScale(next);
    if (next === 1) setPos({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale === 1) return;
    e.preventDefault();
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
  };
  const handleMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
  };
  const handleMouseUp = () => { dragRef.current.dragging = false; };

  const getTouchDist = (touches) => {
    const [a, b] = touches;
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchRef.current.dist = getTouchDist(e.touches);
      pinchRef.current.scale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      dragRef.current = { dragging: true, startX: e.touches[0].clientX, startY: e.touches[0].clientY, origX: pos.x, origY: pos.y };
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const ratio = getTouchDist(e.touches) / pinchRef.current.dist;
      setScale(clampScale(pinchRef.current.scale * ratio));
    } else if (e.touches.length === 1 && dragRef.current.dragging) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
    }
  };
  const handleTouchEnd = () => { dragRef.current.dragging = false; };

    return createPortal(
    <div className="lightbox-overlay" ref={overlayRef} onClick={onClose}>
      <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-counter">{index + 1} / {images.length}</span>

        <div className="lightbox-toolbar">
          <button className="lightbox-tool-btn" onClick={zoomInStep} aria-label="Zoom in" title="Zoom in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {images.length > 1 && (
            <button className="lightbox-tool-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              )}
            </button>
          )}

          <button className="lightbox-tool-btn" onClick={toggleFullscreen} aria-label="Toggle fullscreen" title="Fullscreen">
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>

          <button className="lightbox-tool-btn" onClick={fitToScreen} aria-label="Fit to screen" title="Fit to screen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="18" x2="12" y2="21" />
            </svg>
          </button>

          <button className="lightbox-tool-btn" onClick={onClose} aria-label="Close" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <button className="lightbox-nav lightbox-nav-left" onClick={goPrev} aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <div
        className="lightbox-img-wrap"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={image.src}
          alt={image.caption}
          className="lightbox-img"
          decoding="async"
          onClick={handleImgClick}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            cursor: scale === 1 ? "zoom-in" : "grab",
          }}
          draggable={false}
        />
      </div>

      {images.length > 1 && (
        <button className="lightbox-nav lightbox-nav-right" onClick={goNext} aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <div
              key={img.src + i}
              className={`lightbox-thumb ${i === index ? "lightbox-thumb-active" : ""}`}
              onClick={() => { resetZoom(); setIndex(i); }}
            >
              <img src={img.src} alt={img.caption} />
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
function Home({ theme }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [calendarData, setCalendarData] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [calendarError, setCalendarError] = useState(null);
  const glitchRef = useRef(null);
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    if (!galleryRef.current) return;
    const scrollAmount = 220;
    galleryRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };
  

  const photos = ["/imgs/MY-PICTURE.jpg", "/imgs/YURI.jpeg"];
  const [imgIndex, setImgIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setImgIndex((prev) => (prev + 1) % photos.length);
        setTimeout(() => setIsGlitching(false), 400);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setCalendarData(json.data);
      })
      .catch((err) => setCalendarError(err.message))
      .finally(() => setCalendarLoading(false));
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name || !form.email || !form.message) {
      setStatus({ msg: "Please fill out all fields.", type: "err" });
      return;
    }
    if (!emailRx.test(form.email)) {
      setStatus({ msg: "Please enter a valid email.", type: "err" });
      return;
    }
    setStatus({ msg: "Sending message...", type: "ok" });
    emailjs
      .send("service_tristan", "template_59t258s", {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      }, "9iV7VLjN5HDK-hak4")
      .then(() => {
        setStatus({ msg: "✓ Message sent successfully!", type: "ok" });
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus({ msg: "❌ Failed to send message.", type: "err" });
      });
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const el = glitchRef.current;
    if (!el) return;
    const names = ["Tristan", "Yuri"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % names.length;
      setTimeout(() => {
        el.textContent = names[idx];
        el.setAttribute("data-text", names[idx]);
      }, 2550);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

 const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML",            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS",             logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ReactJS",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind CSS",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Python",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PostreSQL",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "Java",             logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++",              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Arduino",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Game Development", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "VS Code",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Git",              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Github",           logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
      { name: "Vercel",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    ],
  },
];
  const education = [
    {
      done: false,
      school: "University of Baguio",
      degree: "Bachelor of Science in Computer Engineering",
      tags: ["Algorithms", "Logics", "Electronics", "Software&Hardware Engineering", "Calculus"],
      year: "2022 – Present",
    },
    {
      done: true,
      school: "TUAO VOCATIONAL AND TECHNICAL SCHOOL CULUNG ANNEX",
      degree: "ICT — Information Communication and Technology",
      tags: ["Hardware", "Computer System Servicing", "Software"],
      year: "2020 – 2022",
    },
  ];

    const timeline = [
    {
      done: true,
      title: "Consistently Learning & Growing",
      tags: ["Self-Taught Developer"],
      period: "2026 – Present",
    },
    {
      done: true,
      title: "Started Web Development/Game Development Journey",
      tags: ["Started Self-learning"],
      period: "2025",
    },
    {
      done: true,
      title: "Hello World",
      tags: ["Wrote my first line of code in Java and Python"],
      period: "2022",
    },
    {
      done: true,
      title: "Bachelor of Science in Computer Engineering",
      tags: ["University of Baguio"],
      period: "2022",
    },
  ];
      useEffect(() => {
      gallery.forEach((g) => {
        const img = new Image();
        img.src = g.src;
      });
    }, []);

   const gallery = [
    { src: "/imgs/GALLERY1.jpg", caption: "Photo 1" },
    { src: "/imgs/GALLERY2.jpg", caption: "Photo 2" },
    { src: "/imgs/GALLERY3.jpg", caption: "Photo 3" },
    { src: "/imgs/GALLERY4.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY5.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY6.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY7.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY8.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY9.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY10.jpg", caption: "Photo 4" },
    { src: "/imgs/GALLERY11.jpg", caption: "Photo 4" },
  ];
  

  return (
    <div className="home-wrap">
      <section className="hero">
        <div className="profile-card">
          <div className="card-scan-line" />
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
          <div className="avatar-wrap">
            <div className={`glitch-img-wrap ${isGlitching ? "is-glitching" : ""}`}>
              {photos.map((src, i) => (
                <img key={src} src={src} alt={`Tristan photo ${i + 1}`}
                  className={`avatar-img ${imgIndex === i ? "img-active" : ""}`} />
              ))}
              <div className="glitch-layer glitch-r" style={{ backgroundImage: `url(${photos[imgIndex]})` }} />
              <div className="glitch-layer glitch-b" style={{ backgroundImage: `url(${photos[imgIndex]})` }} />
            </div>
            <div className="avatar-ring" />
            <div className="avatar-ring2" />
            <div className="orbit-dot" />
          </div>
          <div className="profile-name">Tristan Dela Cruz</div>
          <div className="profile-role">Computer Engineering Student</div>
          <div className="profile-info">
            <div className="profile-info-row">
              <FaMapMarkerAlt className="location-icon" />
              Baguio City, Philippines
            </div>
          </div>
          <div className="avail-badge">
            <span className="avail-dot" /> Available for freelance
          </div>
        </div>

        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Open to opportunities
          </div>
          <h1 className="hero-name">
            Hi, I'm<br />
            <span className="glitch-wrap">
              <span className="glitch-text" ref={glitchRef} data-text="Tristan">Tristan</span>
            </span>{" "}
            <span className="accent2-text"></span>
          </h1>
          <p className="hero-sub">
             I'm a Computer Engineering student and Junior Full-Stack Developer offering freelance services in website development and UI/UX design. I create modern, responsive, and user-friendly websites and web applications tailored to each client's needs.
          </p>
                  <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("contact-sec")}>✉ Get in touch</button>
            <a href="/MY-CV.pdf" download className="btn-ghost">DOWNLOAD CV</a>
          </div>
        </div>
      </section>

      <ChatWidget />
      <section className="section reveal" id="about-sec">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-label">Skills</span>
          <div className="section-line" />
        </div>
      {skillGroups.map((group) => (
  <div className="skill-group" 
  key={group.title}
  style={{ marginBottom: "16px" }}  
  >
    <h3 
      className="skill-group-title"
      style={{
        fontSize: "14px",
        fontFamily: "'Syne', sans-serif", 
        fontWeight: "700", 
        marginBottom: "14px"
      }}
      >
        {group.title}
      </h3>
    <div className="skills-grid">
      {group.skills.map((s, i) => (
        <div className="skill-pill" key={s.name} style={{ animationDelay: `${i * 0.07}s` }}>
          <img 
          src={s.logo} 
          alt={s.name} className="skill-logo" />
          <span>{s.name}</span>
        </div>
      ))}
    </div>
  </div>
))}
      </section>

      <section className="section reveal" id="github-sec">
        <div className="section-header">
          <span className="section-num">02</span>
          <span className="section-label">GitHub Activity</span>
          <div className="section-line" />
        </div>
        <div className="contact-card github-card">
          {calendarLoading ? (
            <p style={{ color: "var(--muted)", fontSize: 13 }}>Loading contributions...</p>
          ) : calendarError ? (
            <p style={{ color: "var(--muted)", fontSize: 13 }}>
              Couldn't load contributions: {calendarError}
            </p>
          ) : (
            <ActivityCalendar
              data={calendarData}
              theme={githubCalendarTheme}
              colorScheme={theme === "light" ? "light" : "dark"}
              blockSize={11}
              blockMargin={4}
              fontSize={12}
            />
          )}
        </div>
      </section>

      <section className="section reveal" id="edu-sec">
        <div className="section-header">
          <span className="section-num">03</span>
          <span className="section-label">Education</span>
          <div className="section-line" />
        </div>
        <div className="edu-list">
          {education.map((e, i) => (
            <div className="edu-card reveal" key={e.school} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="edu-icon">
                {e.done ? (
                  <div className="edu-checkbox edu-checkbox-filled" />
                ) : (
                  <div className="edu-checkbox" />
                )}
              </div>
              <div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-tags">
                  {e.tags.map((t) => (<span className="edu-tag" key={t}>{t}</span>))}
                </div>
              </div>
              <div className="edu-year">{e.year}</div>
            </div>
          ))}
        </div>
      </section>

            <section className="section reveal" id="timeline-sec">
        <div className="timeline-gallery-grid">
          <div>
            <div className="section-header">
              <span className="section-num">04</span>
              <span className="section-label">Timeline</span>
              <div className="section-line" />
            </div>
            <div className="edu-list">
              {timeline.map((t, i) => (
                <div className="edu-card reveal" key={t.title} style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="edu-icon">
                    {t.done ? (
                      <div className="edu-checkbox edu-checkbox-filled" />
                    ) : (
                      <div className="edu-checkbox" />
                    )}
                  </div>
                  <div>
                    <div className="edu-school">{t.title}</div>
                    <div className="edu-degree">{t.subtitle}</div>
                    {t.tags.length > 0 && (
                      <div className="edu-tags">
                        {t.tags.map((tag) => (<span className="edu-tag" key={tag}>{tag}</span>))}
                      </div>
                    )}
                  </div>
                  <div className="edu-year">{t.period}</div>
                </div>
              ))}
            </div>
          </div>

             <div>
            <div className="section-header">
              <span className="section-num">05</span>
              <span className="section-label">Gallery</span>
              <div className="section-line" />
            </div>
            <div className="gallery-carousel-wrap">
              <button className="gallery-arrow gallery-arrow-left" onClick={() => scrollGallery(-1)} aria-label="Scroll left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

                <div className="gallery-track" ref={galleryRef}>
                {gallery.map((g, i) => (
                  <div className="gallery-item" key={g.src + i} onClick={() => setLightboxImg(i)}>
                    <img src={g.src} alt={g.caption} className="gallery-img" loading="lazy" decoding="async" />
                    <div className="gallery-item-toolbar" onClick={(e) => e.stopPropagation()}>
                      <button className="gallery-tool-btn" onClick={() => setLightboxImg(i)} aria-label="Zoom" title="Zoom">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="7" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </button>
                      <button className="gallery-tool-btn" onClick={() => setLightboxImg(i)} aria-label="Play" title="Play">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="6 4 20 12 6 20 6 4" />
                        </svg>
                      </button>
                      <button className="gallery-tool-btn" onClick={() => setLightboxImg(i)} aria-label="Fullscreen" title="Fullscreen">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </button>
                      <button className="gallery-tool-btn" onClick={() => setLightboxImg(i)} aria-label="View" title="View">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="18" x2="12" y2="21" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="gallery-arrow gallery-arrow-right" onClick={() => scrollGallery(1)} aria-label="Scroll right">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {lightboxImg !== null && (
        <Lightbox images={gallery} startIndex={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}

      <section className="section reveal" id="contact-sec">
        <div className="section-header">
          <span className="section-num">05</span>
          <span className="section-label">Send a Message</span>
          <div className="section-line" />
        </div>
        <div className="contact-card">
          <div className="form-row">
            <div className="field">
              <label>Your name</label>
              <input name="name" placeholder="Juan dela Cruz" value={form.name} onChange={onChange} />
            </div>
            <div className="field">
              <label>Email address</label>
              <input name="email" type="email" placeholder="juan@example.com" value={form.email} onChange={onChange} />
            </div>
          </div>
          <div className="field" style={{ marginTop: 16 }}>
            <label>Message</label>
            <textarea name="message" rows={5} placeholder="Tell me about your project or just say hi..." value={form.message} onChange={onChange} />
          </div>
          <div className="form-foot">
            <button className="btn-primary" onClick={onSubmit}>✉ Send Message</button>
            <span className={`status-msg ${status.type === "ok" ? "status-ok" : "status-err"}`}>{status.msg}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {!entered && <IntroScreen onEnter={() => setEntered(true)} />}

      {entered && (
        <>
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
    <div className="page-layout">
            <main className="container main-content">
              <Routes>
                <Route path="/" element={<Home theme={theme} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --accent: #0015ff;
          --accent2: #fa6c9f;
          --bg: #080810;
          --bg2: #0d0d1a;
          --bg3: #161626;
          --border: rgba(255,255,255,0.07);
          --text: #f0eeff;
          --muted: #8885a8;
          --card: rgba(13,13,26,0.92);
          --navbar-bg: rgba(8,8,16,0.8);
        }

        :root.light {
          --bg: #f6f5fb;
          --bg2: #ffffff;
          --bg3: #ececf6;
          --border: rgba(22,22,42,0.09);
          --text: #5e5b78;
          --muted: #5e5b78;
          --card: rgba(255,255,255,0.88);
          --navbar-bg: rgba(246,245,251,0.85);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .orb1 { width: 600px; height: 600px; background: rgba(124,108,250,0.13); top: -150px; right: -150px; animation: orbFloat 10s ease-in-out infinite alternate; }
        .orb2 { width: 450px; height: 450px; background: rgba(250,108,159,0.08); bottom: 100px; left: -120px; animation: orbFloat 14s ease-in-out infinite alternate-reverse; }
        .orb3 { width: 300px; height: 300px; background: rgba(100,200,255,0.05); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: orbFloat 18s ease-in-out infinite alternate; }
        @keyframes orbFloat { from { transform: translateY(0px); } to { transform: translateY(30px); } }

        .container { width: 100%; max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }

        .navbar { position: sticky; top: 0; z-index: 100; background: var(--navbar-bg); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); transition: background 0.3s, border-color 0.3s; }
        .nav-inner { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; }
        .nav-brand { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; color: var(--text); letter-spacing: -0.5px; }
        .brand-dot { color: var(--accent); }
        .nav-links { display: flex; gap: 24px; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--muted); font-size: 14px; position: relative; transition: color 0.2s; padding: 4px 0; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a::after { content: ""; position: absolute; left: 0; bottom: -2px; width: 0%; height: 1.5px; background: var(--accent); transition: width 0.25s ease; }
        .nav-links a:hover::after { width: 100%; }
        .nav-links a.active { color: var(--accent); }
        .nav-links a.active::after { width: 100%; }

        .theme-toggle { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border); background: var(--bg3); color: var(--text); cursor: pointer; transition: border-color 0.2s, transform 0.3s, background 0.2s; }
        .theme-toggle:hover { border-color: rgba(124,108,250,0.4); transform: translateY(-2px) rotate(15deg); }
        .theme-toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .theme-toggle svg { width: 16px; height: 16px; display: block; }

        .main-content { padding: 60px 24px 100px; }
        .home-wrap { display: flex; flex-direction: column; gap: 0; }

        .hero { display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center; margin-bottom: 96px; animation: fadeSlideUp 0.6s 0.05s ease both; }
        .hero-left { display: flex; flex-direction: column; gap: 22px;  }
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.22); padding: 6px 14px; border-radius: 100px; font-size: 12px; color: #a89ef5; width: fit-content; margin-left: 100px;}
        .hero-tag-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        .hero-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: clamp(30px, 4.5vw, 44px); line-height: 1.0; letter-spacing: 1px; margin-left: 100px; }
        .accent-text { color: var(--accent); }
        .accent2-text { color: var(--accent2); }

        .glitch-wrap { display: inline-block; position: relative; }
        .glitch-text { display: inline-block; color: var(--accent); position: relative; animation: glitchCycle 3s infinite; }
        .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; overflow: hidden; color: var(--accent); }
        .glitch-text::before { left: 2px; text-shadow: -2px 0 #fa6c9f; clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); animation: glitchTop 3s infinite; }
        .glitch-text::after { left: -2px; text-shadow: 2px 0 #00eaff; clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); animation: glitchBot 3s infinite; }
        @keyframes glitchCycle { 0%, 85% { transform: none; opacity: 1; } 86% { transform: skewX(-8deg); opacity: 0.9; } 87% { transform: skewX(6deg) translateX(4px); } 88% { transform: none; } 89% { transform: translateX(-3px) skewX(3deg); } 90% { transform: none; } 91% { opacity: 0; } 92% { opacity: 1; } 93% { transform: skewX(-4deg); } 94%, 100% { transform: none; opacity: 1; } }
        @keyframes glitchTop { 0%, 85% { opacity: 0; transform: none; } 86% { opacity: 1; transform: translateX(-4px); clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%); } 87% { transform: translateX(4px); clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%); } 88%, 91%, 100% { opacity: 0; transform: none; } 89%, 90% { opacity: 1; transform: translateX(-2px); } }
        @keyframes glitchBot { 0%, 85% { opacity: 0; transform: none; } 86% { opacity: 1; transform: translateX(4px); clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%); } 87% { transform: translateX(-4px); clip-path: polygon(0 65%, 100% 65%, 100% 85%, 0 85%); } 88%, 91%, 100% { opacity: 0; transform: none; } 89%, 90% { opacity: 1; transform: translateX(2px); } }

        .hero-sub { font-size: 15px; color: var(--muted); line-height: 1.75; max-width: 800px; margin-left: 100px; }
        .hero-btns { display: flex; gap: 18px; align-items: center; margin-top: 10px; margin-left: 100px;}
        .btn-primary { background: var(--accent); color: white; border: none; padding: 11px 22px; border-radius: 11px; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; margin-top: 18px; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,108,250,0.35); }
        .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); padding: 11px 22px; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: color 0.2s, border-color 0.2s, transform 0.2s; text-decoration: none; display: inline-flex; align-items: center; margin-top: 18px; }
        .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

        .profile-card { width: 400px; flex-shrink: 0; background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 28px 20px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; animation: fadeSlideUp 0.6s 0.15s ease both; position: relative; overflow: hidden; transition: border-color 0.4s, box-shadow 0.4s; }
        .profile-card:hover { border-color: rgba(124,108,250,0.45); box-shadow: 0 0 40px rgba(124,108,250,0.12), 0 0 80px rgba(250,108,159,0.06); }
        .card-scan-line { position: absolute; top: -100%; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(124,108,250,0.6), rgba(0,234,255,0.4), transparent); pointer-events: none; z-index: 2; }
        .profile-card:hover .card-scan-line { animation: scanDown 1.2s ease forwards; }
        @keyframes scanDown { 0% { top: -2px; opacity: 1; } 100% { top: 105%; opacity: 0; } }
        .corner { position: absolute; width: 14px; height: 14px; pointer-events: none; z-index: 3; opacity: 0; transition: opacity 0.3s; }
        .profile-card:hover .corner { opacity: 1; }
        .corner-tl { top: 10px; left: 10px; border-top: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .corner-tr { top: 10px; right: 10px; border-top: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }
        .corner-bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid var(--accent); border-left: 1.5px solid var(--accent); }
        .corner-br { bottom: 10px; right: 10px; border-bottom: 1.5px solid var(--accent); border-right: 1.5px solid var(--accent); }

        .avatar-wrap { position: relative; width: 250px; height: 250px; }
        .avatar-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px dashed rgba(124,108,250,0.35); animation: spin 14s linear infinite; }
        .avatar-ring2 { position: absolute; inset: -16px; border-radius: 50%; border: 1px solid rgba(0,234,255,0); animation: spin 6s linear infinite reverse; transition: border-color 0.4s; }
        .profile-card:hover .avatar-ring2 { border-color: rgba(0,234,255,0.2); }
        .orbit-dot { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); top: -4px; left: calc(50% - 4px); transform-origin: 50% calc(125px + 4px); animation: orbitSpin 4s linear infinite; box-shadow: 0 0 8px var(--accent); opacity: 0; transition: opacity 0.3s; }
        .profile-card:hover .orbit-dot { opacity: 1; }
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .glitch-img-wrap { position: relative; width: 250px; height: 250px; border-radius: 50%; overflow: hidden; border: 3px solid var(--accent); transition: border-color 0.4s; }
        .profile-card:hover .glitch-img-wrap { border-color: #00eaff; filter: drop-shadow(0 0 12px rgba(124,108,250,0.5)); }
        .avatar-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 50%; opacity: 0; transition: opacity 0.05s; }
        .avatar-img.img-active { opacity: 1; }
        .glitch-layer { position: absolute; inset: 0; border-radius: 50%; background-size: cover; background-position: center; opacity: 0; pointer-events: none; }
        .glitch-img-wrap.is-glitching .avatar-img.img-active { animation: imgFlicker 0.65s steps(3) forwards; }
        .glitch-img-wrap.is-glitching .glitch-r { opacity: 1; animation: glitchR 0.65s steps(4) forwards; }
        .glitch-img-wrap.is-glitching .glitch-b { opacity: 1; animation: glitchB 0.65s steps(4) forwards; }
        @keyframes imgFlicker { 0% { opacity: 1; } 15% { opacity: 0.2; } 30% { opacity: 0.9; } 50% { opacity: 0.1; } 65% { opacity: 0.85; } 80% { opacity: 0.15; } 100% { opacity: 1; } }
        @keyframes glitchR { 0% { transform: translateX(-7px) skewX(-4deg); mix-blend-mode: screen; background-color: rgba(250,108,159,0.3); clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); opacity: 0.75; } 25% { transform: translateX(6px); clip-path: polygon(0 50%, 100% 50%, 100% 68%, 0 68%); } 50% { transform: translateX(-4px) skewX(3deg); clip-path: polygon(0 72%, 100% 72%, 100% 88%, 0 88%); } 75% { transform: translateX(3px); clip-path: polygon(0 25%, 100% 25%, 100% 42%, 0 42%); opacity: 0.4; } 100% { transform: translateX(0); opacity: 0; clip-path: none; } }
        @keyframes glitchB { 0% { transform: translateX(7px) skewX(4deg); mix-blend-mode: screen; background-color: rgba(0,234,255,0.25); clip-path: polygon(0 58%, 100% 58%, 100% 78%, 0 78%); opacity: 0.75; } 25% { transform: translateX(-6px); clip-path: polygon(0 18%, 100% 18%, 100% 38%, 0 38%); } 50% { transform: translateX(4px) skewX(-3deg); clip-path: polygon(0 40%, 100% 40%, 100% 58%, 0 58%); } 75% { transform: translateX(-3px); clip-path: polygon(0 78%, 100% 78%, 100% 92%, 0 92%); opacity: 0.35; } 100% { transform: translateX(0); opacity: 0; clip-path: none; } }

        .profile-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; transition: color 0.3s; }
        .profile-card:hover .profile-name { color: #00eaff; }
        .profile-role { font-size: 12px; color: var(--muted); line-height: 1.5; }
        .profile-info { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .profile-info-row { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: var(--muted); padding: 0 4px; }
        .avail-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2); color: #34d399; padding: 4px 12px; border-radius: 100px; }
        .avail-dot { width: 5px; height: 5px; border-radius: 50%; background: #34d399; animation: pulse 2s infinite; }

        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.revealed { opacity: 1; transform: translateY(0); }

        .section { margin-bottom: 72px; }
        .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .section-line { flex: 1; height: 1px; background: var(--border); }
        .section-label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; white-space: nowrap; }
        .section-num { font-size: 11px; color: var(--accent); font-weight: 500; letter-spacing: 0.1em; }

        .skills-grid { display: flex; flex-wrap: wrap; gap: 22px; }
        .skill-pill { background: var(--bg3); border: 1px solid var(--border); padding: 8px 18px; border-radius: 100px; font-size: 13px; color: var(--text); display: flex; align-items: center; gap: 8px; opacity: 0; transform: translateY(16px) scale(0.95); animation: pillPop 0.4s ease forwards; transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: default; }
        @keyframes pillPop { to { opacity: 1; transform: translateY(0) scale(1); } }
        .skill-pill:hover { background: rgba(124,108,250,0.14); border-color: rgba(124,108,250,0.4); transform: translateY(-3px) scale(1.05); box-shadow: 0 6px 20px rgba(124,108,250,0.2); }
        .skill-logo { width: 14px; height: 14px; object-fit: contain; display: block; transition: transform 0.3s; }
        .skill-pill:hover .skill-logo { transform: rotate(10deg) scale(1.2); }

        .edu-list { 
        display: flex; 
        flex-direction: 
        column; gap: 16px; 
        }
        .edu-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px 24px; display: grid; grid-template-columns: 48px 1fr auto; gap: 16px; align-items: start; opacity: 0; transform: translateX(-20px); transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, opacity 0.5s; }
        .edu-card.revealed { opacity: 1; transform: translateX(0); }
        .edu-card:hover { border-color: rgba(124,108,250,0.3); transform: translateX(5px); box-shadow: 0 4px 24px rgba(124,108,250,0.08); }
        .edu-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; }
        .edu-checkbox { width: 20px; height: 20px; border-radius: 5px; border: 2px solid var(--muted); opacity: 0.5; }
        .edu-checkbox-filled { background: #000000; border-color: #000000; opacity: 1; }
        .edu-degree { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
        .edu-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .edu-tag { font-size: 11px; padding: 3px 10px; border-radius: 100px; background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.2); color: #a89ef5; transition: background 0.2s, transform 0.2s; }
        .edu-tag:hover { background: rgba(124,108,250,0.22); transform: scale(1.05); }
        .edu-year { font-size: 12px; color: var(--muted); white-space: nowrap; background: var(--bg3); padding: 4px 10px; border-radius: 6px; height: fit-content; }
        
        .timeline-gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .timeline-gallery-grid > div { min-width: 0; }

        .gallery-carousel-wrap { position: relative; display: flex; align-items: center; gap: 8px; width: 100%; max-width: 100%; }
        .gallery-track { display: flex; gap: 12px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; padding: 4px 2px; flex: 1 1 0%; min-width: 0; }
        .gallery-track::-webkit-scrollbar { display: none; }
        .gallery-item { position: relative; flex: 0 0 140px; min-width: 140px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s; }
        .gallery-item:hover { border-color: rgba(124,108,250,0.3); transform: translateY(-4px); box-shadow: 0 4px 24px rgba(124,108,250,0.08); }
        .gallery-img { width: 100%; height: 160px; object-fit: cover; display: block; }

        .gallery-item-toolbar { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 2px; background: rgba(20,20,20,0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 4px; opacity: 0; transition: opacity 0.2s ease; z-index: 2; }
        .gallery-item:hover .gallery-item-toolbar { opacity: 1; }
        .gallery-tool-btn { width: 24px; height: 24px; border-radius: 5px; border: none; background: transparent; color: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s, color 0.15s; }
        .gallery-tool-btn svg { width: 13px; height: 13px; }
        .gallery-tool-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .gallery-arrow { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border); background: var(--card); color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, transform 0.2s, background 0.2s; }
        .gallery-arrow svg { width: 16px; height: 16px; }
        .gallery-arrow:hover { border-color: rgba(124,108,250,0.4); background: var(--bg3); transform: scale(1.06); }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: lightboxFadeIn 0.2s ease;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          z-index: 10002;
        }

        .lightbox-counter {
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          letter-spacing: 0.05em;
        }
.lightbox-close-mobile {
  position: fixed;
  top: 80px;
  right: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(0,0,0,0.9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999999999;
}

@media (max-width: 480px) {
  .lightbox-close-mobile {
    top: 20px;
    right: 16px;
    width: 38px;
    height: 38px;
  }
}

        .lightbox-toolbar {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(20,20,20,0.9);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 6px;
        }

        .lightbox-tool-btn {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .lightbox-tool-btn svg { width: 17px; height: 17px; }
        .lightbox-tool-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }

        .lightbox-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10002;
          transition: background 0.2s, transform 0.2s;
        }
        .lightbox-nav:hover { background: rgba(255,255,255,0.16); transform: translateY(-50%) scale(1.08); }
        .lightbox-nav svg { width: 20px; height: 20px; }
        .lightbox-nav-left { left: 20px; }
        .lightbox-nav-right { right: 20px; }

        .lightbox-img-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          touch-action: none;
          padding: 90px 90px 130px;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 6px;
          box-shadow: 0 0 60px rgba(0,0,0,0.6);
          animation: lightboxZoomIn 0.25s ease;
          transition: transform 0.05s linear;
          user-select: none;
          -webkit-user-drag: none;
        }

        @keyframes lightboxZoomIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-thumbs {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 18px 24px 24px;
          z-index: 10002;
          overflow-x: auto;
        }

        .lightbox-thumb {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          opacity: 0.45;
          cursor: pointer;
          transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
        }
        .lightbox-thumb:hover { opacity: 0.8; transform: translateY(-2px); }
        .lightbox-thumb-active { opacity: 1; border-color: var(--accent); }
        .lightbox-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .timeline-gallery-grid { grid-template-columns: 1fr; gap: 24px; }

        .contact-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: border-color 0.3s, box-shadow 0.3s; }
        .contact-card:hover { border-color: rgba(124,108,250,0.25); box-shadow: 0 0 30px rgba(124,108,250,0.07); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label { font-size: 12px; color: var(--muted); letter-spacing: 0.03em; }
        .field input, .field textarea { background: var(--bg3); border: 1px solid var(--border); color: var(--text); padding: 11px 14px; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; resize: none; width: 100%; }
        .field input:focus, .field textarea:focus { border-color: rgba(124,108,250,0.5); box-shadow: 0 0 0 3px rgba(124,108,250,0.1); transform: translateY(-1px); }
        .form-foot { display: flex; justify-content: center; align-items: center; gap: 16px; }
        .status-msg { font-size: 13px; color: var(--muted); }
        .status-ok { color: #34d399; }
        .status-err { color: #f87171; }

        .github-card { overflow-x: auto; display: flex; justify-content: center; }
        .github-card :global(.react-activity-calendar__legend-colors) { gap: 4px; }

        footer { text-align: center; padding: 30px; color: var(--muted); font-size: 13px; border-top: 1px solid var(--border); margin-top: 60px; position: relative; z-index: 1; }

        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 800px) {
          .hero { grid-template-columns: 1fr; }
          .profile-card { width: 100%; }
          .form-row { grid-template-columns: 1fr; }
          .edu-card { grid-template-columns: 60px 1fr; }
          .edu-year { grid-column: 2; }
          .nav-inner { flex-direction: column; gap: 12px; }
          .nav-links { flex-wrap: wrap; justify-content: center; gap: 16px; }

          .hero-tag,
          .hero-name,
          .hero-sub,
          .hero-btns {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .hero { grid-template-columns: 1fr; }
          .profile-card { width: 100%; }
          .form-row { grid-template-columns: 1fr; }
          .edu-card { grid-template-columns: 60px 1fr; }
          .edu-year { grid-column: 2; }
          .nav-inner { flex-direction: column; gap: 12px; }
          .nav-links { flex-wrap: wrap; justify-content: center; gap: 16px; }

          .hero-tag,
          .hero-name,
          .hero-sub,
          .hero-btns {
            margin-left: 0;
          }
        }

        .location-icon { color: #DC143C; font-size: 12px; margin-right: 0px; flex-shrink: 0; transform: translateY(-1px); }
      `}</style>
    </>
  );
}