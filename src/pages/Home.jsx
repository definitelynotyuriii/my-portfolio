import { useState } from "react";
import { Link } from "react-router-dom";

const projectImage = "https://via.placeholder.com/400x250";
const projectVideo = "";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("Please enter a valid email.");
      return;
    }

    setStatus("Message ready! (backend not connected yet)");
  };

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

        {/* ✅ SEND MESSAGE FORM (NEW) */}
        <section className="contact-mini">
          <h2>Send a Message</h2>

          <form className="form-card" onSubmit={onSubmit}>
            <div className="form-grid">
              <div>
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={onChange}
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="delacruztristan02@gmail.com"
                  value={form.email}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="msg-box">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={onChange}
              />
            </div>

            <div className="form-bottom">
              <button type="submit">Send Message</button>
              <span className="status">{status}</span>
            </div>
          </form>
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

        /* HERO CARD */
        .hero-card {
          background: rgba(26, 26, 36, 0.85);
          padding: 24px;
          border-radius: 20px;
          width: 300px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hero-card img {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #6c63ff;
        }

        .mini-info {
          font-size: 13px;
          color: #aaa;
          margin-top: 10px;
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
        }

        /* FORM */
        .contact-mini {
          margin-top: 80px;
        }

        .contact-mini h2 {
          font-size: 28px;
          margin-bottom: 15px;
        }

        .form-card {
          background: rgba(26, 26, 36, 0.85);
          padding: 20px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          max-width: 700px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        label {
          font-size: 13px;
          color: #aaa;
          display: block;
          margin-bottom: 5px;
        }

        input, textarea {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #333;
          background: #12121a;
          color: #fff;
        }

        .msg-box {
          margin-top: 12px;
        }

        .form-bottom {
          display: flex;
          gap: 12px;
          margin-top: 12px;
          align-items: center;
        }

        button {
          background: #6c63ff;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        .status {
          font-size: 13px;
          color: #aaa;
        }

        @media (max-width: 900px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}