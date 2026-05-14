import type { SiteContentSection } from "@/app/types/adminSiteContentTypes";
import type { ComponentContentFormProps } from "./componentFormTypes";
import { ExperiencesContentForm } from "./ExperiencesContentForm";
import { FloatButtonsContentForm } from "./FloatButtonsContentForm";
import { FooterContentForm } from "./FooterContentForm";
import { MenuContentForm } from "./MenuContentForm";
import { ProductShowcaseContentForm } from "./ProductShowcaseContentForm";
import { ProjectsContentForm } from "./ProjectsContentForm";
import { SkillsHeroContentForm } from "./SkillsHeroContentForm";
import { SocialContentForm } from "./SocialContentForm";
import { WelcomeHeroContentForm } from "./WelcomeHeroContentForm";

type SiteContentFormBySectionProps = ComponentContentFormProps & {
  activeSection: SiteContentSection;
};

export function SiteContentFormBySection({
  activeSection,
  ...props
}: SiteContentFormBySectionProps) {
  if (activeSection === "menu") return <MenuContentForm {...props} />;
  if (activeSection === "hero") return <WelcomeHeroContentForm {...props} />;
  if (activeSection === "showcase") {
    return <ProductShowcaseContentForm {...props} />;
  }
  if (activeSection === "skills") return <SkillsHeroContentForm {...props} />;
  if (activeSection === "projects") return <ProjectsContentForm {...props} />;
  if (activeSection === "experiences") {
    return <ExperiencesContentForm {...props} />;
  }
  if (activeSection === "network") return <SocialContentForm {...props} />;
  if (activeSection === "floatingButtons") {
    return <FloatButtonsContentForm {...props} />;
  }

  return <FooterContentForm {...props} />;
}
