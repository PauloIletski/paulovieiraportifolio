import { createSectionHandlers } from "../_helpers";

const handlers = createSectionHandlers({
  section: "showcase",
  contentType: "competency",
  entityName: "competencias",
  validate: (payload) =>
    !payload.metadata?.techs ? "Tecnologias da competencia sao obrigatorias" : null,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
