export function Projects(){

    const mockProjects = [
        {
            title: "Issacar Church - Album",
            description: "O Issacar Imagens foi desenvolvido para resolver a apresentação e a disponibilização organizada dos registros das reuniões da igreja. A plataforma centraliza conteúdos visuais, facilitando o acesso e a consulta pelos membros. A interface responsiva garante boa experiência em dispositivos móveis e desktop. A solução prioriza simplicidade, performance e facilidade de uso para a comunidade.",
            image: "https://res.cloudinary.com/dfddi3cl7/image/upload/v1770754208/Captura_de_tela_2026-02-10_170220_cibrkx.png",
            link: "https://github.com/PauloIletski/image-gallery-next-ph",
            stacks: ["NextJS", "CloudinaryAPI", "Google API","Vercel"]
        },
        {
            title: "Cross Ambiental - Novo Site",
            description: "O projeto Cross Ambiental teve como objetivo modernizar o layout do site institucional, tornando a comunicação mais clara e atual. A nova interface foi pensada para melhorar a apresentação dos serviços e fortalecer a identidade visual da empresa. O design responsivo garante uma experiência consistente em diferentes dispositivos. A solução entrega um site mais moderno, acessível e alinhado às expectativas do público institucional.",
            image: "https://res.cloudinary.com/dfddi3cl7/image/upload/v1770754902/Captura_de_tela_2026-02-10_172108_gnse6a.png",
            link: "https://cross-ambiental-landing.vercel.app/",
            stacks: ["NextJS","Vercel"]},
        {
            title: "Network de Posts",
            description: "O projeto Network de Posts foi criado para demonstrar habilidades full stack na construção de uma aplicação completa. A solução contempla backend, frontend e persistência de dados, simulando um fluxo real de criação e consumo de conteúdo. O projeto evidencia integração entre APIs, regras de negócio e interface do usuário.",
            image: "https://res.cloudinary.com/dfddi3cl7/image/upload/v1770755143/Captura_de_tela_2026-02-10_172421_kxiiah.png",
            link: "https://code-leap-network-beryl.vercel.app/",  
            stacks: ["NextJS", "NodeJS", "Supabase"]
        }
    ]

    return(
        <section id="projects" className="flex flex-col py-4 bg-gray-100 min-h-screen md:min-h-screen lg:min-h-screen lg:h-full md:justify-start lg:justify-start lg:mt-0 justify-start mt-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mt-10 mb-5">Projetos em Destaque</h2>
            <p className="text-lg mb-10">Alguns dos projetos que desenvolvi mostrando minhas habilidades e experiências</p>

            <div className="flex flex-wrap justify-center gap-8">  
                {mockProjects.map((project, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-lg overflow-hidden w-80">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-start mb-2">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.stacks.map((stack, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{stack}</span>
                                ))}
                            </div>
                            <p className="text-gray-700 text-center mb-4">{project.description}</p>
                            
                            <a href={project.link} className="text-blue-500 hover:bg-blue-600 p-2 bg-blue-500 text-white rounded">Ver detalhes</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}