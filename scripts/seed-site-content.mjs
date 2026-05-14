import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

const shouldWriteSql = process.argv.includes("--write-sql");

function loadEnvFile() {
  if (!fs.existsSync(".env")) return;

  const lines = fs.readFileSync(".env", "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] ||= value;
  }
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function row({
  title,
  section,
  contentType,
  label = "",
  summary = "",
  description = "",
  href = "",
  imageUrl = "",
  icon = "",
  tags = [],
  metadata = {},
  sortOrder = 0,
  featured = false,
}) {
  return {
    title,
    slug: slugify(title),
    section,
    content_type: contentType,
    label: label || null,
    summary: summary || null,
    description: description || null,
    href: href || null,
    image_url: imageUrl || null,
    image_public_id: null,
    icon: icon || null,
    tags,
    metadata,
    status: "published",
    sort_order: sortOrder,
    featured,
  };
}

const menuItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Competências", href: "#showcase" },
  { name: "Projetos", href: "#projects" },
  { name: "Experiencia", href: "#experiences" },
  { name: "Contato", href: "#network" },
];

const heroHighlights = [
  "Currículo interativo",
  "Experiência em e-commerce",
  "Stack full stack",
];

const heroStats = [
  { value: "6+", label: "competências-chave" },
  { value: "3", label: "cases selecionados" },
  { value: "100%", label: "contato direto" },
];

const heroSteps = [
  "Selecione competências relevantes",
  "Revise os tópicos de interesse",
  "Envie a pauta pelo WhatsApp",
];

const products = [
  {
    id: "1",
    name: "Front-end",
    techs: "React · Next.js · TypeScript",
    icon: "frontend",
    available: true,
  },
  {
    id: "2",
    name: "Back-end",
    techs: "Node.js · Express · APIs REST",
    icon: "backend",
    available: true,
  },
  {
    id: "3",
    name: "E-commerce VTEX",
    techs: "VTEX IO · Fast Store · Shopify",
    icon: "ecommerce",
    available: true,
  },
  {
    id: "4",
    name: "Banco de Dados",
    techs: "MySQL · Supabase · SQLite",
    icon: "database",
    available: true,
  },
  {
    id: "5",
    name: "DevOps & Deploy",
    techs: "Docker · Vercel · Git CI/CD",
    icon: "devops",
    available: true,
  },
  {
    id: "6",
    name: "Contrato CLT",
    techs: "Propostas de emprego CLT",
    icon: "clticontrato",
    available: false,
  },
];

const skillGroups = [
  {
    title: "Front-end",
    description:
      "Desenvolvimento de interfaces modernas e responsivas utilizando as melhores práticas de usabilidade e performance.",
    stacks: [
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
    ],
  },
  {
    title: "Back-end",
    description:
      "Construção de APIs, integrações com serviços externos, controle de autenticação e organização por camadas.",
    stacks: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
    ],
  },
  {
    title: "Banco de Dados",
    description:
      "Modelagem simples e objetiva, priorizando consistência e performance.",
    stacks: [
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "Supabase",
        icon: "/assets/supabase-logo-icon.png",
      },
      {
        name: "SQLite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
      },
    ],
  },
  {
    title: "DevOps & Infraestrutura",
    description:
      "Containerização de aplicações, versionamento estruturado e deploy contínuo.",
    stacks: [
      { name: "Docker", icon: "/assets/docker-mark-blue.png" },
      { name: "Vercel", icon: "/assets/vercel-icon-light.png" },
      { name: "Git", icon: "/assets/github.png" },
    ],
  },
  {
    title: "E-commerce",
    description:
      "Customizações de checkout, componentes e integrações específicas para ambiente VTEX.",
    stacks: [
      { name: "Shopify", icon: "/assets/shopify_glyph.png" },
      { name: "VTEX", icon: "/assets/vtex-icon.jpg" },
    ],
  },
];

const projects = [
  {
    title: "Bruna Stone & Design",
    description:
      "Landing page responsiva para campanhas de marketing, com foco em apresentação visual, performance e SEO.",
    image:
      "https://res.cloudinary.com/dfddi3cl7/image/upload/v1772820575/Captura_de_tela_2026-03-06_150738_u0fv5t.png",
    link: "https://brunastonedesign.com.br/",
    stacks: ["ReactJS", "Vite", "Vercel"],
    badge: "Landing page",
  },
  {
    title: "Issacar Church - Album",
    description:
      "Galeria para organizar registros visuais da comunidade, com experiência simples para consulta em mobile e desktop.",
    image:
      "https://res.cloudinary.com/dfddi3cl7/image/upload/v1770754208/Captura_de_tela_2026-02-10_170220_cibrkx.png",
    link: "https://github.com/PauloIletski/image-gallery-next-ph",
    stacks: ["NextJS", "Cloudinary API", "Google API", "Vercel"],
    badge: "Aplicação web",
  },
  {
    title: "Cross Ambiental - Novo Site",
    description:
      "Site institucional modernizado para comunicar soluções com clareza, identidade visual consistente e boa navegação.",
    image:
      "https://res.cloudinary.com/dfddi3cl7/image/upload/v1770754902/Captura_de_tela_2026-02-10_172108_gnse6a.png",
    link: "https://cross-ambiental-landing.vercel.app/",
    stacks: ["NextJS", "Vercel"],
    badge: "Institucional",
  },
];

