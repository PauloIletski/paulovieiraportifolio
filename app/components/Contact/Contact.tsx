'use client'

import { useContactForm } from "@/app/hooks/useContactForm";

export function Contact() {

    const {values, status, error, handleChange, handleSubmit} = useContactForm()

  return (
    <section id="contact" className="w-full bg-gray-100 py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Vamos conversar?</h2>
        <p className="mt-4 text-lg text-gray-600">
          Fique à vontade para entrar em contato para oportunidades, projetos ou
          parcerias profissionais.
        </p>
        <div className="mt-12 rounded-xl bg-white p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              name="name"
              placeholder="Seu nome"
              value={values.name}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 p-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Seu e-mail"
              className="w-full rounded-md border border-zinc-300 p-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              required
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="Conte um pouco sobre o que você precisa"
              rows={4}
              className="w-full rounded-md border border-zinc-300 p-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pt-2">
              <button
                type="submit"
                disabled={status==="loading"}
                className="w-full rounded-md bg-blue-600 py-3 font-medium text-white
                       transition hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {status==="loading"?"Enviando...":"Enviar mensagem"}
              </button>
            </div>
            {
                status === "success" && (
                    <p className="text-sm text-green-600">Mensagem enviada com sucesso!</p>
                )
            }
            {
                status ==="error" && (
                    <p className="text-sm text-red-600">{error}</p>
                )
            }

            <p className="text-sm text-gray-500">
              Respondo normalmente em até 1 dia útil. Possibilidade de atuação como PJ (Pessoa Jurídica)
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
