import { NextResponse } from "next/server";
import { validateAdminRequest } from "@/app/lib/adminAuth";
import { slugify } from "@/app/lib/slug";
import { supabaseServer } from "@/app/services/supabaseServer";
import type {
  SiteContentItem,
  SiteContentItemPayload,
  SiteContentMetadata,
  SiteContentSection,
  SiteContentType,
} from "@/app/types/adminSiteContentTypes";

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

function toDbPayload(
  payload: SiteContentItemPayload,
  config: {
    section: SiteContentSection;
    contentType: SiteContentType;
  },
  title: string,
  slug: string,
) {
  return {
    title,
    slug,
    section: config.section,
    content_type: config.contentType,
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
  };
}

function validateBasePayload(
  payload: SiteContentItemPayload,
  config: {
    validate?: (payload: SiteContentItemPayload) => string | null;
  },
) {
  const title = payload.title?.trim();

  if (!title) return "Titulo e obrigatorio";
  if (!VALID_STATUSES.has(payload.status)) return "Status invalido";

  return config.validate?.(payload) || null;
}

function getIdFromUrl(req: Request) {
  const url = new URL(req.url);
  return url.searchParams.get("id")?.trim() || "";
}

export function mapSiteContentItem(row: Record<string, unknown>): SiteContentItem {
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

export function createSectionHandlers(config: {
  section: SiteContentSection;
  contentType: SiteContentType;
  entityName: string;
  validate?: (payload: SiteContentItemPayload) => string | null;
}) {
  async function GET(req: Request) {
    const authError = await validateAdminRequest(req);
    if (authError) return authError;

    try {
      const supabase = supabaseServer();
      const { data, error } = await supabase
        .from("site_content_items")
        .select("*")
        .eq("section", config.section)
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
        { ok: false, error: `Erro ao listar ${config.entityName}: ${error}` },
        { status: 500 },
      );
    }
  }

  async function POST(req: Request) {
    const authError = await validateAdminRequest(req);
    if (authError) return authError;

    try {
      const payload = (await req.json()) as SiteContentItemPayload;
      const validationError = validateBasePayload(payload, config);

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
        .insert([toDbPayload(payload, config, title, slug)])
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
          entity: `site_content_${config.section}`,
          entity_id: data.id,
          metadata: {
            title,
            section: config.section,
            contentType: config.contentType,
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
        { ok: false, error: `Erro ao criar ${config.entityName}: ${error}` },
        { status: 500 },
      );
    }
  }

  async function PUT(req: Request) {
    const authError = await validateAdminRequest(req);
    if (authError) return authError;

    try {
      const payload = (await req.json()) as SiteContentItemPayload & {
        id?: string;
      };
      const id = payload.id?.trim();

      if (!id) {
        return NextResponse.json(
          { ok: false, error: "ID e obrigatorio para atualizar" },
          { status: 400 },
        );
      }

      const validationError = validateBasePayload(payload, config);

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
        .update(toDbPayload(payload, config, title, slug))
        .eq("id", id)
        .eq("section", config.section)
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
          action: "update",
          entity: `site_content_${config.section}`,
          entity_id: data.id,
          metadata: {
            title,
            section: config.section,
            contentType: config.contentType,
            status: payload.status,
          },
        },
      ]);

      return NextResponse.json({ ok: true, data: mapSiteContentItem(data) });
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          error: `Erro ao atualizar ${config.entityName}: ${error}`,
        },
        { status: 500 },
      );
    }
  }

  async function DELETE(req: Request) {
    const authError = await validateAdminRequest(req);
    if (authError) return authError;

    try {
      const id = getIdFromUrl(req);

      if (!id) {
        return NextResponse.json(
          { ok: false, error: "ID e obrigatorio para excluir" },
          { status: 400 },
        );
      }

      const supabase = supabaseServer();
      const { data, error } = await supabase
        .from("site_content_items")
        .delete()
        .eq("id", id)
        .eq("section", config.section)
        .select("id,title")
        .single();

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 },
        );
      }

      await supabase.from("admin_audit_logs").insert([
        {
          action: "delete",
          entity: `site_content_${config.section}`,
          entity_id: data.id,
          metadata: {
            title: data.title,
            section: config.section,
          },
        },
      ]);

      return NextResponse.json({ ok: true });
    } catch (error) {
      return NextResponse.json(
        { ok: false, error: `Erro ao excluir ${config.entityName}: ${error}` },
        { status: 500 },
      );
    }
  }

  return { GET, POST, PUT, PATCH: PUT, DELETE };
}
