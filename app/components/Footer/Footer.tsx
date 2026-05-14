export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-white px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded bg-blue-600 text-sm font-black text-white">
              PV
            </span>
            <div>
              <p className="font-black text-zinc-950">Paulo Vieira</p>
              <p className="text-sm text-zinc-500">
                Currículo e portfólio full stack.
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-zinc-600">
            Portfólio em formato navegável para apresentar competências,
            experiências, projetos e canais de contato profissional.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950">
            Currículo
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>
              <a href="#showcase" className="hover:text-blue-700">
                Competências
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-blue-700">
                Cases
              </a>
            </li>
            <li>
              <a href="#experiences" className="hover:text-blue-700">
                Experiência
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950">
            Canais
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>
              <a
                href="https://www.linkedin.com/in/pauloiletski/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/PauloIletski/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5517981048717/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-zinc-200 pt-5 text-sm text-zinc-500">
        © {year} Paulo Vieira. Todos os direitos reservados.
      </div>
    </footer>
  );
}
