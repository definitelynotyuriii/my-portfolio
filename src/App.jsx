import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Projects from "./pages/Projects.jsx";
import Certificates from "./pages/Certificates.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { FaMapMarkerAlt } from "react-icons/fa";

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-brand">T<span className="brand-dot">.</span>dev</div>
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

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name || !form.email || !form.message) {
      setStatus({ msg: "Please fill out all fields.", type: "err" });
      return;
    }
    if (!emailRx.test(form.email)) {
      setStatus({ msg: "Please enter a valid email.", type: "err" });
      return;
    }
    setStatus({ msg: "✓ Message ready! (backend not connected yet)", type: "ok" });
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const skills = ["HTML", "CSS", "JavaScript", "Java", "Python", "React", "SQL", "Git", "Game Dev"];

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
            <span className="accent-text">Tristan</span>{" "}
            <span className="accent2-text">Dela Cruz</span>
          </h1>
          <p className="hero-sub">
            Aspiring Software Engineer and Game Developer, focused on continuous learning and improving skills through consistent hard work and practice. Passionate about Designing, efficient code and developing immersive digital experiences. Always exploring new technologies and challenging myself to grow and become better in software and game development.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("contact-sec")}>
              ✉ Get in touch
            </button>
            <button className="btn-ghost">
              ↓ Resume
            </button>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="avatar-wrap">
            <img src="/imgs/TRISTAN.jpeg" alt="Tristan Dela Cruz" />
            <div className="avatar-ring" />
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
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="about-sec">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-label">Skills &amp; Technologies</span>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {skills.map((s) => (
            <span className="skill-pill" key={s}>{s}</span>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="edu-sec">
        <div className="section-header">
          <span className="section-num">02</span>
          <span className="section-label">Education</span>
          <div className="section-line" />
        </div>
        <div className="edu-list">
          {education.map((e) => (
            <div className="edu-card" key={e.school}>
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
      <section className="section" id="contact-sec">
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
      {/* BACKGROUND ORBS — visible site-wide */}
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

      {/* ─── ALL STYLES ─────────────────────────────────────────────────────── */}
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
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .orb1 {
          width: 600px; height: 600px;
          background: rgba(124,108,250,0.13);
          top: -150px; right: -150px;
          animation: orbFloat 10s ease-in-out infinite alternate;
        }
        .orb2 {
          width: 450px; height: 450px;
          background: rgba(250,108,159,0.08);
          bottom: 100px; left: -120px;
          animation: orbFloat 14s ease-in-out infinite alternate-reverse;
        }
        .orb3 {
          width: 300px; height: 300px;
          background: rgba(100,200,255,0.05);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: orbFloat 18s ease-in-out infinite alternate;
        }
        @keyframes orbFloat {
          from { transform: translateY(0px); }
          to   { transform: translateY(30px); }
        }

        /* ── CONTAINER ──────────────────────────────────────────── */
        .container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── NAVBAR ─────────────────────────────────────────────── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(8,8,16,0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
        }
        .nav-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--text);
          letter-spacing: -0.5px;
        }
        .brand-dot { color: var(--accent); }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a {
          text-decoration: none;
          color: var(--muted);
          font-size: 14px;
          position: relative;
          transition: color 0.2s;
          padding: 4px 0;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-links a::after {
          content: "";
          position: absolute;
          left: 0; bottom: -2px;
          width: 0%; height: 1.5px;
          background: var(--accent);
          transition: width 0.25s ease;
        }
        .nav-links a:hover::after { width: 100%; }
        .nav-links a.active { color: var(--accent); }
        .nav-links a.active::after { width: 100%; }

        /* ── MAIN ───────────────────────────────────────────────── */
        .main-content { padding: 60px 24px 100px; }

        /* ── HOME WRAP ──────────────────────────────────────────── */
        .home-wrap { display: flex; flex-direction: column; gap: 0; }

        /* ── HERO ───────────────────────────────────────────────── */
        .hero {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
          margin-bottom: 96px;
          animation: fadeSlideUp 0.6s 0.05s ease both;
        }
        .hero-left { display: flex; flex-direction: column; gap: 22px; }

        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.22);
          padding: 6px 14px; border-radius: 100px; font-size: 12px; color: #a89ef5;
          width: fit-content;
        }
        .hero-tag-dot {
          display: inline-block; width: 6px; height: 6px;
          border-radius: 50%; background: var(--accent);
          animation: pulse 2s infinite;
        }

        /* ── FIXED: name is smaller and tighter ── */
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 4.5vw, 44px);
          line-height: 1.1;
          letter-spacing: -1px;
        }
        .accent-text  { color: var(--accent); }
        .accent2-text { color: var(--accent2); }

        .hero-sub { font-size: 15px; color: var(--muted); line-height: 1.75; max-width: 400px; }

        .hero-btns { display: flex; gap: 12px; }
        .btn-primary {
          background: var(--accent); color: white; border: none;
          padding: 11px 22px; border-radius: 10px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,108,250,0.35); }
        .btn-ghost {
          background: transparent; color: var(--muted);
          border: 1px solid var(--border); padding: 11px 22px;
          border-radius: 10px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

        /* ── PROFILE CARD ───────────────────────────────────────── */
        .profile-card {
          width: 400px; flex-shrink: 0;
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 28px 20px; text-align: center;
          display: flex; flex-direction: column; gap: 14px; align-items: center;
          animation: fadeSlideUp 0.6s 0.15s ease both;
        }

        /* ── FIXED: avatar bigger ── */
        .avatar-wrap { position: relative; width: 250px; height: 250px; }
        .avatar-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          border-radius: 50%; border: 3px solid var(--accent); display: block;
        }
        .avatar-ring {
          position: absolute; inset: -8px; border-radius: 50%;
          border: 1.5px dashed rgba(124,108,250,0.35);
          animation: spin 14s linear infinite;
        }
        .profile-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; }
        .profile-role { font-size: 12px; color: var(--muted); line-height: 1.5; }
        .profile-info { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .profile-info-row {
          display: flex;
          align-items: center;
          justify-content: center;  /* ← add this line */
          gap: 6px;                 /* ← also increase gap so icon and text have breathing room */
          font-size: 12px;
          color: var(--muted);
          padding: 0 4px;
        }
        .avail-badge {
          display: inline-flex; align-items: center; gap: 6px; font-size: 11px;
          background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2);
          color: #34d399; padding: 4px 12px; border-radius: 100px;
        }
        .avail-dot { width: 5px; height: 5px; border-radius: 50%; background: #34d399; animation: pulse 2s infinite; }

        /* ── SECTIONS ───────────────────────────────────────────── */
        .section { margin-bottom: 72px; animation: fadeSlideUp 0.6s 0.2s ease both; }
        .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .section-line { flex: 1; height: 1px; background: var(--border); }
        .section-label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; white-space: nowrap; }
        .section-num { font-size: 11px; color: var(--accent); font-weight: 500; letter-spacing: 0.1em; }

        /* ── SKILLS ─────────────────────────────────────────────── */
        .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-pill {
          background: var(--bg3); border: 1px solid var(--border);
          padding: 8px 18px; border-radius: 100px; font-size: 13px; color: var(--text);
          transition: background 0.2s, border-color 0.2s, transform 0.2s; cursor: default;
        }
        .skill-pill:hover { background: rgba(124,108,250,0.14); border-color: rgba(124,108,250,0.4); transform: translateY(-2px); }

        /* ── EDUCATION ──────────────────────────────────────────── */
        .edu-list { display: flex; flex-direction: column; gap: 16px; }
        .edu-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 16px;
          padding: 20px 24px; display: grid; grid-template-columns: 48px 1fr auto;
          gap: 16px; align-items: start;
          transition: border-color 0.25s, transform 0.25s;
        }
        .edu-card:hover { border-color: rgba(124,108,250,0.3); transform: translateX(5px); }
        .edu-icon {
          width: 48px; height: 48px; background: rgba(124,108,250,0.1);
          border: 1px solid rgba(124,108,250,0.2); border-radius: 12px;
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }
        .edu-school { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 3px; }
        .edu-degree { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
        .edu-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .edu-tag {
          font-size: 11px; padding: 3px 10px; border-radius: 100px;
          background: rgba(124,108,250,0.1); border: 1px solid rgba(124,108,250,0.2); color: #a89ef5;
        }
        .edu-year {
          font-size: 12px; color: var(--muted); white-space: nowrap;
          background: var(--bg3); padding: 4px 10px; border-radius: 6px; height: fit-content;
        }

        /* ── CONTACT FORM ───────────────────────────────────────── */
        .contact-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 32px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label { font-size: 12px; color: var(--muted); letter-spacing: 0.03em; }
        .field input, .field textarea {
          background: var(--bg3); border: 1px solid var(--border);
          color: var(--text); padding: 11px 14px; border-radius: 10px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          resize: none; width: 100%;
        }
        .field input:focus, .field textarea:focus {
          border-color: rgba(124,108,250,0.5);
          box-shadow: 0 0 0 3px rgba(124,108,250,0.1);
        }
        .form-foot { display: flex; align-items: center; gap: 16px; margin-top: 16px; }
        .status-msg { font-size: 13px; color: var(--muted); }
        .status-ok  { color: #34d399; }
        .status-err { color: #f87171; }

        /* ── FOOTER ─────────────────────────────────────────────── */
        footer {
          text-align: center;
          padding: 30px;
          color: var(--muted);
          font-size: 13px;
          border-top: 1px solid var(--border);
          margin-top: 60px;
          position: relative;
          z-index: 1;
        }

        /* ── ANIMATIONS ─────────────────────────────────────────── */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes spin   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

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

       .location-icon {
          color: #DC143C;
          font-size: 12px;
          margin-right: 0px;
        }

        flex-shrink: 0;
        transform: translateY(-1px);
}
      `}</style>
    </>
  );
}
