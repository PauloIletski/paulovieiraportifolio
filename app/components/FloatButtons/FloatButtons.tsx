export function FloatButtons() {
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
    {
      name: "Whatsapp",
      link: "https://wa.me/5517981048717/?text=Ol%C3%A1+Paulo+sou+[seu+nome]+e+gostaria+de+...",
      icon: "/assets/whatsapp.png",
    }
  ];

  return (
    <div className="fixed bottom-3 left-3 z-50 bg-white rounded-md shadow p-4">
      <div className="flex flex-wrap flex-col items-center justify-center gap-4">
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
    </div>
  );
}
