export function SkillsHero() {
  const mockSkills = [
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
      title:"DevOps & Infraestrutura",
      description:"Containerização de aplicações, versionamento estruturado e deploy contínuo.",
      stacks:[
        {
          name:"Docker",
          icon:"/assets/docker-mark-blue.png"
        },
         {
          name:"Vercel",
          icon:"/assets/vercel-icon-light.png"
        },
         {
          name:"Git",
          icon:"/assets/github.png"
        },
    ]
    },
    {
      title: "E-commerce",
      description: "Customizações de checkout, componentes e integrações específicas para ambiente VTEX.",
      stacks: [
        {
          name: "Shopify",
          icon: "/assets/shopify_glyph.png",
        },
        {
          name: "VTEX",
          icon: "/assets/vtex-icon.jpg",
        },
      ],
    },
  ];

  return (
    <section id="habilidades" className="flex flex-col min-h-screen md:min-h-screen lg:min-h-screen lg:h-full md:justify-around lg:justify-start lg:mt-0 justify-start mt-30 text-center">
      <h2 className="text-3xl md:text-5xl font-bold">
        Habilidades
      </h2>
      <p className="text-lg mb-5 px-4">Stacks e Áreas de Atuação</p>
      <div className="grid grid-cols-1 p-10 md:grid-cols-2 gap-8">
        {mockSkills.map((skill, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold text-start mb-2">{skill.title}</h2>
               <div className="flex flex-wrap gap-4 justify-start">
                  {skill.stacks.map((stack, stackIndex) => (
                    <div key={stackIndex} className="flex flex-col items-center">
                      <img
                        src={stack.icon}
                        alt={stack.name}
                        className="w-5 h-5 mb-2"
                        width={50}
                        height={50}
                      />
                     
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 justify-start mb-5">
                  {skill.stacks.map((stack, stackIndex) => (
                    <div key={stackIndex} className="flex flex-col items-center text-blue-900 hover:scale-105 ">
                       {stack.name}
                    </div>
                  ))}
                </div>
              <p className="text-gray-700 dark:text-black text-start mb-4">{skill.description}</p>
               
        
        </div>))}
      </div>
      <div></div>
    </section>
  );
}