const experiences = [
  {
    company: "WPP Commerce",
    companyLink: "https://wppcommerce.com.br/",
    companyLogo:
      "https://d335luupugsy2.cloudfront.net/cms/files/90499/1770222188/$doub3fwxayw",
    role: "Desenvolvedor Full Stack E-commerce e VTEX",
    duration: "Mar 2020 - Atual",
    whiteLogo: true,
    points: [
      "Frontends headless para e-commerce com VTEX Fast Store, VTEX IO, React, Next.js e Gatsby.",
      "Arquitetura frontend, componentes reutilizáveis e otimização de Core Web Vitals.",
      "Atuação em produção, code reviews, decisões técnicas e integração com squads multidisciplinares.",
    ],
  },
  {
    company: "Quality Digital",
    companyLink: "https://qualitydigital.global/",
    companyLogo:
      "https://qualitydigital.global/wp-content/uploads/2023/04/logo-quality-digital.svg",
    role: "Desenvolvedor Full Stack E-commerce e VTEX",
    duration: "Fev 2026 - Atual",
    points: [
      "Desenvolvimento de interfaces e integrações para operação digital em escala.",
      "Evolução de componentes, performance e manutenção de jornadas críticas.",
      "Colaboração com times de produto, marketing, QA e operação.",
    ],
  },
  {
    company: "Minerva Foods",
    companyLink: "https://minervafoods.com/",
    companyLogo: "https://minervafoods.com/wp-content/uploads/2024/08/logo.webp",
    role: "Service Desk Assistant | Sistemas Internos",
    duration: "Jul 2019 - Jan 2020",
    points: [
      "Suporte e resolução de incidentes em sistemas internos.",
      "Consultas e correções em SQL Server e MySQL.",
      "Gestão de chamados e comunicação com usuários dentro dos SLAs.",
    ],
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/pauloiletski/",
    icon: "/assets/linkedin.png",
    label: "Contato profissional",
  },
  {
    name: "GitHub",
    link: "https://github.com/PauloIletski/",
    icon: "/assets/github.png",
    label: "Código e projetos",
  },
];

const floatingButtons = [
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/pauloiletski/",
    icon: "/assets/linkedin.png",
  },
  {
    name: "Github",
    link: "https://github.com/PauloIletski/",
    icon: "/assets/github.png",
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/5517981048717/?text=Ol%C3%A1+Paulo+sou+[seu+nome]+e+gostaria+de+...",
    icon: "/assets/whatsapp.png",
  },
];

const footerLinks = [
  { title: "Competências", href: "#showcase", group: "Currículo" },
  { title: "Cases", href: "#projects", group: "Currículo" },
  { title: "Experiência", href: "#experiences", group: "Currículo" },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/pauloiletski/",
    group: "Canais",
  },
  {
    title: "GitHub",
    href: "https://github.com/PauloIletski/",
    group: "Canais",
  },
  { title: "WhatsApp", href: "https://wa.me/5517981048717/", group: "Canais" },
];

