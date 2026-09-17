import { useState } from "react";

const TECH_LOGOS = {
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind.CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Arduino": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
};
const TECH_EMOJIS = {
  "IC": "",
  "Breadboard": "🧩",
  "MB-102": "",
  "PCB": "",
  "Wirings": "",
  "18V Transformer": "",
  "PS case": "",
};

function ProjectCard({ title, description, tech = [], imageSrc, videoSrc, repo, demo, tag, onImageClick }) {
  return (
    <div className="proj-card">
      <div
        className="proj-media-wrap"
        onClick={() => !videoSrc && onImageClick(imageSrc, title)}
      >
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
            <span key={t} className="proj-pill">
              {TECH_LOGOS[t] && (
                <img src={TECH_LOGOS[t]} alt={t} className="proj-pill-logo" />
              )}
              {!TECH_LOGOS[t] && TECH_EMOJIS[t] && (
                <span className="proj-pill-emoji">{TECH_EMOJIS[t]}</span>
              )}
              {t}
            </span>
          ))}
        </div>
        <div className="proj-links">
          {repo && (
            <a className="proj-btn-ghost" href={repo} target="_blank" rel="noreferrer">
               Visit
            </a>
          )}
          {demo && (
            <a className="proj-btn-primary" href={demo} target="_blank" rel="noreferrer">
               Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


const SOFTWARE = [
  {
    title: "Portfolio Website",
    description:
      "A clean, responsive personal portfolio built with React. Features smooth animations, dark theme, and a fully custom CSS design.",
    tech: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"],
    imageSrc: "/imgs/my-portfolio.jpg", 
    repo: "https://my-portfolio-2026-cemenbakin-yuriii.vercel.app/",
    tag: "Web",
  },
  {
    title: "Baguio-Tourist-System",
    description:
      "We built this website together with my collaborator to help users easily explore tourist spots in Baguio. It features an AI chatbot system that provides quick suggestions, travel information, and guidance. The platform makes discovering attractions simple, interactive, and convenient, giving users a smooth and enjoyable experience when planning their visit.",
    tech: ["React.js", "Tailwind.CSS", "JavaScript", "Node.js", "PostgreSQL"],
    imageSrc: "/imgs/logos.png", 
    repo: "https://baguio-tourist-system.vercel.app/",
    tag: "Fullstack",
  },
    {
    title: "To do List",
    description:
      "I created simple to do list website for my self, To monitor my tasks in home and schools.",
    tech: ["React.js", "JavaScript"],
    imageSrc: "/imgs/todolist.jpg", 
    repo: "https://todo-list-tawny-theta.vercel.app/",
    tag: "Web",
  },
];

const HARDWARE = [
  {
    title: "Hand Gestures OpenCv and Mediapipe",
    description:
      "I made simple project which hand gestures using arduino, Python, C++.",
    tech: ["C++", "Python", "Arduino", "Breadboard"],
    imageSrc: "/imgs/HAND.jpg", 
    tag: "Arduino",
  },
  {
    title: "Vendo Machine using IC-based",
    description:
      "We built a vending machine prototype using an IC on a breadboard with an MB102 power supply",
    tech: ["IC", "Breadboard", "MB-102"],
    imageSrc: "/imgs/IC.jpg", 
    tag: "IC",
  },
  {
    title: "PCB Power Supply",
    description:
      "I designed a PCB power supply system with an enclosed casing for protection and stability. The circuit was carefully laid out to ensure proper voltage regulation and safe current flow. The casing provided durability and organization, making the design more practical, reliable, and ready for real world electronic applications and testing.",
    tech: ["PCB", "Wirings", "18V Transformer", "PS case"],
    imageSrc: "/imgs/PS.jpg", 
    tag: "PCB",
  },
  
];

export default function Projects() {
  const [active, setActive] = useState("software");
  const [lightbox, setLightbox] = useState(null); 

  const projects = active === "software" ? SOFTWARE : HARDWARE;

  const handleImageClick = (src, title) => {
    setLightbox({
      src: src || "https://via.placeholder.com/600x340/0d0d1a/7c6cfa?text=Project+Image",
      title,
    });
  };

  return (
    <>
      <section className="projects-wrap">

        <div className="projects-header">
          <div className="projects-eyebrow">my work</div>
          <h2 className="projects-title">Projects</h2>
        </div>

        <div className="tabs-wrap">
          <button
            className={`tab-btn ${active === "software" ? "tab-active" : ""}`}
            onClick={() => setActive("software")}
          >
            Software
          </button>
          <button
            className={`tab-btn ${active === "hardware" ? "tab-active" : ""}`}
            onClick={() => setActive("hardware")}
          >
            Hardware
          </button>
        </div>

        <div className="proj-count">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </div>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <div key={p.title} style={{ animationDelay: `${i * 0.08}s` }}>
              <ProjectCard {...p} onImageClick={handleImageClick} />
            </div>
          ))}
        </div>

      </section>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            className="lightbox-img"
            src={lightbox.src}
            alt={lightbox.title}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .projects-wrap {
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px;
          animation: fadeSlideUp 0.5s ease both;
        }
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

        .proj-count {
          font-size: 12px;
          color: var(--muted, #8885a8);
          margin-bottom: 24px;
          letter-spacing: 0.04em;
        }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
        }

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

        .proj-media-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0a0a14;
          cursor: pointer;
        }
        .proj-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .proj-card:hover .proj-media { transform: scale(1.05); }

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
          color: var(--text, #fafafa);
          margin: 0;
        }
        .proj-desc {
          font-size: 13px;
          color: var(--muted, #8885a8);
          line-height: 1.65;
          margin: 0;
          flex: 1;
        }


        .proj-tech { display: flex; flex-wrap: wrap; gap: 6px; }
        
        .proj-pill {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 100px;
          background: rgba(124,108,250,0.1);
          border: 1px solid rgba(124,108,250,0.2);
          color: #a89ef5;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .proj-pill-logo {
          width: 12px;
          height: 12px;
          object-fit: contain;
          display: block;
        }
          .proj-pill-emoji {
          font-size: 12px;
          line-height: 1;
        }

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
          color: var(--muted, #fcfcfc);
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

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 40px;
          animation: fadeSlideUp 0.25s ease both;
        }
        .lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          object-fit: contain;
        }
        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 32px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lightbox-close:hover { background: rgba(255,255,255,0.2); }


        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .proj-grid { grid-template-columns: 1fr; }
          .tabs-wrap { width: 100%; }
          .tab-btn { flex: 1; text-align: center; }
        }
      `}</style>
    </>
  );
}