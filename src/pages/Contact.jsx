import { FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <section className="contact-section">
        <h2>Contact</h2>
        <p className="sub">Let’s build something together</p>

        {/* DIRECT CONTACTS */}
        <div className="card info-card">
          <h3>Direct Contacts</h3>
          <p className="muted">You can reach me here:</p>

          <div className="socials">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=delacruztristan02@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope className="icon email" />
              <span>Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/tristan-dela-cruz-268143374/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="icon linkedin" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/definitelynotyuriii"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="icon github" />
              <span>GitHub</span>
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
      </section>

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

        .icon { font-size: 20px; }

        .instagram { color: #e4405f; }
        .email { color: #6c63ff; }
        .github { color: #fff; }
        .linkedin { color: #0a66c2; }
      `}</style>
    </>
  );
}