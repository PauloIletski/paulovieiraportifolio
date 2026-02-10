import Image from "next/image";

export function WelcomeHero() {
  const mockImage = {
    src: "https://res.cloudinary.com/dfddi3cl7/image/upload/v1770685190/file_000000005bac71f5be5c6a25aba8ae1a_rwcev4.png",
    alt: "Imagem de boas-vindas",
    width: 250,
    height: 250,
  };

  const mockText = {
    title: "Desenvolvedor Full Stack",
    description:
      "Crio interfaces modernas e soluções web escaláveis com foco em performance, usabilidade e resultado de negócio.",
    linkProjectsText: "Veja meus projetos",
    linkProjectsHref: "#projects",
    linkContatText: "Falar comigo",
    linkContactHref: "#contact",
  };

  return (
    <section id="hero" className="flex flex-col md:min-h-screen lg:min-h-screen lg:h-full md:justify-around lg:justify-center justify-center text-center">
        <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/background.png"
          alt=""
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="flex w-48 h-48 overflow-hidden justify-center self-center items-center mt-10 border-4 border-blue-500 rounded-full p-1">
        <img
          src={mockImage.src}
          alt={mockImage.alt}
            width={mockImage.width}
            height={mockImage.height}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-5 px-4">
        <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">
          {mockText.title}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8">
          {mockText.description}
        </p>
        <a
          href={mockText.linkProjectsHref}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {mockText.linkProjectsText}
        </a>
        <a
          href={mockText.linkContactHref}
          className="inline-flex mt-5 items-center gap-1 text-blue-200 font-medium
                    transition-all duration-200
                    hover:text-white hover:underline
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    active:scale-95"
        >
          {mockText.linkContatText}
        </a>
      </div>
    </section>
  );
}
