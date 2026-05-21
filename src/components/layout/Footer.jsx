import { profile } from '../../data/portfolio.js';

export function Footer() {
  return (
    <footer>
      <span>{profile.name}</span>
      <span>{profile.role} Profile</span>
    </footer>
  );
}
