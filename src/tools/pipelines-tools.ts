// Pipeline and status management tools

import type { CloseClient } from "../client/close-client.js";
import type { Pipeline, OpportunityStatus } from "../types/index.js";

export function registerPipelinesTools(server: any, client: CloseClient) {
  // List pipelines
  server.tool(
    "close_list_pipelines",
    "List all opportunity pipelines",
    {},
    async () => {
      const pipelines = await client.get<{ data: Pipeline[] }>("/pipeline/");
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

  // Get pipeline
  server.tool(
    "close_get_pipeline",
    "Get a specific pipeline by ID",
    {
      pipeline_id: {
        type: "string",
        description: "Pipeline ID",
        required: true,
      },
    },
    async (args: any) => {
      const pipeline = await client.get<Pipeline>(
        `/pipeline/${args.pipeline_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(pipeline, null, 2),
          },
        ],
      };
    }
  );

  // Create pipeline
  server.tool(
    "close_create_pipeline",
    "Create a new opportunity pipeline",
    {
      name: {
        type: "string",
        description: "Pipeline name",
        required: true,
      },
    },
    async (args: any) => {
      const pipeline = await client.post<Pipeline>("/pipeline/", {
        name: args.name,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(pipeline, null, 2),
          },
        ],
      };
    }
  );

  // Update pipeline
  server.tool(
    "close_update_pipeline",
    "Update an existing pipeline",
    {
      pipeline_id: {
        type: "string",
        description: "Pipeline ID",
        required: true,
      },
      name: {
        type: "string",
        description: "New pipeline name",
        required: true,
      },
    },
    async (args: any) => {
      const pipeline = await client.put<Pipeline>(
        `/pipeline/${args.pipeline_id}/`,
        {
          name: args.name,
        }
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(pipeline, null, 2),
          },
        ],
      };
    }
  );

  // Delete pipeline
  server.tool(
    "close_delete_pipeline",
    "Delete a pipeline",
    {
      pipeline_id: {
        type: "string",
        description: "Pipeline ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(`/pipeline/${args.pipeline_id}/`);
      return {
        content: [
          {
            type: "text",
            text: `Pipeline ${args.pipeline_id} deleted successfully`,
          },
        ],
      };
    }
  );

  // List opportunity statuses
  server.tool(
    "close_list_opportunity_statuses",
    "List all opportunity statuses",
    {
      pipeline_id: {
        type: "string",
        description: "Filter by pipeline ID",
        required: false,
      },
    },
    async (args: any) => {
      const endpoint = "/status/opportunity/";
      const params = args.pipeline_id
        ? { pipeline_id: args.pipeline_id }
        : undefined;

      const statuses = await client.get<{ data: OpportunityStatus[] }>(
        endpoint,
        params
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
}
