import "@typespec/json-schema";

using JsonSchema;

namespace Organizer;


alias HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

@jsonSchema
model Service {
  name: string;
  description: string;
  checks: Checklist;
  actions: Record<Action[]>;
}

@jsonSchema
@discriminator("type")
model Action {
  @doc("Delay in ms to wait before executing this action")
  delay?: integer;
}

@jsonSchema
model HttpGetAction extends Action {
  type: "HTTP";
  method: HttpMethod;
  url: string;
}

@jsonSchema
@extension("additionalProperties", false)
model Checklist {
  interval: integer;
  up: Assertion;
  startings?: Assertion;
}

@jsonSchema
@discriminator("type")
model Assertion {}

@jsonSchema
model JsonFromHttpAssertion extends Assertion {
  type: "JSON_FROM_HTTP";
  url: string;
  method: HttpMethod;
  path: string;
  operation: "ne" | "eq";
  value: unknown;
}
