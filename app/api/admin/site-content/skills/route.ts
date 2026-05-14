import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "skills",
  contentType: "skill_group",
  entityName: "habilidades",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
