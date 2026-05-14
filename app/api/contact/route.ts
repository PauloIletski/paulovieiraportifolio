import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/app/services/supabaseServer";
import type { ContactPayload } from "@/app/types/contactPayloadTypes";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: "Campos obrigatórios",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "E-mail inválido" },
        { status: 400 },
      );
    }

    const supabase = supabaseServer();

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (dbError) {
      return NextResponse.json(
        { ok: false, error: `Error on save ${dbError.message}` },
        { status: 500 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    const contactReceiver = process.env.CONTACT_RECEIVER;

    if (!resendApiKey || !resendFrom || !contactReceiver) {
      return NextResponse.json(
        { ok: false, error: "Configuração de e-mail ausente" },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

    const { error } = await resend.emails.send({
      from: resendFrom,
      to: contactReceiver,
      subject: `Novo contato: ${name}`,
      html: `
                <p><strong>Nome:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Mensagem:</strong><br/>${safeMessage}</p>
            `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Error: ${error}` },
      { status: 500 },
    );
  }
}
