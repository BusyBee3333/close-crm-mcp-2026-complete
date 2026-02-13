// Opportunity management tools

import type { CloseClient } from "../client/close-client.js";
import type { Opportunity, OpportunityStatus, Pipeline } from "../types/index.js";

export function registerOpportunitiesTools(server: any, client: CloseClient) {
  // List opportunities
  server.tool(
    "close_list_opportunities",
    "List all opportunities with optional filtering",
    {
      lead_id: {
        type: "string",
        description: "Filter by lead ID",
        required: false,
      },
      status_id: {
        type: "string",
        description: "Filter by status ID",
        required: false,
      },
      limit: {
        type: "number",
        description: "Number of results",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = { limit: args.limit };
      if (args.lead_id) params.lead_id = args.lead_id;
      if (args.status_id) params.status_id = args.status_id;

      const opps = await client.search<Opportunity>("/opportunity/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(opps, null, 2),
          },
        ],
      };
    }
  );

  // Get opportunity
  server.tool(
    "close_get_opportunity",
    "Get a specific opportunity by ID",
    {
      opportunity_id: {
        type: "string",
        description: "Opportunity ID",
        required: true,
      },
    },
    async (args: any) => {
      const opp = await client.get<Opportunity>(
        `/opportunity/${args.opportunity_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(opp, null, 2),
          },
        ],
      };
    }
  );

  // Create opportunity
  server.tool(
    "close_create_opportunity",
    "Create a new opportunity",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      status_id: {
        type: "string",
        description: "Opportunity status ID",
        required: true,
      },
      value: {
        type: "number",
        description: "Opportunity value (amount)",
        required: false,
      },
      value_period: {
        type: "string",
        description: "Value period (one_time, monthly, annual)",
        required: false,
      },
      confidence: {
        type: "number",
        description: "Confidence percentage (0-100)",
        required: false,
      },
      note: {
        type: "string",
        description: "Opportunity notes",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        status_id: args.status_id,
      };

      if (args.value !== undefined) body.value = args.value;
      if (args.value_period) body.value_period = args.value_period;
      if (args.confidence !== undefined) body.confidence = args.confidence;
      if (args.note) body.note = args.note;

      const opp = await client.post<Opportunity>("/opportunity/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(opp, null, 2),
          },
        ],
      };
    }
  );

  // Update opportunity
  server.tool(
    "close_update_opportunity",
    "Update an existing opportunity",
    {
      opportunity_id: {
        type: "string",
        description: "Opportunity ID",
        required: true,
      },
      status_id: {
        type: "string",
        description: "New status ID",
        required: false,
      },
      value: {
        type: "number",
        description: "Opportunity value",
        required: false,
      },
      confidence: {
        type: "number",
        description: "Confidence percentage",
        required: false,
      },
      note: {
        type: "string",
        description: "Opportunity notes",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {};

      if (args.status_id) body.status_id = args.status_id;
      if (args.value !== undefined) body.value = args.value;
      if (args.confidence !== undefined) body.confidence = args.confidence;
      if (args.note) body.note = args.note;

      const opp = await client.put<Opportunity>(
        `/opportunity/${args.opportunity_id}/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(opp, null, 2),
          },
        ],
      };
    }
  );

  // Delete opportunity
  server.tool(
    "close_delete_opportunity",
    "Delete an opportunity",
    {
      opportunity_id: {
        type: "string",
        description: "Opportunity ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(`/opportunity/${args.opportunity_id}/`);
      return {
        content: [
          {
            type: "text",
            text: `Opportunity ${args.opportunity_id} deleted successfully`,
          },
        ],
      };
    }
  );

  // List opportunity statuses
  server.tool(
    "close_list_opportunity_statuses",
    "List all opportunity statuses",
    {},
    async () => {
      const statuses = await client.get<{ data: OpportunityStatus[] }>(
        "/status/opportunity/"
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(statuses, null, 2),
          },
        ],
      };
    }
  );

  // List pipelines
  server.tool(
    "close_list_pipelines",
    "List all opportunity pipelines",
    {},
    async () => {
      const pipelines = await client.get<{ data: Pipeline[] }>(
        "/pipeline/"
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(pipelines, null, 2),
          },
        ],
      };
    }
  );
}
