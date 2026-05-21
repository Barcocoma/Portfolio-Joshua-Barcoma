import { profile } from '../../data/portfolio.js';

const links = [
  { href: '#projects', label: 'Systems' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={`${profile.name} home`}>
        <span>JB</span>
      </a>
      <nav aria-label="Main navigation">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
