import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { About } from './components/sections/About.jsx';
import { Contact } from './components/sections/Contact.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { Skills } from './components/sections/Skills.jsx';
import { AIAgent } from './features/assistant/AIAgent.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

export default function App() {
  useScrollReveal();

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <AIAgent />
    </main>
  );
}
