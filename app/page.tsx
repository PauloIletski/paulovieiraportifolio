import { Contact } from "./components/Contact/Contact";
import { Experiences } from "./components/Experiences/Experiences";
import { FloatButtons } from "./components/FloatButtons/FloatButtons";
import { Footer } from "./components/Footer/Footer";
import { Projects } from "./components/Projects/Projects";
import { SkillsHero } from "./components/SkillsHero/SkillsHero";
import { Social } from "./components/Social/Social";
import { WelcomeHero } from "./components/WelcomeHero/WelcomeHero";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paulo Vieira",
    jobTitle: "Desenvolvedor Full Stack",
    url: "https://paulovieira.dev",
    sameAs: [
      "https://www.linkedin.com/in/pauloiletski/",
      "https://github.com/PauloIletski/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main>
        <WelcomeHero />
        <SkillsHero />
        <Projects />
        <Experiences />
        <Contact />
        <Social />
      </main>
      <Footer />
      <FloatButtons />
    </>
  );
}
