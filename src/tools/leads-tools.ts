// Lead management tools

import type { CloseClient } from "../client/close-client.js";
import type { Lead, CustomField } from "../types/index.js";

export function registerLeadsTools(server: any, client: CloseClient) {
  // List leads
  server.tool(
    "close_list_leads",
    "List all leads with optional filtering",
    {
      query: {
        type: "string",
        description: "Search query (e.g., 'name:Acme')",
        required: false,
      },
      limit: {
        type: "number",
        description: "Number of results to return",
        required: false,
      },
    },
    async (args: any) => {
      const leads = await client.search<Lead>("/lead/", {
        query: args.query,
        limit: args.limit,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(leads, null, 2),
          },
        ],
      };
    }
  );

  // Get lead by ID
  server.tool(
    "close_get_lead",
    "Get a specific lead by ID",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
    },
    async (args: any) => {
      const lead = await client.get<Lead>(`/lead/${args.lead_id}/`);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(lead, null, 2),
          },
        ],
      };
    }
  );

  // Create lead
  server.tool(
    "close_create_lead",
    "Create a new lead",
    {
      name: {
        type: "string",
        description: "Lead name (company name)",
        required: true,
      },
      description: {
        type: "string",
        description: "Lead description",
        required: false,
      },
      url: {
        type: "string",
        description: "Lead website URL",
        required: false,
      },
      status_id: {
        type: "string",
        description: "Lead status ID",
        required: false,
      },
      contacts: {
        type: "string",
        description: "JSON array of contact objects",
        required: false,
      },
      custom: {
        type: "string",
        description: "JSON object of custom field values",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        name: args.name,
        description: args.description,
        url: args.url,
        status_id: args.status_id,
      };

      if (args.contacts) {
        body.contacts = JSON.parse(args.contacts);
      }

      if (args.custom) {
        body.custom = JSON.parse(args.custom);
      }

      const lead = await client.post<Lead>("/lead/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(lead, null, 2),
          },
        ],
      };
    }
  );

  // Update lead
  server.tool(
    "close_update_lead",
    "Update an existing lead",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      name: {
        type: "string",
        description: "Lead name",
        required: false,
      },
      description: {
        type: "string",
        description: "Lead description",
        required: false,
      },
      url: {
        type: "string",
        description: "Lead website URL",
        required: false,
      },
      status_id: {
        type: "string",
        description: "Lead status ID",
        required: false,
      },
      custom: {
        type: "string",
        description: "JSON object of custom field values",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {};

      if (args.name) body.name = args.name;
      if (args.description) body.description = args.description;
      if (args.url) body.url = args.url;
      if (args.status_id) body.status_id = args.status_id;
      if (args.custom) body.custom = JSON.parse(args.custom);

      const lead = await client.put<Lead>(`/lead/${args.lead_id}/`, body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(lead, null, 2),
          },
        ],
      };
    }
  );

  // Delete lead
  server.tool(
    "close_delete_lead",
    "Delete a lead",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(`/lead/${args.lead_id}/`);
      return {
        content: [
          {
            type: "text",
            text: `Lead ${args.lead_id} deleted successfully`,
          },
        ],
      };
    }
  );

  // Search leads
  server.tool(
    "close_search_leads",
    "Search leads with advanced query syntax",
    {
      query: {
        type: "string",
        description:
          "Search query (e.g., 'name:Acme status:\"Potential\" email:*@acme.com')",
        required: true,
      },
      limit: {
        type: "number",
        description: "Max results to return",
        required: false,
      },
    },
    async (args: any) => {
      const leads = await client.search<Lead>("/lead/", {
        query: args.query,
        limit: args.limit || 100,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                count: leads.length,
                leads: leads,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Merge leads
  server.tool(
    "close_merge_leads",
    "Merge two leads together",
    {
      source_lead_id: {
        type: "string",
        description: "Lead ID to merge from (will be deleted)",
        required: true,
      },
      destination_lead_id: {
        type: "string",
        description: "Lead ID to merge into (will be kept)",
        required: true,
      },
    },
    async (args: any) => {
      const result = await client.post(
        `/lead/${args.destination_lead_id}/merge/`,
        {
          source: args.source_lead_id,
        }
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // List lead custom fields
  server.tool(
    "close_list_lead_custom_fields",
    "List all custom fields for leads",
    {},
    async () => {
      const fields = await client.get<{ data: CustomField[] }>(
        "/custom_field/lead/"
      );
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
}
