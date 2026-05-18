export default function CertificateCard({
  title,
  issuer,
  date,
  imageSrc,
  link,
}) {
  return (
    <>
      <div className="cert-card">
        <img src={imageSrc} alt={title} />

        <div className="cert-info">
          <h3>{title}</h3>
          <p>{issuer}</p>
          <span>{date}</span>

          {link && (
            <a href={link} target="_blank" rel="noreferrer">
              View Certificate
            </a>
          )}
        </div>
      </div>

      <style>{`
        .cert-card {
          background: rgba(26, 26, 36, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }

        .cert-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(108, 99, 255, 0.25);
        }

        .cert-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          transition: 0.3s ease;
        }

        .cert-card:hover img {
          transform: scale(1.05);
        }

        .cert-info {
          padding: 14px;
        }

        .cert-info h3 {
          margin: 0;
          font-size: 16px;
          color: #fff;
        }

        .cert-info p {
          margin: 6px 0;
          font-size: 13px;
          color: #aaa;
        }

        .cert-info span {
          font-size: 12px;
          color: #777;
        }

        .cert-info a {
          display: inline-block;
          margin-top: 10px;
          font-size: 13px;
          color: #6c63ff;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .cert-info a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}