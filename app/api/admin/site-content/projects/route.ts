import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "projects",
  contentType: "project_card",
  entityName: "projetos",
  validate: (payload) => (!payload.href ? "Link do projeto e obrigatorio" : null),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
