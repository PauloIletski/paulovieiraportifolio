import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "menu",
  contentType: "nav_link",
  entityName: "links do menu",
  validate: (payload) => (!payload.href ? "Link do menu e obrigatorio" : null),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
