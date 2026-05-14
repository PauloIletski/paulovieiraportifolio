import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/services/supabaseServer";

function getBearerToken(req: Request) {
  const authorization = req.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) return null;

  return authorization.slice("Bearer ".length).trim();
}

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminUser(req: Request) {
  const accessToken = getBearerToken(req);

  if (!accessToken) {
    return {
      user: null,
      error: NextResponse.json(
        { ok: false, error: "Token de autenticação ausente" },
        { status: 401 },
      ),
    };
  }

  const allowedEmails = getAllowedAdminEmails();

  if (allowedEmails.length === 0) {
    return {
      user: null,
      error: NextResponse.json(
        { ok: false, error: "ADMIN_EMAILS não configurado" },
        { status: 500 },
      ),
    };
  }

  let data;
  let error;

  try {
    const supabase = supabaseServer();
    const response = await supabase.auth.getUser(accessToken);
    data = response.data;
    error = response.error;
  } catch (authError) {
    return {
      user: null,
      error: NextResponse.json(
        {
          ok: false,
          error: `Supabase server env inválido: ${authError instanceof Error ? authError.message : String(authError)}`,
        },
        { status: 500 },
      ),
    };
  }
  const userEmail = data.user?.email?.toLowerCase();

  if (error || !data.user || !userEmail) {
    return {
      user: null,
      error: NextResponse.json(
        { ok: false, error: "Sessão Supabase inválida" },
        { status: 401 },
      ),
    };
  }

  if (!allowedEmails.includes(userEmail)) {
    return {
      user: null,
      error: NextResponse.json(
        { ok: false, error: "Usuário sem permissão administrativa" },
        { status: 403 },
      ),
    };
  }

  return { user: data.user, error: null };
}

export async function validateAdminRequest(req: Request) {
  const { error } = await getAdminUser(req);
  return error;
}
