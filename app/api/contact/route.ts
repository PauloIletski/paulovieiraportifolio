import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/app/services/supabaseServer";
import type { ContactPayload } from "@/app/types/contactPayloadTypes";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({
        ok: false,
        error: "Required Fields",
      });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Inválid Email" });
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_RECEIVER!,
      subject: `Novo contato: ${name}`,
      html: `
                <p><strong>Nome:</strong>${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong><br/>${message}</p>
            `,
    });


    console.log("Env", process.env.RESEND_API_KEY ,data)

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
