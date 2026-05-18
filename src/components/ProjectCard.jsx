export default function ProjectCard({ title, description, tech = [], imageSrc, videoSrc, repo, demo }) {
  return (
    <div className="card">
      {videoSrc ? (
        <video className="project-media" controls poster={imageSrc}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img className="project-media" src={imageSrc} alt={`${title} preview`} />
      )}
      <h3>{title}</h3>
      <p style={{color:'var(--muted)'}}>{description}</p>
      <div className="badges">
        {tech.map((t) => <span key={t} className="badge">{t}</span>)}
      </div>
      <div style={{display:'flex',gap:10,marginTop:12}}>
        {repo && <a className="ghost" href={repo} target="_blank" rel="noreferrer">GitHub</a>}
        {demo && <a className="button" href={demo} target="_blank" rel="noreferrer">Live Demo</a>}
      </div>
    </div>
  );
}
