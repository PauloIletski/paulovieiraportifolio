import type { PortfolioItemStatus } from "@/app/types/adminPortfolioTypes";
import type {
  SiteContentItemPayload,
  SiteContentSection,
  SiteContentType,
} from "@/app/types/adminSiteContentTypes";

export const siteSections: Array<{
  label: string;
  value: SiteContentSection;
  description: string;
}> = [
  {
    label: "Menu",
    value: "menu",
    description: "Links principais e chamadas do cabecalho.",
  },
  {
    label: "Hero",
    value: "hero",
    description: "Destaques, numeros e passos da primeira dobra.",
  },
  {
    label: "Competencias",
    value: "showcase",
    description: "Cards selecionaveis da vitrine de competencias.",
  },
  {
    label: "Habilidades",
    value: "skills",
    description: "Grupos de stack e icones tecnicos.",
  },
  {
    label: "Projetos",
    value: "projects",
    description: "Cases, imagens, badges e tecnologias.",
  },
  {
    label: "Experiencias",
    value: "experiences",
    description: "Historico profissional, empresas e pontos de atuacao.",
  },
  {
    label: "Contato",
    value: "network",
    description: "Links sociais e chamadas de contato.",
  },
  {
    label: "Botoes flutuantes",
    value: "floatingButtons",
    description: "Atalhos fixos para redes e WhatsApp.",
  },
  {
    label: "Rodape",
    value: "footer",
    description: "Links e textos complementares do footer.",
  },
];

export const contentTypes: Array<{ label: string; value: SiteContentType }> = [
  { label: "Link de navegacao", value: "nav_link" },
  { label: "Destaque", value: "highlight" },
  { label: "Indicador", value: "stat" },
  { label: "Passo", value: "step" },
  { label: "Competencia selecionavel", value: "competency" },
  { label: "Grupo de habilidade", value: "skill_group" },
  { label: "Card de projeto", value: "project_card" },
  { label: "Card de experiencia", value: "experience_card" },
  { label: "Link social", value: "social_link" },
  { label: "Link de rodape", value: "footer_link" },
];

export const statuses: Array<{ label: string; value: PortfolioItemStatus }> = [
  { label: "Rascunho", value: "draft" },
  { label: "Publicado", value: "published" },
];

export const initialSiteContentForm: SiteContentItemPayload = {
  title: "",
  slug: "",
  section: "showcase",
  contentType: "competency",
  label: "",
  summary: "",
  description: "",
  href: "",
  imageUrl: "",
  imagePublicId: "",
  icon: "",
  tags: [],
  metadata: {},
  status: "draft",
  sortOrder: 0,
  featured: false,
};

export const metadataTemplates: Record<
  SiteContentSection,
  { contentType: SiteContentType; metadata: Record<string, unknown> }
> = {
  menu: {
    contentType: "nav_link",
    metadata: { anchor: "#showcase", desktopOnly: false },
  },
  hero: {
    contentType: "highlight",
    metadata: { group: "highlights", value: "Curriculo interativo" },
  },
  showcase: {
    contentType: "competency",
    metadata: {
      cartId: "1",
      techs: "React · Next.js · TypeScript",
      filter: "Front-end",
      available: true,
      icon: "frontend",
    },
  },
  skills: {
    contentType: "skill_group",
    metadata: {
      stacks: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
      ],
    },
  },
  projects: {
    contentType: "project_card",
    metadata: {
      badge: "Aplicacao web",
      stacks: ["Next.js", "Cloudinary", "Vercel"],
    },
  },
  experiences: {
    contentType: "experience_card",
    metadata: {
      companyLink: "https://empresa.com",
      role: "Desenvolvedor Full Stack",
      duration: "Jan 2026 - Atual",
      points: ["Descreva uma entrega relevante."],
      whiteLogo: false,
    },
  },
  network: {
    contentType: "social_link",
    metadata: { label: "Contato profissional", floating: false },
  },
  floatingButtons: {
    contentType: "social_link",
    metadata: { label: "Atalho flutuante", floating: true },
  },
  footer: {
    contentType: "footer_link",
    metadata: { group: "curriculo" },
  },
};

export function getSectionLabel(section: SiteContentSection) {
  return siteSections.find((item) => item.value === section)?.label || section;
}

export function formatMetadata(metadata: Record<string, unknown>) {
  return JSON.stringify(metadata, null, 2);
}
