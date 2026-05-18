export default function CertificateCard({ title, issuer, date, imageSrc, link }) {
  return (
    <a className="card" href={link || '#'} target={link ? '_blank' : undefined} rel={link ? 'noreferrer' : undefined}>
      <img className="certificate-media" src={imageSrc} alt={`${title} certificate`} />
      <h3>{title}</h3>
      <p style={{color:'var(--muted)'}}>{issuer} • {date}</p>
    </a>
  );
}
