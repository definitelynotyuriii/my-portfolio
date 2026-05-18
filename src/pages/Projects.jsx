import ProjectCard from '../components/ProjectCard.jsx';
const placeholderImg = "https://via.placeholder.com/400x250";
const placeholderVid = "";
export default function Projects() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'This site: a clean, responsive personal portfolio built with React Router and custom CSS.',
      tech: ['React', 'Vite', 'CSS'],
      imageSrc: placeholderImg,
      repo: '[github.com](https://github.com/yourname/portfolio)',
      demo: '[your-portfolio-demo.example.com](https://your-portfolio-demo.example.com)'
    },
    {
      title: 'IoT Sensor Logger',
      description: 'ESP32-based temperature + humidity logger with a simple web dashboard.',
      tech: ['C++', 'ESP32', 'REST', 'Chart.js'],
      imageSrc: placeholderImg
    },
    {
      title: 'Task Tracker',
      description: 'Full-stack task manager with JWT auth and a MongoDB backend.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      videoSrc: placeholderVid,
      imageSrc: placeholderImg,
      repo: '[github.com](https://github.com/yourname/task-tracker)'
    }
  ];

  return (
    <section className="section">
      <h2>Projects</h2>
      <p className="sub">A few things I’ve built recently</p>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}
