import { useState } from "react";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Contact() {
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
      <section className="contact-section">
        <h2>Contact</h2>
        <p className="sub">Let’s build something together</p>

        {/* DIRECT CONTACTS (TOP) */}
        <div className="card info-card">
          <h3>Direct Contacts</h3>
          <p className="muted">You can reach me here:</p>

          <div className="socials">
            <a href="mailto:your.email@example.com">
              <FaEnvelope className="icon email" />
              <span>Email</span>
            </a>

            <a
              href="https://www.tiktok.com/@birkenyri_"
              target="_blank"
              rel="noreferrer"
            >
              <SiTiktok className="icon tiktok" />
              <span>TikTok</span>
            </a>

            <a
              href="https://www.facebook.com/definitelynottrisss"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="icon facebook" />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/smthtrstn_/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="icon instagram" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* FORM (BOTTOM) */}
        <form className="card form-card" onSubmit={onSubmit}>
          <h3>Send a Message</h3>

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
                placeholder="name@example.com"
                value={form.email}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="msg-box">
            <label>Message</label>
            <textarea
              name="message"
              rows="6"
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

      {/* STYLE (UNCHANGED + CLEAN) */}
      <style>{`
        .contact-section {
          padding: 60px 10%;
          max-width: 1100px;
          margin: 0 auto;
          color: #eaeaea;
        }

        h2 {
          font-size: 32px;
          margin-bottom: 5px;
        }

        .sub {
          color: #888;
          margin-bottom: 25px;
        }

        .card {
          background: rgba(26, 26, 36, 0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 22px;
          margin-bottom: 20px;
        }

        .socials {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 10px;
        }

        .socials a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          background: #12121a;
          border: 1px solid #2a2a2a;
          text-decoration: none;
          color: #bbb;
          transition: 0.3s ease;
        }

        .socials a:hover {
          transform: translateX(6px);
          color: #fff;
          background: #1f1f2a;
        }

        .icon {
          font-size: 20px;
        }

        .facebook { color: #1877f2; }
        .instagram { color: #e4405f; }
        .tiktok { color: #00f2ea; }
        .email { color: #6c63ff; }

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

        button {
          background: #6c63ff;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        .form-bottom {
          display: flex;
          gap: 12px;
          margin-top: 15px;
          align-items: center;
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