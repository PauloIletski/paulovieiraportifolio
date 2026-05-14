import { NextResponse } from "next/server";
import { validateAdminRequest } from "@/app/lib/adminAuth";
import { slugify } from "@/app/lib/slug";
import { supabaseServer } from "@/app/services/supabaseServer";
import type {
  PortfolioItem,
  PortfolioItemPayload,
} from "@/app/types/adminPortfolioTypes";

const VALID_CATEGORIES = new Set([
  "skill",
  "project",
  "experience",
  "education",
  "certification",
]);
const VALID_STATUSES = new Set(["draft", "published"]);

function normalizeTags(tags: unknown) {
  if (!Array.isArray(tags)) return [];

  return tags
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean);
}

function mapPortfolioItem(row: Record<string, unknown>): PortfolioItem {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    summary: row.summary ? String(row.summary) : "",
    description: row.description ? String(row.description) : "",
    category: row.category as PortfolioItem["category"],
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    status: row.status as PortfolioItem["status"],
    imageUrl: row.image_url ? String(row.image_url) : "",
    imagePublicId: row.image_public_id ? String(row.image_public_id) : "",
    externalUrl: row.external_url ? String(row.external_url) : "",
    sortOrder: Number(row.sort_order ?? 0),
    featured: Boolean(row.featured),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function validatePayload(payload: PortfolioItemPayload) {
  const title = payload.title?.trim();
  const category = payload.category;
  const status = payload.status;

  if (!title) return "Título é obrigatório";
  if (!VALID_CATEGORIES.has(category)) return "Categoria inválida";
  if (!VALID_STATUSES.has(status)) return "Status inválido";

  return null;
}

export async function GET(req: Request) {
  const authError = await validateAdminRequest(req);
  if (authError) return authError;

  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      data: (data ?? []).map((item) => mapPortfolioItem(item)),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Erro ao listar registros: ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const authError = await validateAdminRequest(req);
  if (authError) return authError;

  try {
    const payload = (await req.json()) as PortfolioItemPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json(
        { ok: false, error: validationError },
        { status: 400 },
      );
    }

    const title = payload.title.trim();
    const slug = payload.slug?.trim() || slugify(title);
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("portfolio_items")
      .insert([
        {
          title,
          slug,
          summary: payload.summary?.trim() || null,
          description: payload.description?.trim() || null,
          category: payload.category,
          tags: normalizeTags(payload.tags),
          status: payload.status,
          image_url: payload.imageUrl?.trim() || null,
          image_public_id: payload.imagePublicId?.trim() || null,
          external_url: payload.externalUrl?.trim() || null,
          sort_order: payload.sortOrder ?? 0,
          featured: payload.featured ?? false,
        },
      ])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    await supabase.from("admin_audit_logs").insert([
      {
        action: "create",
        entity: "portfolio_items",
        entity_id: data.id,
        metadata: {
          title,
          category: payload.category,
          status: payload.status,
        },
      },
    ]);

    return NextResponse.json(
      { ok: true, data: mapPortfolioItem(data) },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Erro ao criar registro: ${error}` },
      { status: 500 },
    );
  }
}
