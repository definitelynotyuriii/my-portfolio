import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Certificates from "./pages/Certificates.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-brand">Tristan</div>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/certificates">Certificates</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
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

      {/* GLOBAL STYLE */}
      <style>{`
        /* BASE */
        body {
          margin: 0;
          font-family: system-ui, sans-serif;
          background: #0f0f14;
          color: #eaeaea;
        }

        .container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* NAVBAR */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 15, 20, 0.75);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
        }

        .nav-brand {
          font-size: 20px;
          font-weight: bold;
          color: #6c63ff;
          letter-spacing: 1px;
          transition: 0.3s ease;
        }

        .nav-brand:hover {
          transform: scale(1.05);
          text-shadow: 0 0 10px rgba(108, 99, 255, 0.6);
        }

        .nav-links {
          display: flex;
          gap: 22px;
        }

        .nav-links a {
          text-decoration: none;
          color: #bbb;
          font-size: 15px;
          position: relative;
          transition: 0.3s ease;
          padding: 6px 0;
        }

        .nav-links a:hover {
          color: #fff;
        }

        /* underline animation */
        .nav-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: #6c63ff;
          transition: 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        /* ACTIVE LINK */
        .nav-links a.active {
          color: #6c63ff;
        }

        .nav-links a.active::after {
          width: 100%;
        }

        /* MAIN */
        .main-content {
          padding: 40px 20px;
        }

        /* FOOTER (basic styling so it matches) */
        footer {
          text-align: center;
          padding: 30px;
          color: #777;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 60px;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .nav-inner {
            flex-direction: column;
            gap: 10px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }
        }
      `}</style>
    </>
  );
}