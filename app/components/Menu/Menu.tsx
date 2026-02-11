import { MenuToggle } from "./ToggleMenu"

export function Menu(){

    const menuMock =[
        {
            name: "Hello World",
            href: "/",
            type: "internal",
            format:"link"                                                   
        },
        {
            name: "Habilidades",
            href: "#habilidades"  
        },
        {
            name: "Projetos",
            href: "#projects"   
        },
        {
            name:  "Histórico Profissional",
            href: "#experiences"
        },
        {
            name:"Contato",
            href:"#contact"
        },
        {
            name:"Redes Sociais",
            href:"#network"
        }
    ]

    return (
        <nav className="sticky top-0 z-50 w-full shadow-sm border-b border-zinc-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="text-lg font-semibold"> Paulo Vieira</div>
                <ul className="hidden gap-6 md:flex">
                    {menuMock.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="md:hidden">
                    <MenuToggle items={menuMock} />
                </div>

            </div>
        </nav>
    )
}
