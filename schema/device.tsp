import "@typespec/json-schema";

using JsonSchema;

namespace Organizer;


@jsonSchema
@extension("additionalProperties", false)
model Device {
  name: string;
  description: string;
  flags: string[];
  image: string;
  attributes: Record<unknown>;
}
