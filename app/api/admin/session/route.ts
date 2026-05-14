import { NextResponse } from "next/server";
import { getAdminUser } from "@/app/lib/adminAuth";

export async function GET(req: Request) {
  try {
    const { user, error } = await getAdminUser(req);

    if (error) {
      if (error.status >= 500) {
        return NextResponse.json({
          ok: false,
          data: {
            authenticated: false,
          },
          error:
            "Configuração administrativa incompleta. Verifique ADMIN_EMAILS, SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.",
        });
      }

      return error;
    }

    return NextResponse.json({
      ok: true,
      data: {
        authenticated: true,
        email: user?.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        data: {
          authenticated: false,
        },
        error: `Erro ao validar sessão administrativa: ${error instanceof Error ? error.message : String(error)}`,
      }
    );
  }
}
