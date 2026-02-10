import { Contact } from "./components/Contact/Contact";
import { Experiences } from "./components/Experiences/Experiences";
import { Projects } from "./components/Projects/Projects";
import { SkillsHero } from "./components/SkillsHero/SkillsHero";
import { WelcomeHero } from "./components/WelcomeHero/WelcomeHero";

export default function Home() {
  return (
    <>
    <WelcomeHero/>
    <SkillsHero/>
    <Projects/>
    <Experiences/>
    <Contact/>
    </>
  );
}
