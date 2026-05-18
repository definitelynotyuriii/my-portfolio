import CertificateCard from "../components/CertificateCard.jsx";

const certImg = "https://via.placeholder.com/300x200";

export default function Certificates() {
  const certificates = [
    {
      title: "Intro to React",
      issuer: "FreeCodeCamp",
      date: "2025",
      imageSrc: certImg,
      link: "https://example.com/cert/react",
    },
    {
      title: "Python for Everybody",
      issuer: "Coursera",
      date: "2024",
      imageSrc: certImg,
    },
    {
      title: "Embedded Systems Basics",
      issuer: "Udemy",
      date: "2024",
      imageSrc: certImg,
    },
  ];

  return (
    <>
      <section className="cert-section">
        <h2>Certificates</h2>
        <p className="sub">Selected certifications and coursework</p>

        <div className="cert-grid">
          {certificates.map((c) => (
            <CertificateCard key={c.title} {...c} />
          ))}
        </div>
      </section>

      <style>{`
        .cert-section {
          padding: 60px 10%;
          max-width: 1100px;
          margin: 0 auto;
          color: #eaeaea;
        }

        .cert-section h2 {
          font-size: 32px;
          margin-bottom: 6px;
        }

        .sub {
          color: #888;
          margin-bottom: 25px;
        }

        /* GRID */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
      `}</style>
    </>
  );
}