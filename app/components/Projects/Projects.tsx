export function Projects() {
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

  return (
    <section id="projects" className="bg-slate-50 px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Projetos do currículo
            </p>
            <h2 className="mt-2 text-3xl font-black text-zinc-950 md:text-5xl">
              Cases que demonstram experiência prática
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              Uma seleção de entregas que evidenciam atuação em presença
              digital, performance, conteúdo e integração.
            </p>
          </div>
          <a
            href="#showcase"
            className="inline-flex w-fit items-center justify-center rounded border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-900 transition hover:border-blue-500 hover:text-blue-700"
          >
            Ver competências técnicas
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-56 w-full object-cover"
                />
              </a>

              <div className="p-5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {project.badge}
                </span>
                <h3 className="mt-4 text-xl font-black text-zinc-950">
                  {project.title}
                </h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-zinc-600">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stacks.map((stack) => (
                    <span
                      key={stack}
                      className="rounded bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-700"
                    >
                      {stack}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Ver detalhes
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
