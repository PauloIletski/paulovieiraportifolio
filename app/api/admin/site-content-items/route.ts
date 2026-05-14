import { NextResponse } from "next/server";
import { validateAdminRequest } from "@/app/lib/adminAuth";
import { slugify } from "@/app/lib/slug";
import { supabaseServer } from "@/app/services/supabaseServer";
import type {
  SiteContentItem,
  SiteContentItemPayload,
  SiteContentMetadata,
} from "@/app/types/adminSiteContentTypes";

const VALID_SECTIONS = new Set([
  "menu",
  "hero",
  "showcase",
  "skills",
  "projects",
  "experiences",
  "network",
  "floatingButtons",
  "footer",
]);

const VALID_CONTENT_TYPES = new Set([
  "nav_link",
  "highlight",
  "stat",
  "step",
  "competency",
  "skill_group",
  "project_card",
  "experience_card",
  "social_link",
  "footer_link",
]);

const VALID_STATUSES = new Set(["draft", "published"]);

function normalizeTags(tags: unknown) {
  if (!Array.isArray(tags)) return [];

  return tags
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean);
}

function normalizeMetadata(metadata: unknown): SiteContentMetadata {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return {};
  }

  return metadata as SiteContentMetadata;
}

function mapSiteContentItem(row: Record<string, unknown>): SiteContentItem {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    section: row.section as SiteContentItem["section"],
    contentType: row.content_type as SiteContentItem["contentType"],
    label: row.label ? String(row.label) : "",
    summary: row.summary ? String(row.summary) : "",
    description: row.description ? String(row.description) : "",
    href: row.href ? String(row.href) : "",
    imageUrl: row.image_url ? String(row.image_url) : "",
    imagePublicId: row.image_public_id ? String(row.image_public_id) : "",
    icon: row.icon ? String(row.icon) : "",
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    metadata: normalizeMetadata(row.metadata),
    status: row.status as SiteContentItem["status"],
    sortOrder: Number(row.sort_order ?? 0),
    featured: Boolean(row.featured),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function validatePayload(payload: SiteContentItemPayload) {
  const title = payload.title?.trim();

  if (!title) return "Titulo e obrigatorio";
  if (!VALID_SECTIONS.has(payload.section)) return "Secao invalida";
  if (!VALID_CONTENT_TYPES.has(payload.contentType)) {
    return "Tipo de conteudo invalido";
  }
  if (!VALID_STATUSES.has(payload.status)) return "Status invalido";

  return null;
}

export async function GET(req: Request) {
  const authError = await validateAdminRequest(req);
  if (authError) return authError;

  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("site_content_items")
      .select("*")
      .order("section", { ascending: true })
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
      data: (data ?? []).map((item) => mapSiteContentItem(item)),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Erro ao listar conteudos: ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const authError = await validateAdminRequest(req);
  if (authError) return authError;

  try {
    const payload = (await req.json()) as SiteContentItemPayload;
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
      .from("site_content_items")
      .insert([
        {
          title,
          slug,
          section: payload.section,
          content_type: payload.contentType,
          label: payload.label?.trim() || null,
          summary: payload.summary?.trim() || null,
          description: payload.description?.trim() || null,
          href: payload.href?.trim() || null,
          image_url: payload.imageUrl?.trim() || null,
          image_public_id: payload.imagePublicId?.trim() || null,
          icon: payload.icon?.trim() || null,
          tags: normalizeTags(payload.tags),
          metadata: normalizeMetadata(payload.metadata),
          status: payload.status,
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
        entity: "site_content_items",
        entity_id: data.id,
        metadata: {
          title,
          section: payload.section,
          contentType: payload.contentType,
          status: payload.status,
        },
      },
    ]);

    return NextResponse.json(
      { ok: true, data: mapSiteContentItem(data) },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Erro ao criar conteudo: ${error}` },
      { status: 500 },
    );
  }
}
