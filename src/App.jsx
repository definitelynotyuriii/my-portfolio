import { useState, useEffect, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Projects from "./pages/Projects.jsx";
import Certificates from "./pages/Certificates.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-brand">PORT<span className="brand-dot">FO</span>LIO</div>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/certificates">Certificates</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────────────────
function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ msg: "", type: "" });
  const glitchRef = useRef(null);

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
    .send(
      "service_tristan",
      "template_59t258s",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "9iV7VLjN5HDK-hak4"
    )
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

  // Glitch name swap effect
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

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "HTML",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "React",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "SQL",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Game Dev",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
  ];

  const education = [
    {
      icon: "🏛️",
      school: "University of Baguio",
      degree: "Bachelor of Science in Computer Engineering",
      tags: ["Algorithms", "Data Structures", "Electronics", "Software Engineering"],
      year: "2022 – Present",
    },
    {
      icon: "🏫",
      school: "Senior High School",
      degree: "STEM Strand — Science, Technology, Engineering & Mathematics",
      tags: ["Physics", "Calculus", "Research"],
      year: "2020 – 2022",
    },
    {
      icon: "🎓",
      school: "Online Certifications",
      degree: "Self-paced learning — Web Development & Game Development",
      tags: ["React", "Game Design", "UI/UX Basics"],
      year: "Ongoing",
    },
  ];

  return (
    <div className="home-wrap">
      {/* HERO */}
      <section className="hero">
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
            Aspiring Software Engineer and Game Developer, focused on continuous learning and improving skills through consistent hard work and practice. Passionate about Designing, efficient code and developing immersive digital experiences. Always exploring new technologies and challenging myself to grow and become better in software and game development.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("contact-sec")}>
              ✉ Get in touch
            </button>
          <a href="/MY-CV.pdf"
          download
          className="btn-ghost"
          >
          CV
          </a>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="card-scan-line" />
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
          <div className="avatar-wrap">
            <img src="/imgs/TRISTAN.jpeg" alt="Tristan Dela Cruz" />
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
            <span className="avail-dot" /> Available for hire
          </div>
          <div className="stat-chips">
            <div className="stat-chip chip-float-1">
              <span className="stat-num">3+</span>
              <span className="stat-label">Years Learning</span>
            </div>
            <div className="stat-chip chip-float-2">
              <span className="stat-num">9</span>
              <span className="stat-label">Skills</span>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section reveal" id="about-sec">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-label">Skills &amp; Technologies</span>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-pill" key={s.name} style={{ animationDelay: `${i * 0.07}s` }}>
              <img src={s.logo} alt={s.name} className="skill-logo" />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section reveal" id="edu-sec">
        <div className="section-header">
          <span className="section-num">02</span>
          <span className="section-label">Education</span>
          <div className="section-line" />
        </div>
        <div className="edu-list">
          {education.map((e, i) => (
            <div className="edu-card reveal" key={e.school} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="edu-icon">{e.icon}</div>
              <div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-tags">
                  {e.tags.map((t) => (
                    <span className="edu-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="edu-year">{e.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section reveal" id="contact-sec">
        <div className="section-header">
          <span className="section-num">03</span>
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
            <span className={`status-msg ${status.type === "ok" ? "status-ok" : "status-err"}`}>
              {status.msg}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <Navbar />

      <main className="container main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --accent: #7c6cfa;
          --accent2: #fa6c9f;
          --bg: #080810;
          --bg2: #0d0d1a;
          --bg3: #161626;
          --border: rgba(255,255,255,0.07);
          --text: #f0eeff;
          --muted: #8885a8;
          --card: rgba(13,13,26,0.92);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* ── BACKGROUND ─────────────────────────────────────────── */
        .orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .orb1 { width: 600px; height: 600px; background: rgba(124,108,250,0.13); top: -150px; right: -150px; animation: orbFloat 10s ease-in-out infinite alternate; }
        .orb2 { width: 450px; height: 450px; background: rgba(250,108,159,0.08); bottom: 100px; left: -120px; animation: orbFloat 14s ease-in-out infinite alternate-reverse; }
        .orb3 { width: 300px; height: 300px; background: rgba(100,200,255,0.05); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: orbFloat 18s ease-in-out infinite alternate; }
        @keyframes orbFloat { from { transform: translateY(0px); } to { transform: translateY(30px); } }

        /* ── CONTAINER ──────────────────────────────────────────── */
        .container { width: 100%; max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }

        /* ── NAVBAR ─────────────────────────────────────────────── */
        .navbar { position: sticky; top: 0; z-index: 100; background: rgba(8,8,16,0.8); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
        .nav-inner { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; }
        .nav-brand { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; color: var(--text); letter-spacing: -0.5px; }
        .brand-dot { color: var(--accent); }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { text-decoration: none; color: var(--muted); font-size: 14px; position: relative; transition: color 0.2s; padding: 4px 0; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a::after { content: ""; position: absolute; left: 0; bottom: -2px; width: 0%; height: 1.5px; background: var(--accent); transition: width 0.25s ease; }
        .nav-links a:hover::after { width: 100%; }
        .nav-links a.active { color: var(--accent); }
        .nav-links a.active::after { width: 100%; }

        /* ── MAIN ───────────────────────────────────────────────── */
        .main-content { padding: 60px 24px 100px; }
        .home-wrap { display: flex; flex-direction: column; gap: 0; }

        /* ── HERO ───────────────────────────────────────────────── */
        .hero { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; margin-bottom: 96px; animation: fadeSlideUp 0.6s 0.05s ease both; }
        .hero-left { display: flex; flex-direction: column; gap: 22px; }
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.22); padding: 6px 14px; border-radius: 100px; font-size: 12px; color: #a89ef5; width: fit-content; }
        .hero-tag-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        .hero-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: clamp(30px, 4.5vw, 44px); line-height: 1.0; letter-spacing: 1px; }
        .accent-text  { color: var(--accent); }
        .accent2-text { color: var(--accent2); }

        /* ── GLITCH NAME EFFECT ─────────────────────────────────── */
        .glitch-wrap { display: inline-block; position: relative; }
        .glitch-text { display: inline-block; color: var(--accent); position: relative; animation: glitchCycle 3s infinite; }
        .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; overflow: hidden; color: var(--accent); }
        .glitch-text::before { left: 2px; text-shadow: -2px 0 #fa6c9f; clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); animation: glitchTop 3s infinite; }
        .glitch-text::after  { left: -2px; text-shadow: 2px 0 #00eaff; clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); animation: glitchBot 3s infinite; }
        @keyframes glitchCycle {
          0%, 85%   { transform: none; opacity: 1; }
          86%       { transform: skewX(-8deg); opacity: 0.9; }
          87%       { transform: skewX(6deg) translateX(4px); }
          88%       { transform: none; }
          89%       { transform: translateX(-3px) skewX(3deg); }
          90%       { transform: none; }
          91%       { opacity: 0; }
          92%       { opacity: 1; }
          93%       { transform: skewX(-4deg); }
          94%, 100% { transform: none; opacity: 1; }
        }
        @keyframes glitchTop {
          0%, 85%        { opacity: 0; transform: none; }
          86%            { opacity: 1; transform: translateX(-4px); clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%); }
          87%            { transform: translateX(4px); clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%); }
          88%, 91%, 100% { opacity: 0; transform: none; }
          89%, 90%       { opacity: 1; transform: translateX(-2px); }
        }
        @keyframes glitchBot {
          0%, 85%        { opacity: 0; transform: none; }
          86%            { opacity: 1; transform: translateX(4px); clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%); }
          87%            { transform: translateX(-4px); clip-path: polygon(0 65%, 100% 65%, 100% 85%, 0 85%); }
          88%, 91%, 100% { opacity: 0; transform: none; }
          89%, 90%       { opacity: 1; transform: translateX(2px); }
        }

        .hero-sub { font-size: 15px; color: var(--muted); line-height: 1.75; max-width: 400px; }
        .hero-btns { display: flex; gap: 12px; }
        .btn-primary { background: var(--accent); color: white; border: none; padding: 11px 22px; border-radius: 11px; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;   margin-top: 18px; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,108,250,0.35); }
        .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); padding: 11px 22px; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: color 0.2s, border-color 0.2s, transform 0.2s; }
        .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

        /* ── PROFILE CARD ───────────────────────────────────────── */
        .profile-card { width: 400px; flex-shrink: 0; background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 28px 20px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; animation: fadeSlideUp 0.6s 0.15s ease both; position: relative; overflow: hidden; transition: border-color 0.4s, box-shadow 0.4s;  }
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
        .avatar-wrap img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 3px solid var(--accent); display: block; transition: border-color 0.4s, filter 0.4s; }
        .profile-card:hover .avatar-wrap img { border-color: #00eaff; filter: drop-shadow(0 0 12px rgba(124,108,250,0.5)); }
        .avatar-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px dashed rgba(124,108,250,0.35); animation: spin 14s linear infinite; }
        .avatar-ring2 { position: absolute; inset: -16px; border-radius: 50%; border: 1px solid rgba(0,234,255,0); animation: spin 6s linear infinite reverse; transition: border-color 0.4s; }
        .profile-card:hover .avatar-ring2 { border-color: rgba(0,234,255,0.2); }
        .orbit-dot { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); top: -4px; left: calc(50% - 4px); transform-origin: 50% calc(125px + 4px); animation: orbitSpin 4s linear infinite; box-shadow: 0 0 8px var(--accent); opacity: 0; transition: opacity 0.3s; }
        .profile-card:hover .orbit-dot { opacity: 1; }
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .profile-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; transition: color 0.3s; }
        .profile-card:hover .profile-name { color: #00eaff; }
        .profile-role { font-size: 12px; color: var(--muted); line-height: 1.5; }
        .profile-info { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .profile-info-row { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: var(--muted); padding: 0 4px; }
        .avail-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2); color: #34d399; padding: 4px 12px; border-radius: 100px; }
        .avail-dot { width: 5px; height: 5px; border-radius: 50%; background: #34d399; animation: pulse 2s infinite; }
        .stat-chips { display: flex; gap: 10px; justify-content: center; margin-top: 4px; }
        .stat-chip { background: rgba(124,108,250,0.08); border: 1px solid rgba(124,108,250,0.2); border-radius: 12px; padding: 8px 16px; text-align: center; display: flex; flex-direction: column; gap: 2px; transition: transform 0.3s, background 0.3s, border-color 0.3s; }
        .profile-card:hover .stat-chip { background: rgba(124,108,250,0.14); border-color: rgba(124,108,250,0.4); }
        .stat-num { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; color: var(--accent); }
        .stat-label { font-size: 10px; color: var(--muted); }
        .chip-float-1 { animation: chipFloat 3s ease-in-out infinite; }
        .chip-float-2 { animation: chipFloat 3s ease-in-out infinite 0.5s; }
        @keyframes chipFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

        /* ── SCROLL REVEAL ──────────────────────────────────────── */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── SECTIONS ───────────────────────────────────────────── */
        .section { margin-bottom: 72px; }
        .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .section-line { flex: 1; height: 1px; background: var(--border); }
        .section-label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; white-space: nowrap; }
        .section-num { font-size: 11px; color: var(--accent); font-weight: 500; letter-spacing: 0.1em; }

        /* ── SKILLS ─────────────────────────────────────────────── */
        .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-pill {
          background: var(--bg3); border: 1px solid var(--border);
          padding: 8px 18px; border-radius: 100px; font-size: 13px; color: var(--text);
          display: flex; align-items: center; gap: 8px;
          opacity: 0;
          transform: translateY(16px) scale(0.95);
          animation: pillPop 0.4s ease forwards;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        @keyframes pillPop { to { opacity: 1; transform: translateY(0) scale(1); } }
        .skill-pill:hover {
          background: rgba(124,108,250,0.14);
          border-color: rgba(124,108,250,0.4);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 20px rgba(124,108,250,0.2);
        }
        .skill-logo { width: 18px; height: 18px; object-fit: contain; display: block; transition: transform 0.3s; }
        .skill-pill:hover .skill-logo { transform: rotate(10deg) scale(1.2); }

        /* ── EDUCATION ──────────────────────────────────────────── */
        .edu-list { display: flex; flex-direction: column; gap: 16px; }
        .edu-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 16px;
          padding: 20px 24px; display: grid; grid-template-columns: 48px 1fr auto;
          gap: 16px; align-items: start;
          opacity: 0; transform: translateX(-20px);
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, opacity 0.5s;
        }
        .edu-card.revealed { opacity: 1; transform: translateX(0); }
        .edu-card:hover { border-color: rgba(124,108,250,0.3); transform: translateX(5px); box-shadow: 0 4px 24px rgba(124,108,250,0.08); }
        .edu-icon { width: 48px; height: 48px; background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .edu-school { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 3px; }
        .edu-degree { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
        .edu-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .edu-tag { font-size: 11px; padding: 3px 10px; border-radius: 100px; background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.2); color: #a89ef5; transition: background 0.2s, transform 0.2s; }
        .edu-tag:hover { background: rgba(124,108,250,0.22); transform: scale(1.05); }
        .edu-year { font-size: 12px; color: var(--muted); white-space: nowrap; background: var(--bg3); padding: 4px 10px; border-radius: 6px; height: fit-content; }

        /* ── CONTACT FORM ───────────────────────────────────────── */
        .contact-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: border-color 0.3s, box-shadow 0.3s; }
        .contact-card:hover { border-color: rgba(124,108,250,0.25); box-shadow: 0 0 30px rgba(124,108,250,0.07); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label { font-size: 12px; color: var(--muted); letter-spacing: 0.03em; }
        .field input, .field textarea { background: var(--bg3); border: 1px solid var(--border); color: var(--text); padding: 11px 14px; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; resize: none; width: 100%; }
        .field input:focus, .field textarea:focus { border-color: rgba(124,108,250,0.5); box-shadow: 0 0 0 3px rgba(124,108,250,0.1); transform: translateY(-1px); }
        .form-foot {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
        .status-msg { font-size: 13px; color: var(--muted); }
        .status-ok  { color: #34d399; }
        .status-err { color: #f87171; }

        /* ── FOOTER ─────────────────────────────────────────────── */
        footer { text-align: center; padding: 30px; color: var(--muted); font-size: 13px; border-top: 1px solid var(--border); margin-top: 60px; position: relative; z-index: 1; }

        /* ── ANIMATIONS ─────────────────────────────────────────── */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* ── RESPONSIVE ─────────────────────────────────────────── */
        @media (max-width: 800px) {
          .hero { grid-template-columns: 1fr; }
          .profile-card { width: 100%; }
          .form-row { grid-template-columns: 1fr; }
          .edu-card { grid-template-columns: 60px 1fr; }
          .edu-year { grid-column: 2; }
          .nav-inner { flex-direction: column; gap: 12px; }
          .nav-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
        }

        .location-icon { color: #DC143C; font-size: 12px; margin-right: 0px; flex-shrink: 0; transform: translateY(-1px); }
      `}</style>
    </>
  );
}
