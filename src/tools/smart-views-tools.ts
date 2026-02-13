// Smart Views management tools

import type { CloseClient } from "../client/close-client.js";
import type { SmartView } from "../types/index.js";

export function registerSmartViewsTools(server: any, client: CloseClient) {
  // List smart views
  server.tool(
    "close_list_smart_views",
    "List all smart views",
    {},
    async () => {
      const views = await client.get<{ data: SmartView[] }>("/saved_search/");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(views, null, 2),
          },
        ],
      };
    }
  );

  // Get smart view
  server.tool(
    "close_get_smart_view",
    "Get a specific smart view by ID",
    {
      view_id: {
        type: "string",
        description: "Smart view ID",
        required: true,
      },
    },
    async (args: any) => {
      const view = await client.get<SmartView>(
        `/saved_search/${args.view_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(view, null, 2),
          },
        ],
      };
    }
  );

  // Create smart view
  server.tool(
    "close_create_smart_view",
    "Create a new smart view (saved search)",
    {
      name: {
        type: "string",
        description: "Smart view name",
        required: true,
      },
      query: {
        type: "string",
        description: "Search query",
        required: true,
      },
      type: {
        type: "string",
        description: "View type (e.g., 'lead')",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        name: args.name,
        query: args.query,
      };

      if (args.type) {
        body.type = args.type;
      }

      const view = await client.post<SmartView>("/saved_search/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(view, null, 2),
          },
        ],
      };
    }
  );

  // Update smart view
  server.tool(
    "close_update_smart_view",
    "Update an existing smart view",
    {
      view_id: {
        type: "string",
        description: "Smart view ID",
        required: true,
      },
      name: {
        type: "string",
        description: "New name",
        required: false,
      },
      query: {
        type: "string",
        description: "New query",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {};

      if (args.name) body.name = args.name;
      if (args.query) body.query = args.query;

      const view = await client.put<SmartView>(
        `/saved_search/${args.view_id}/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(view, null, 2),
          },
        ],
      };
    }
  );

  // Delete smart view
  server.tool(
    "close_delete_smart_view",
    "Delete a smart view",
    {
      view_id: {
        type: "string",
        description: "Smart view ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(`/saved_search/${args.view_id}/`);
      return {
        content: [
          {
            type: "text",
            text: `Smart view ${args.view_id} deleted successfully`,
          },
        ],
      };
    }
  );
}
