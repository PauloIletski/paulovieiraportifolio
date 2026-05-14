import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "experiences",
  contentType: "experience_card",
  entityName: "experiencias",
  validate: (payload) =>
    !payload.metadata?.role ? "Cargo da experiencia e obrigatorio" : null,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
