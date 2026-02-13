// Bulk operations tools

import type { CloseClient } from "../client/close-client.js";
import type {
  BulkEditRequest,
  BulkDeleteRequest,
  BulkEmailRequest,
} from "../types/index.js";

export function registerBulkTools(server: any, client: CloseClient) {
  // Bulk edit leads
  server.tool(
    "close_bulk_edit_leads",
    "Bulk edit multiple leads at once",
    {
      lead_ids: {
        type: "string",
        description: "JSON array of lead IDs",
        required: false,
      },
      query: {
        type: "string",
        description: "Search query to select leads",
        required: false,
      },
      updates: {
        type: "string",
        description: "JSON object with field updates",
        required: true,
      },
    },
    async (args: any) => {
      const body: BulkEditRequest = {
        updates: JSON.parse(args.updates),
      };

      if (args.lead_ids) {
        body.lead_ids = JSON.parse(args.lead_ids);
      }

      if (args.query) {
        body.query = args.query;
      }

      const result = await client.post("/lead/bulk_action/edit/", body);
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

  // Bulk delete leads
  server.tool(
    "close_bulk_delete_leads",
    "Bulk delete multiple leads",
    {
      lead_ids: {
        type: "string",
        description: "JSON array of lead IDs",
        required: false,
      },
      query: {
        type: "string",
        description: "Search query to select leads",
        required: false,
      },
    },
    async (args: any) => {
      const body: BulkDeleteRequest = {};

      if (args.lead_ids) {
        body.lead_ids = JSON.parse(args.lead_ids);
      }

      if (args.query) {
        body.query = args.query;
      }

      const result = await client.post("/lead/bulk_action/delete/", body);
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

  // Bulk email
  server.tool(
    "close_bulk_email",
    "Send bulk email to multiple leads",
    {
      lead_ids: {
        type: "string",
        description: "JSON array of lead IDs",
        required: false,
      },
      query: {
        type: "string",
        description: "Search query to select leads",
        required: false,
      },
      subject: {
        type: "string",
        description: "Email subject",
        required: true,
      },
      body: {
        type: "string",
        description: "Email body (HTML or plain text)",
        required: true,
      },
      template_id: {
        type: "string",
        description: "Email template ID",
        required: false,
      },
      sender: {
        type: "string",
        description: "Sender email address",
        required: false,
      },
    },
    async (args: any) => {
      const body: BulkEmailRequest = {
        subject: args.subject,
        body: args.body,
      };

      if (args.lead_ids) {
        body.lead_ids = JSON.parse(args.lead_ids);
      }

      if (args.query) {
        body.query = args.query;
      }

      if (args.template_id) {
        body.template_id = args.template_id;
      }

      if (args.sender) {
        body.sender = args.sender;
      }

      const result = await client.post("/bulk_action/email/", body);
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

  // Bulk update opportunity status
  server.tool(
    "close_bulk_update_opportunity_status",
    "Bulk update opportunity statuses",
    {
      opportunity_ids: {
        type: "string",
        description: "JSON array of opportunity IDs",
        required: true,
      },
      status_id: {
        type: "string",
        description: "New status ID",
        required: true,
      },
    },
    async (args: any) => {
      const body = {
        opportunity_ids: JSON.parse(args.opportunity_ids),
        updates: {
          status_id: args.status_id,
        },
      };

      const result = await client.post(
        "/opportunity/bulk_action/edit/",
        body
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
}
