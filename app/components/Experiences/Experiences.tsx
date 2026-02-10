export function Experiences(){
    
    const mockExperiences = [{
        company: "Quality Digital",
        companyLink: "https://qualitydigital.global/",
        companyLogo:"https://qualitydigital.global/wp-content/uploads/2023/04/logo-quality-digital.svg",
        role: "Desenvolvedor Full Stack E-commerce e VTEX ",
        duration: "Fev 2020 - Dez 2025",
        points:[
            "Desenvolvimento de frontends headless para e-commerce utilizando VTEX Fast Store, VTEX IO, React, Next.js e Gatsby, com foco em performance, escalabilidade e SEO.",
            "Definição e evolução da arquitetura frontend, com criação de componentes reutilizáveis, otimização de Core Web Vitals, redução de bundle e melhoria do tempo de carregamento.",
            "Colaboração com squads multidisciplinares e atuação em produção, participando de code reviews, decisões arquiteturais, resolução de incidentes críticos e integração com times de produto e marketing."
        ]
    },
{
        company: "Minerva Foods",   
        companyLink: "https://minervafoods.com/",
        companyLogo: "https://minervafoods.com/wp-content/uploads/2024/08/logo.webp",
        role: "Service Desk Assistant | Sistemas Internos",
        duration: "jul de 2019 - jan de 2020",
        points:[
            "Suporte e resolução de incidentes em sistemas internos, atuando na análise, correção funcional e garantia da continuidade das operações.",
            "Manutenção e ajustes em bancos de dados e aplicações, realizando consultas e correções em SQL Server e MySQL, além de ajustes pontuais em sistemas Delphi, PHP e JavaScript.",
            "Gestão de chamados e comunicação com usuários, registrando e priorizando demandas via JIRA, alinhando soluções com áreas internas dentro dos SLAs estabelecidos."
        ]
},
{
    company: "Unither Pharmaceuticals",
    companyLogo: "https://www.unither-pharma.com/wp-content/uploads/2026/01/logo-unither-pharmaceuticals-site-internet.png",
    companyLink: "https://www.unither-pharma.com/pt-br/",
    role: "Estagiário de Desenvolvimento",
    duration: "jun de 2017 -  jul de 2019",
    points:[
        "Suporte e gestão de sistemas corporativos em ambiente regulado, atuando na organização de demandas de TI, acompanhamento de sistemas de terceiros e interface com áreas internas para garantir estabilidade e aderência a processos.",
        "Desenvolvimento e automação de soluções internas, criando aplicações em JavaScript na plataforma Fluig (TOTVS) para apoiar rotinas corporativas e otimizar processos.",
        "Atendimento técnico e suporte a usuários, com atuação em manutenção de hardware e software, organização de ativos de TI e comunicação direta com usuários para resolução de demandas operacionais."
    ]
}]
    
    return(
        <section id="experiences" className="flex flex-col bg-white min-h-screen md:min-h-screen lg:min-h-screen lg:h-full md:justify-around lg:justify-center lg:mt-0 justify-start mt-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mt-10 mb-5">Experiências Profissionais</h2>
            <p className="text-lg mb-5 px-4">Minhas experiências e responsabilidades em empresas anteriores</p>
            <div className="flex flex-wrap p-4 justify-center gap-8">
                {mockExperiences.map((experience, index) => (
                    <div key={index} className="rounded-xl  flex flex-col w-full md:flex-row lg:flex-row md:w-1/2 lg:w-1/2 bg-white p-6 shadow-sm hover:shadow-xl ">
                
                     <div className="flex flex-col justify-start items-start md:w-100 lg:w-100 mr-4  md:border-r md:border-zinc-200 md:p-4">
                        <a href={experience.companyLink} className="text-blue-500 hover:underline mb-1">
                            <img src={experience.companyLogo} alt={experience.company} className="w-25 h-16 object-contain mb-2" />
                        </a>
                        <p className="text-gray-700 text-start mb-4">{experience.role}</p>
                        <p className="text-gray-600 text-start text-sm mb-4">{experience.duration}</p>
                     </div>
                       
                        <ul className="list-disc list-inside text-left">
                            {experience.points.map((point, i) => (
                                <li key={i} className="mb-2">{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}