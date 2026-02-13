// Custom fields management tools

import type { CloseClient } from "../client/close-client.js";
import type { CustomField } from "../types/index.js";

export function registerCustomFieldsTools(server: any, client: CloseClient) {
  // List custom fields
  server.tool(
    "close_list_custom_fields",
    "List all custom fields",
    {
      object_type: {
        type: "string",
        description: "Object type (lead, contact, opportunity, activity)",
        required: false,
      },
    },
    async (args: any) => {
      const endpoint = args.object_type
        ? `/custom_field/${args.object_type}/`
        : "/custom_field/";

      const fields = await client.get<{ data: CustomField[] }>(endpoint);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(fields, null, 2),
          },
        ],
      };
    }
  );

  // Get custom field
  server.tool(
    "close_get_custom_field",
    "Get a specific custom field by ID",
    {
      object_type: {
        type: "string",
        description: "Object type (lead, contact, opportunity, activity)",
        required: true,
      },
      field_id: {
        type: "string",
        description: "Custom field ID",
        required: true,
      },
    },
    async (args: any) => {
      const field = await client.get<CustomField>(
        `/custom_field/${args.object_type}/${args.field_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(field, null, 2),
          },
        ],
      };
    }
  );

  // Create custom field
  server.tool(
    "close_create_custom_field",
    "Create a new custom field",
    {
      object_type: {
        type: "string",
        description: "Object type (lead, contact, opportunity, activity)",
        required: true,
      },
      name: {
        type: "string",
        description: "Field name",
        required: true,
      },
      type: {
        type: "string",
        description:
          "Field type (text, number, date, datetime, boolean, choices)",
        required: true,
      },
      required: {
        type: "boolean",
        description: "Is field required?",
        required: false,
      },
      accepts_multiple_values: {
        type: "boolean",
        description: "Accept multiple values?",
        required: false,
      },
      choices: {
        type: "string",
        description: "JSON array of choice values (for choices type)",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        name: args.name,
        type: args.type,
      };

      if (args.required !== undefined) body.required = args.required;
      if (args.accepts_multiple_values !== undefined)
        body.accepts_multiple_values = args.accepts_multiple_values;
      if (args.choices) body.choices = JSON.parse(args.choices);

      const field = await client.post<CustomField>(
        `/custom_field/${args.object_type}/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(field, null, 2),
          },
        ],
      };
    }
  );

  // Update custom field
  server.tool(
    "close_update_custom_field",
    "Update an existing custom field",
    {
      object_type: {
        type: "string",
        description: "Object type",
        required: true,
      },
      field_id: {
        type: "string",
        description: "Custom field ID",
        required: true,
      },
      name: {
        type: "string",
        description: "New field name",
        required: false,
      },
      required: {
        type: "boolean",
        description: "Is field required?",
        required: false,
      },
      choices: {
        type: "string",
        description: "JSON array of choice values",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {};

      if (args.name) body.name = args.name;
      if (args.required !== undefined) body.required = args.required;
      if (args.choices) body.choices = JSON.parse(args.choices);

      const field = await client.put<CustomField>(
        `/custom_field/${args.object_type}/${args.field_id}/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(field, null, 2),
          },
        ],
      };
    }
  );

  // Delete custom field
  server.tool(
    "close_delete_custom_field",
    "Delete a custom field",
    {
      object_type: {
        type: "string",
        description: "Object type",
        required: true,
      },
      field_id: {
        type: "string",
        description: "Custom field ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(
        `/custom_field/${args.object_type}/${args.field_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: `Custom field ${args.field_id} deleted successfully`,
          },
        ],
      };
    }
  );
}
