import { useEffect, useRef } from "react";
import CertificateCard from "../components/CertificateCard.jsx";

const certificates = [
  {
    title: "Certificate of Completion",
    issuer: "University of Baguio",
    date: "2023",
    imageSrc: "/imgs/cert.jpg",
  },
  {
    title: "Certificate of Participation",
    issuer: "University of Baguio",
    date: "2025",
    imageSrc: "/imgs/certt.jpg",
  },
  {
    title: "Certificate of Participation",
    issuer: "University of Baguio",
    date: "2022",
    imageSrc: "/imgs/certtt.jpg",
  },
    {
    title: "Cisco Networking Academy",
    issuer: "University of Baguio",
    date: "2022",
    imageSrc: "/imgs/certttt.jpg",
  },
    {
    title: "Java Intermediate",
    issuer: "SOLOLEARN",
    date: "2022",
    imageSrc: "/imgs/certtttt.jpg",
  },
    {
    title: "Computer System Servicing NCII",
    issuer: "Tesda",
    date: "2022",
    imageSrc: "/imgs/tesda.jpg",
  },
  
  
];

export default function Certificates() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    cardsRef.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="cert-section" ref={sectionRef}>

        <div className="cert-header">
          <div className="cert-label">
            <span className="cert-label-line" />
            <span className="cert-label-text">Achievements</span>
            <span className="cert-label-line" />
          </div>
          <h2 className="cert-title">Certificates</h2>
        </div>

        <div className="cert-grid">
          {certificates.map((c, i) => (
            <div
              key={c.title}
              className="cert-card-wrap"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <CertificateCard {...c} />
            </div>
          ))}
        </div>

        <div className="cert-count">
          <span className="cert-count-num">{certificates.length}</span>
          <span className="cert-count-label">Certifications earned</span>
        </div>

      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 40px; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }

        .cert-section {
          padding: 60px 10px;
          max-width: 1000px;
          margin: 0 auto;
          color: #eaeaea;
          font-family: 'DM Sans', sans-serif;
        }

        .cert-header {
          text-align: center;
          margin-bottom: 48px;
          animation: fadeUp 0.6s ease both;
        }

        .cert-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .cert-label-line {
          display: inline-block;
          height: 1px;
          width: 40px;
          background: linear-gradient(90deg, transparent, #7c6cfa);
          animation: lineGrow 0.8s 0.3s ease both;
        }

        .cert-label-line:last-child {
          background: linear-gradient(90deg, #7c6cfa, transparent);
        }

        .cert-label-text {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7c6cfa;
          font-weight: 500;
          animation: fadeIn 0.6s 0.2s ease both;
        }

        .cert-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 800;
          color: #f1f5f9;
          margin: 0 0 10px;
          letter-spacing: -0.5px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .cert-sub {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-weight: 300;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .cert-card-wrap {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .cert-card-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          animation: countUp 0.6s 0.4s ease both;
        }

        .cert-count-num {
          font-family: 'Syne', sans-serif;
          font-size: 40px;
          font-weight: 800;
          color: #7c6cfa;
          line-height: 1;
        }

        .cert-count-label {
          font-size: 12px;
          color: #475569;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 300;
        }
      `}</style>
    </>
  );
}