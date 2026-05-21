import { ArrowUpRight, GitBranch, Mail } from 'lucide-react';
import { profile } from '../../data/portfolio.js';

const emailSubject = encodeURIComponent('Project Inquiry for Joshua Barcoma');
const emailBody = encodeURIComponent(
  'Hi Joshua,\n\nI saw your portfolio and I would like to ask about your systems.\n\n',
);
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${emailSubject}&body=${emailBody}`;

export function Contact() {
  return (
    <section className="contact" id="contact" data-reveal>
      <div>
        <span className="eyebrow">Contact</span>
        <h2>Available for project discussions and opportunities.</h2>
        <p>
          Reach out for software development work, academic system reviews, or collaboration on
          practical web applications.
        </p>
      </div>
      <div className="contact-actions">
        <a className="button primary" href={gmailComposeUrl} target="_blank" rel="noreferrer">
          <Mail size={18} /> Email Joshua
        </a>
        <a className="button secondary" href={profile.github} target="_blank" rel="noreferrer">
          <GitBranch size={18} /> GitHub <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
