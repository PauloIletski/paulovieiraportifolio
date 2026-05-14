import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "hero",
  contentType: "highlight",
  entityName: "conteudos do hero",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
