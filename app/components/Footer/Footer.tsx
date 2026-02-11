export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <p className="text-lg font-semibold">
          Paulo Vieira — Desenvolvedor Full Stack
        </p>

        <p className="text-sm text-gray-600">
          Construindo soluções digitais com foco em performance e escalabilidade.
        </p>

        <div className="flex justify-center gap-6 text-sm">
          <a
            href="https://www.linkedin.com/in/pauloiletski/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/PauloIletski/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </a>
        </div>

        <p className="text-xs text-gray-400 pt-4">
          © {new Date().getFullYear()} Paulo Vieira. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}