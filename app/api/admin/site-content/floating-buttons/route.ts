import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "floatingButtons",
  contentType: "social_link",
  entityName: "botoes flutuantes",
  validate: (payload) => (!payload.href ? "Link do botao e obrigatorio" : null),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
