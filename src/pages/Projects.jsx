import { useState } from "react";

// ─── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ title, description, tech = [], imageSrc, videoSrc, repo, demo, tag }) {
  return (
    <div className="proj-card">
      <div className="proj-media-wrap">
        {videoSrc ? (
          <video className="proj-media" controls poster={imageSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            className="proj-media"
            src={imageSrc || "https://via.placeholder.com/600x340/0d0d1a/7c6cfa?text=Project+Image"}
            alt={`${title} preview`}
          />
        )}
        {tag && <span className="proj-tag">{tag}</span>}
      </div>

      <div className="proj-body">
        <h3 className="proj-title">{title}</h3>
        <p className="proj-desc">{description}</p>
        <div className="proj-tech">
          {tech.map((t) => (
            <span key={t} className="proj-pill">{t}</span>
          ))}
        </div>
        <div className="proj-links">
          {repo && (
            <a className="proj-btn-ghost" href={repo} target="_blank" rel="noreferrer">
              ↗ GitHub
            </a>
          )}
          {demo && (
            <a className="proj-btn-primary" href={demo} target="_blank" rel="noreferrer">
              ▶ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
// 👇 To change an image: replace the imageSrc value with your own path
//    Example: imageSrc: "/imgs/portfolio.png"
//    To add a video: add videoSrc: "/videos/demo.mp4"

const SOFTWARE = [
  {
    title: "Portfolio Website",
    description:
      "A clean, responsive personal portfolio built with React and Vite. Features smooth animations, dark theme, and a fully custom CSS design system — no UI library used.",
    tech: ["React", "Vite", "CSS", "React Router"],
    imageSrc: "/imgs/projects/portfolio.png", // 👈 replace with your image
    repo: "https://github.com/yourname/portfolio",
    demo: "https://your-portfolio.example.com",
    tag: "Web",
  },
  {
    title: "Task Tracker App",
    description:
      "Full-stack task manager with JWT authentication, CRUD operations, and a MongoDB backend. Users can create, assign, and track tasks with deadlines.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    imageSrc: "/imgs/projects/task-tracker.png", // 👈 replace with your image
    repo: "https://github.com/yourname/task-tracker",
    tag: "Fullstack",
  },
  {
    title: "Game Project",
    description:
      "A 2D game built as part of my Game Development studies. Features sprite animations, collision detection, and a simple level system.",
    tech: ["Python", "Pygame", "OOP"],
    imageSrc: "/imgs/projects/game.png", // 👈 replace with your image
    repo: "https://github.com/yourname/game",
    tag: "Game Dev",
  },
];

const HARDWARE = [
  {
    title: "IoT Sensor Logger",
    description:
      "ESP32-based temperature and humidity logger that sends data to a web dashboard in real time. Built with REST API communication and Chart.js visualization.",
    tech: ["C++", "ESP32", "REST API", "Chart.js"],
    imageSrc: "/imgs/projects/iot-sensor.png", // 👈 replace with your image
    repo: "https://github.com/yourname/iot-logger",
    tag: "IoT",
  },
  {
    title: "Smart Home Controller",
    description:
      "Arduino-based home automation prototype that controls lights and fans via a mobile app. Uses Bluetooth communication and relay modules.",
    tech: ["Arduino", "C++", "Bluetooth", "Relay Module"],
    imageSrc: "/imgs/projects/smart-home.png", // 👈 replace with your image
    tag: "Embedded",
  },
  {
    title: "Line Following Robot",
    description:
      "A simple autonomous robot built for a school competition. Uses IR sensors to detect and follow a black line path on a white surface.",
    tech: ["Arduino", "IR Sensors", "Motor Driver", "C++"],
    imageSrc: "/imgs/projects/robot.png", // 👈 replace with your image
    tag: "Robotics",
  },
];

// ─── PROJECTS PAGE ─────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState("software");

  const projects = active === "software" ? SOFTWARE : HARDWARE;

  return (
    <>
      <section className="projects-wrap">

        {/* HEADER */}
        <div className="projects-header">
          <div className="projects-eyebrow">my work</div>
          <h2 className="projects-title">Projects</h2>
          <p className="projects-sub">
            A collection of software and hardware things I've built — from web apps to embedded systems.
          </p>
        </div>

        {/* TABS */}
        <div className="tabs-wrap">
          <button
            className={`tab-btn ${active === "software" ? "tab-active" : ""}`}
            onClick={() => setActive("software")}
          >
            💻 Software
          </button>
          <button
            className={`tab-btn ${active === "hardware" ? "tab-active" : ""}`}
            onClick={() => setActive("hardware")}
          >
            🔧 Hardware
          </button>
        </div>

        {/* COUNT */}
        <div className="proj-count">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </div>

        {/* GRID */}
        <div className="proj-grid">
          {projects.map((p, i) => (
            <div key={p.title} style={{ animationDelay: `${i * 0.08}s` }}>
              <ProjectCard {...p} />
            </div>
          ))}
        </div>

      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── PAGE ───────────────────────────────────────────────── */
        .projects-wrap {
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px;
          animation: fadeSlideUp 0.5s ease both;
        }

        /* ── HEADER ─────────────────────────────────────────────── */
        .projects-header { margin-bottom: 36px; }
        .projects-eyebrow {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--accent, #7c6cfa);
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .projects-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 5vw, 48px);
          letter-spacing: -1px;
          color: var(--text, #f0eeff);
          margin-bottom: 12px;
          line-height: 1.05;
        }
        .projects-sub {
          font-size: 15px;
          color: var(--muted, #8885a8);
          max-width: 500px;
          line-height: 1.7;
        }

        /* ── TABS ───────────────────────────────────────────────── */
        .tabs-wrap {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
          background: rgba(13,13,26,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 5px;
          width: fit-content;
        }
        .tab-btn {
          background: transparent;
          border: none;
          color: var(--muted, #8885a8);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 26px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tab-btn:hover { color: var(--text, #f0eeff); }
        .tab-active {
          background: var(--accent, #7c6cfa) !important;
          color: white !important;
        }

        /* ── COUNT ──────────────────────────────────────────────── */
        .proj-count {
          font-size: 12px;
          color: var(--muted, #8885a8);
          margin-bottom: 24px;
          letter-spacing: 0.04em;
        }

        /* ── GRID ───────────────────────────────────────────────── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
        }

        /* ── CARD ───────────────────────────────────────────────── */
        .proj-card {
          background: rgba(13,13,26,0.92);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          animation: fadeSlideUp 0.5s ease both;
          height: 100%;
        }
        .proj-card:hover {
          transform: translateY(-6px);
          border-color: rgba(124,108,250,0.35);
          box-shadow: 0 16px 40px rgba(124,108,250,0.1);
        }

        /* ── MEDIA ──────────────────────────────────────────────── */
        .proj-media-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0a0a14;
        }
        .proj-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .proj-card:hover .proj-media { transform: scale(1.05); }

        /* ── TAG ────────────────────────────────────────────────── */
        .proj-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(124,108,250,0.88);
          color: white;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          backdrop-filter: blur(6px);
        }

        /* ── BODY ───────────────────────────────────────────────── */
        .proj-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .proj-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: var(--text, #f0eeff);
          margin: 0;
        }
        .proj-desc {
          font-size: 13px;
          color: var(--muted, #8885a8);
          line-height: 1.65;
          margin: 0;
          flex: 1;
        }

        /* ── TECH PILLS ─────────────────────────────────────────── */
        .proj-tech { display: flex; flex-wrap: wrap; gap: 6px; }
        .proj-pill {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 100px;
          background: rgba(124,108,250,0.1);
          border: 1px solid rgba(124,108,250,0.2);
          color: #a89ef5;
        }

        /* ── LINKS ──────────────────────────────────────────────── */
        .proj-links { display: flex; gap: 8px; margin-top: 4px; }
        .proj-btn-primary {
          background: var(--accent, #7c6cfa);
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .proj-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(124,108,250,0.35);
        }
        .proj-btn-ghost {
          background: transparent;
          color: var(--muted, #8885a8);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .proj-btn-ghost:hover {
          color: var(--text, #f0eeff);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* ── ANIMATION ──────────────────────────────────────────── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ─────────────────────────────────────────── */
        @media (max-width: 600px) {
          .proj-grid { grid-template-columns: 1fr; }
          .tabs-wrap { width: 100%; }
          .tab-btn { flex: 1; text-align: center; }
        }
      `}</style>
    </>
  );
}
