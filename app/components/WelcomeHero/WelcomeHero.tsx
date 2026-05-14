"use client";

import { gtmEvent } from "@/app/lib/gtm";
import Image from "next/image";

export function WelcomeHero() {
  const highlights = [
    "Currículo interativo",
    "Experiência em e-commerce",
    "Stack full stack",
  ];

  const stats = [
    { value: "6+", label: "competências-chave" },
    { value: "3", label: "cases selecionados" },
    { value: "100%", label: "contato direto" },
  ];

  return (
    <section
      id="hero"
      className="relative isolate min-h-[calc(100vh-7rem)] overflow-hidden bg-zinc-950 px-4 py-16 text-white md:py-20"
    >
      <Image
        src="/assets/background.png"
        alt=""
        fill
        className="-z-20 object-cover opacity-50"
        priority
      />
      <div className="absolute inset-0 -z-10 bg-zinc-950/65" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-50 backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-200">
            Portfólio em formato de currículo
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Explore minha trajetória, selecione competências e fale comigo.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 md:text-lg">
            Front-end, back-end, e-commerce, banco de dados e deploy organizados
            como um currículo navegável para facilitar uma conversa profissional.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#showcase"
              onClick={() =>
                gtmEvent("cta_click", {
                  cta_name: "ver_competencias",
                  section: "hero",
                })
              }
              className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Ver competências
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Conferir projetos
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-white/15 bg-white p-5 text-zinc-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Leitura rápida
              </p>
              <h2 className="text-2xl font-black">Monte uma pauta</h2>
            </div>
            <span className="rounded bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              Online
            </span>
          </div>

          <div className="grid gap-3 py-5">
            {[
              "Selecione competências relevantes",
              "Revise os tópicos de interesse",
              "Envie a pauta pelo WhatsApp",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded border border-zinc-200 bg-zinc-50 p-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded bg-zinc-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-zinc-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-zinc-200 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-black text-zinc-950">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
