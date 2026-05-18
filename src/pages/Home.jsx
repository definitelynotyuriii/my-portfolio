import { Link } from "react-router-dom";

const projectImage = "https://via.placeholder.com/400x250";
const projectVideo = "";

export default function Home() {
  return (
    <>
      <div className="home">
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <h1 className="fade-in">
              Hi, I’m <span>Tristan / Yurii</span>
            </h1>

            <p className="lead fade-in delay-1">
              Aspiring Software Engineer / Game Developer
            </p>

            <div className="btn-group fade-in delay-3">
              <Link to="/projects" className="btn primary">
                View Projects
              </Link>
              <Link to="/contact" className="btn ghost">
                Contact Me
              </Link>
            </div>
          </div>

          {/* CARD */}
          <div className="hero-card fade-in delay-2">
            <img src="/imgs/TRISTAN.jpeg" alt="Profile" />

            {projectVideo && (
              <video src={projectVideo} controls poster={projectImage} />
            )}

            <div className="mini-info">
              <p>📍 Philippines</p>
              <p>🎓 Computer Engineering Student</p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about fade-in delay-3">
          <h2>About Me</h2>
          <p className="sub">Technologies I’m currently learning</p>

          <div className="badges">
            {["HTML", "CSS", "JavaScript", "Java", "Python", "React", "SQL"].map(
              (s) => (
                <span className="badge" key={s}>
                  {s}
                </span>
              )
            )}
          </div>
        </section>
      </div>

      {/* CSS */}
      <style>{`
        .home {
          font-family: system-ui, sans-serif;
          color: #eaeaea;
          background: #0f0f14;
          min-height: 100vh;
          padding: 40px 10%;
        }

        /* HERO */
        .hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
          margin-bottom: 80px;
        }

        .hero-text {
          flex: 1;
          min-width: 300px;
        }

        .hero-text h1 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .hero-text h1 span {
          color: #6c63ff;
        }

        .lead {
          font-size: 18px;
          color: #aaa;
        }

        .desc {
          margin-top: 10px;
          line-height: 1.6;
          color: #bbb;
        }

        /* BUTTONS */
        .btn-group {
          margin-top: 20px;
          display: flex;
          gap: 12px;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 8px;
          text-decoration: none;
          transition: 0.3s ease;
          font-weight: 500;
        }

        .btn.primary {
          background: #6c63ff;
          color: white;
        }

        .btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(108, 99, 255, 0.3);
        }

        .btn.ghost {
          border: 1px solid #444;
          color: #ddd;
        }

        .btn.ghost:hover {
          background: #222;
          transform: translateY(-3px);
        }

        /* HERO CARD (FIXED DESIGN) */
        .hero-card {
          background: rgba(26, 26, 36, 0.85);
          padding: 24px;
          border-radius: 20px;
          width: 300px;
          text-align: center;
          transition: 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .hero-card:hover {
          transform: translateY(-5px);
        }

        .hero-card img {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #6c63ff;
          box-shadow: 0 0 20px rgba(108, 99, 255, 0.4);
          transition: 0.3s ease;
        }

        .hero-card img:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(108, 99, 255, 0.6);
        }

        .hero-card video {
          width: 100%;
          border-radius: 12px;
          object-fit: cover;
        }

        .mini-info {
          margin-top: 8px;
          font-size: 13px;
          color: #aaa;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* ABOUT */
        .about h2 {
          font-size: 28px;
        }

        .sub {
          color: #888;
          margin-bottom: 15px;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .badge {
          background: #1f1f2a;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 13px;
          transition: 0.3s ease;
        }

        .badge:hover {
          background: #6c63ff;
          transform: scale(1.05);
        }

        /* ANIMATION */
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s forwards;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}