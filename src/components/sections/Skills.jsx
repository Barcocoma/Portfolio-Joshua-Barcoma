import { Code2, Database, MonitorSmartphone, Server, ShieldCheck, Wrench } from 'lucide-react';
import { skills } from '../../data/portfolio.js';
import { SectionTitle } from '../ui/SectionTitle.jsx';

const icons = [Code2, Server, Database, MonitorSmartphone, Wrench, ShieldCheck];

export function Skills() {
  return (
    <section className="section skills-section" id="skills" data-reveal>
      <SectionTitle
        eyebrow="Capabilities"
        title="Technical Skills"
        copy="Practical development skills used in real systems, API workflows, and database-driven applications."
      />
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const Icon = icons[index];
          return (
            <article
              className="skill-card"
              key={skill.type}
              data-reveal
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="skill-icon">
                <Icon size={22} />
              </div>
              <h3>{skill.type}</h3>
              <p>{skill.description}</p>
              <div className="skill-tags">
                {skill.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
