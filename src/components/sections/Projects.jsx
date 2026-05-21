import { ArrowUpRight, GitBranch } from 'lucide-react';
import { projects } from '../../data/portfolio.js';
import { SectionTitle } from '../ui/SectionTitle.jsx';

export function Projects() {
  return (
    <section className="section projects-section" id="projects" data-reveal>
      <SectionTitle
        eyebrow="Selected Work"
        title="Systems Profile"
        copy="A concise collection of software projects with highlights, tools, and links."
      />
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className={`project-card ${project.accent}`}
            key={project.title}
            data-reveal
            style={{ '--delay': `${index * 90}ms` }}
          >
            <div className="project-index">0{index + 1}</div>
            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="stack-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              <a href={project.repo}>
                <GitBranch size={17} /> Repository
              </a>
              <a href={project.demo}>
                Demo <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
