import { BookOpen, Code2, MonitorSmartphone } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle.jsx';

const cards = [
  {
    icon: Code2,
    title: 'System Developer Mindset',
    body: 'Focused on practical systems with login flows, CRUD operations, dashboards, and reports.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive Interface Work',
    body: 'Designs pages that work cleanly on desktop and mobile screens for real users.',
  },
  {
    icon: BookOpen,
    title: 'Project Profile Ready',
    body: 'Structured to help you add repositories, demos, screenshots, and project documentation.',
  },
];

export function About() {
  return (
    <section className="section about" data-reveal>
      <SectionTitle
        eyebrow="About"
        title="A focused profile for practical software projects."
        copy="This profile presents academic, capstone, and personal applications with clear project details, skills, and contact information."
      />
      <div className="about-grid">
        {cards.map(({ icon: Icon, title, body }) => (
          <article className="info-card" key={title} data-reveal>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
