export function Social() {
  const mockSocial = [
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
  ];

  return (
    <section
      id="network"
      className="flex flex-col min-h-50 p-5 md:justify-around lg:justify-start lg:mt-0 justify-start text-center"
    >
      <h2 className="text-3xl md:text-5xl font-bold">
        Ou me encontre nas redes
      </h2>
      <p className="text-lg mb-5 px-4">
        Acesse o linkedin para contato profissional e o github para acompanhar
        meus projetos
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {mockSocial.map((social, socialIndex) => (
          <a
            key={socialIndex}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block size-12 overflow-hidden transition hover:scale-105"
          >
            <img
              src={social.icon}
              alt={social.name ?? "Social icon"}
              className="h-full w-full object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
