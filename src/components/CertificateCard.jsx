export default function CertificateCard({ title, issuer, date, imageSrc, link }) {
  return (
    <div>
      <a className="card" href={link || "#"}>
        <div className="card-img-wrap">
          <img className="certificate-media" src={imageSrc} alt={title} />
        </div>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-meta">{issuer} • {date}</p>
        </div>
      </a>
      <style>{`
        .card {
          display: block;
          text-decoration: none;
          background: rgba(13,13,26,0.92);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          color: #f0eeff;
        }
        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(124,108,250,0.45);
          box-shadow: 0 8px 30px rgba(124,108,250,0.15);
        }
        .card-img-wrap {
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #0d0d1a;
        }
        .certificate-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .card:hover .certificate-media {
          transform: scale(1.05);
        }
        .card-body {
          padding: 16px 18px;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #f1f5f9;
        }
        .card-meta {
          font-size: 12px;
          color: #8885a8;
        }
      `}</style>
    </div>
  );
}