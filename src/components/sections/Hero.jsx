import { ArrowUpRight, Code2, GitBranch, Layers3, MapPin, Sparkles } from 'lucide-react';
import { profile, stats } from '../../data/portfolio.js';

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-shell">
        <div className="hero-copy hero-animate">
          <span className="eyebrow">
            <Sparkles size={16} /> {profile.role}
          </span>
          <h1>{profile.name}</h1>
          <p>
            {profile.focus} Creating solutions that are functional, well-structured, and ready to
            be presented to employers, clients, and project reviewers.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View Systems <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href={profile.github} target="_blank" rel="noreferrer">
              <GitBranch size={18} /> GitHub Profile
            </a>
          </div>
        </div>

        <div className="hero-visual hero-animate delay-1" aria-label="System preview">
          <div className="visual-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="visual-grid">
            <div className="visual-profile">
              <div className="avatar-large is-missing">
                <img
                  src={profile.photo}
                  alt={`${profile.name} profile`}
                  onLoad={(event) => event.currentTarget.parentElement.classList.remove('is-missing')}
                  onError={(event) => event.currentTarget.parentElement.classList.add('is-missing')}
                />
                <span className="avatar-initials">JB</span>
              </div>
              <h2>Developer Profile</h2>
              <p>Selected systems, skills, and contact details in one professional profile.</p>
            </div>
            <div className="visual-card code-card">
              <span>Profile</span>
              <strong>Professional Work</strong>
              <small>organized project presentation</small>
            </div>
            <div className="visual-card metric-card">
              <strong>Project Ready</strong>
              <small>repository links and system highlights</small>
            </div>
            <div className="visual-list">
              <span>
                <Code2 size={17} /> Web Developer
              </span>
              <span>
                <MapPin size={17} /> {profile.location}
              </span>
              <span>
                <Layers3 size={17} /> Web Systems
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-strip" data-reveal>
        {stats.map((item, index) => (
          <div key={item.label} style={{ '--delay': `${index * 90}ms` }}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
