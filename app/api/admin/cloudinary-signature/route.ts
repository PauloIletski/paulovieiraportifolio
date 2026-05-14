import crypto from "crypto";
import { NextResponse } from "next/server";
import { validateAdminRequest } from "@/app/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const authError = await validateAdminRequest(req);
  if (authError) return authError;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { ok: false, error: "Cloudinary não configurado" },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    folder?: string;
  };
  const timestamp = Math.round(Date.now() / 1000);
  const folder = body.folder?.trim() || "paulo-portfolio";
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  return NextResponse.json({
    ok: true,
    data: {
      apiKey,
      cloudName,
      folder,
      signature,
      timestamp,
    },
  });
}