const rows = [
  ...menuItems.map((item, index) =>
    row({
      title: item.name,
      section: "menu",
      contentType: "nav_link",
      href: item.href,
      metadata: { anchor: item.href, desktopOnly: false },
      sortOrder: index,
    }),
  ),
  row({
    title: "Texto superior do menu",
    section: "menu",
    contentType: "nav_link",
    label:
      "Portfólio profissional de Paulo Vieira: experiência, competências e cases",
    metadata: { type: "topbar" },
    sortOrder: 100,
  }),
  ...heroHighlights.map((title, index) =>
    row({
      title,
      section: "hero",
      contentType: "highlight",
      metadata: { group: "highlights", value: title },
      sortOrder: index,
    }),
  ),
  ...heroStats.map((stat, index) =>
    row({
      title: `Indicador ${stat.value}`,
      label: stat.label,
      section: "hero",
      contentType: "stat",
      metadata: { group: "stats", value: stat.value, label: stat.label },
      sortOrder: 20 + index,
    }),
  ),
  ...heroSteps.map((title, index) =>
    row({
      title,
      section: "hero",
      contentType: "step",
      metadata: { group: "steps", value: title },
      sortOrder: 40 + index,
    }),
  ),
  ...products.map((product, index) =>
    row({
      title: product.name,
      section: "showcase",
      contentType: "competency",
      summary: product.techs,
      icon: product.icon,
      tags: product.techs.split(" · "),
      metadata: {
        cartId: product.id,
        techs: product.techs,
        filter:
          product.icon === "database"
            ? "Dados"
            : product.icon === "devops"
              ? "Deploy"
              : product.icon === "ecommerce"
                ? "E-commerce"
                : product.icon === "backend"
                  ? "Back-end"
                  : product.icon === "frontend"
                    ? "Front-end"
                    : "Todos",
        available: product.available,
        icon: product.icon,
      },
      sortOrder: index,
      featured: product.available,
    }),
  ),
  ...skillGroups.map((skill, index) =>
    row({
      title: skill.title,
      section: "skills",
      contentType: "skill_group",
      description: skill.description,
      tags: skill.stacks.map((stack) => stack.name),
      metadata: { stacks: skill.stacks },
      sortOrder: index,
    }),
  ),
  ...projects.map((project, index) =>
    row({
      title: project.title,
      section: "projects",
      contentType: "project_card",
      description: project.description,
      href: project.link,
      imageUrl: project.image,
      tags: project.stacks,
      metadata: { badge: project.badge, stacks: project.stacks },
      sortOrder: index,
      featured: true,
    }),
  ),
  ...experiences.map((experience, index) =>
    row({
      title: experience.company,
      section: "experiences",
      contentType: "experience_card",
      href: experience.companyLink,
      imageUrl: experience.companyLogo,
      tags: [experience.role],
      metadata: {
        companyLink: experience.companyLink,
        role: experience.role,
        duration: experience.duration,
        points: experience.points,
        whiteLogo: Boolean(experience.whiteLogo),
      },
      sortOrder: index,
      featured: index === 0,
    }),
  ),
  ...socialLinks.map((social, index) =>
    row({
      title: social.name,
      section: "network",
      contentType: "social_link",
      label: social.label,
      href: social.link,
      icon: social.icon,
      metadata: { label: social.label, floating: false },
      sortOrder: index,
    }),
  ),
  ...floatingButtons.map((social, index) =>
    row({
      title: social.name,
      section: "floatingButtons",
      contentType: "social_link",
      href: social.link,
      icon: social.icon,
      metadata: { label: "Atalho flutuante", floating: true },
      sortOrder: index,
    }),
  ),
  ...footerLinks.map((link, index) =>
    row({
      title: link.title,
      section: "footer",
      contentType: "footer_link",
      href: link.href,
      metadata: { group: link.group },
      sortOrder: index,
    }),
  ),
];

function sqlValue(value) {
  if (value === null || value === undefined) return "null";
  if (Array.isArray(value)) {
    return `array[${value.map((item) => sqlValue(item)).join(", ")}]::text[]`;
  }
  if (typeof value === "object") {
    return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;
  }
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);

  return `'${String(value).replace(/'/g, "''")}'`;
}

function writeSqlSeed() {
  const values = rows
    .map((item) => {
      return `(${[
        item.title,
        item.slug,
        item.section,
        item.content_type,
        item.label,
        item.summary,
        item.description,
        item.href,
        item.image_url,
        item.image_public_id,
        item.icon,
        item.tags,
        item.metadata,
        item.status,
        item.sort_order,
        item.featured,
      ]
        .map(sqlValue)
        .join(", ")})`;
    })
    .join(",\n");

  const sql = `insert into public.site_content_items (
  title,
  slug,
  section,
  content_type,
  label,
  summary,
  description,
  href,
  image_url,
  image_public_id,
  icon,
  tags,
  metadata,
  status,
  sort_order,
  featured
) values
${values}
on conflict (section, slug) do update set
  title = excluded.title,
  content_type = excluded.content_type,
  label = excluded.label,
  summary = excluded.summary,
  description = excluded.description,
  href = excluded.href,
  image_url = excluded.image_url,
  image_public_id = excluded.image_public_id,
  icon = excluded.icon,
  tags = excluded.tags,
  metadata = excluded.metadata,
  status = excluded.status,
  sort_order = excluded.sort_order,
  featured = excluded.featured,
  updated_at = now();
`;

  fs.writeFileSync("supabase/seed_site_content.sql", sql);
  console.log("Arquivo SQL gerado em supabase/seed_site_content.sql");
}

if (shouldWriteSql) {
  writeSqlSeed();
  process.exit(0);
}

loadEnvFile();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar configuradas.",
  );
  process.exit(1);
}

if (serviceRoleKey.startsWith("sb_publishable_")) {
  console.error(
    "SUPABASE_SERVICE_ROLE_KEY parece ser uma chave publishable/anon. Use a chave service_role/secret do Supabase.",
  );
  console.error(
    "Alternativa: rode `node scripts/seed-site-content.mjs --write-sql` e execute o SQL gerado no SQL Editor do Supabase.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const { data, error } = await supabase
  .from("site_content_items")
  .upsert(rows, { onConflict: "section,slug" })
  .select("section,slug");

if (error) {
  console.error("Falha ao inserir mocks no Supabase.");
  console.error(error.message);
  if (error.code) console.error(`Codigo: ${error.code}`);
  process.exit(1);
}

const counts = rows.reduce((acc, item) => {
  acc[item.section] = (acc[item.section] || 0) + 1;
  return acc;
}, {});

console.log(`${data?.length ?? rows.length} registros sincronizados.`);
for (const [section, count] of Object.entries(counts)) {
  console.log(`${section}: ${count}`);
}
