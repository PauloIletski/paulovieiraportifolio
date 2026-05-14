export function Experiences() {
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

  return (
    <section id="experiences" className="bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Histórico profissional
          </p>
          <h2 className="mt-2 text-3xl font-black text-zinc-950 md:text-5xl">
            Experiência em operações reais
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-zinc-600">
            A navegação é objetiva, mas o conteúdo reflete atuação prática em
            e-commerce, sistemas internos, sustentação e times multidisciplinares.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {experiences.map((experience) => (
            <article
              key={experience.company}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <a
                href={experience.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-20 items-center"
              >
                <img
                  src={experience.companyLogo}
                  alt={experience.company}
                  className={`max-h-16 max-w-44 object-contain p-2 ${
                    experience.whiteLogo ? "bg-blue-950" : "bg-white"
                  }`}
                />
              </a>
              <h3 className="mt-4 text-lg font-black text-zinc-950">
                {experience.company}
              </h3>
              <p className="mt-1 text-sm font-semibold text-blue-700">
                {experience.role}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                {experience.duration}
              </p>

              <ul className="mt-5 space-y-3">
                {experience.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-zinc-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
