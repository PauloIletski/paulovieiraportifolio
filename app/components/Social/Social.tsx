export function Social() {
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

  return (
    <section id="network" className="bg-zinc-950 px-4 py-14 text-white md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Contato profissional
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-black md:text-5xl">
            Quer conversar sobre uma vaga, projeto ou parceria?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            Me chame nos canais profissionais ou selecione competências acima
            para enviar uma pauta inicial de contato.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/5517981048717/?text=Ol%C3%A1+Paulo%2C+quero+falar+sobre+um+projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-green-500 px-6 py-3 text-sm font-black text-white transition hover:bg-green-600"
            >
              Chamar no WhatsApp
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center justify-center rounded border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Voltar para competências
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded bg-white p-2">
                <img
                  src={social.icon}
                  alt={social.name}
                  className="h-full w-full object-contain"
                />
              </span>
              <span>
                <span className="block font-black">{social.name}</span>
                <span className="block text-sm text-zinc-300">
                  {social.label}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
