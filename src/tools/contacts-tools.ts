// Contact management tools

import type { CloseClient } from "../client/close-client.js";
import type { Contact } from "../types/index.js";

export function registerContactsTools(server: any, client: CloseClient) {
  // List contacts
  server.tool(
    "close_list_contacts",
    "List all contacts with optional filtering",
    {
      lead_id: {
        type: "string",
        description: "Filter by lead ID",
        required: false,
      },
      query: {
        type: "string",
        description: "Search query",
        required: false,
      },
      limit: {
        type: "number",
        description: "Number of results",
        required: false,
      },
    },
    async (args: any) => {
      const params: any = {
        query: args.query,
        limit: args.limit,
      };

      if (args.lead_id) {
        params.lead_id = args.lead_id;
      }

      const contacts = await client.search<Contact>("/contact/", params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(contacts, null, 2),
          },
        ],
      };
    }
  );

  // Get contact
  server.tool(
    "close_get_contact",
    "Get a specific contact by ID",
    {
      contact_id: {
        type: "string",
        description: "Contact ID",
        required: true,
      },
    },
    async (args: any) => {
      const contact = await client.get<Contact>(
        `/contact/${args.contact_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(contact, null, 2),
          },
        ],
      };
    }
  );

  // Create contact
  server.tool(
    "close_create_contact",
    "Create a new contact",
    {
      lead_id: {
        type: "string",
        description: "Lead ID to associate contact with",
        required: true,
      },
      name: {
        type: "string",
        description: "Contact name",
        required: true,
      },
      title: {
        type: "string",
        description: "Job title",
        required: false,
      },
      emails: {
        type: "string",
        description: 'JSON array of email objects (e.g., [{"email":"test@example.com","type":"office"}])',
        required: false,
      },
      phones: {
        type: "string",
        description: 'JSON array of phone objects (e.g., [{"phone":"+1234567890","type":"mobile"}])',
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        name: args.name,
        title: args.title,
      };

      if (args.emails) {
        body.emails = JSON.parse(args.emails);
      }

      if (args.phones) {
        body.phones = JSON.parse(args.phones);
      }

      const contact = await client.post<Contact>("/contact/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(contact, null, 2),
          },
        ],
      };
    }
  );

  // Update contact
  server.tool(
    "close_update_contact",
    "Update an existing contact",
    {
      contact_id: {
        type: "string",
        description: "Contact ID",
        required: true,
      },
      name: {
        type: "string",
        description: "Contact name",
        required: false,
      },
      title: {
        type: "string",
        description: "Job title",
        required: false,
      },
      emails: {
        type: "string",
        description: "JSON array of email objects",
        required: false,
      },
      phones: {
        type: "string",
        description: "JSON array of phone objects",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {};

      if (args.name) body.name = args.name;
      if (args.title) body.title = args.title;
      if (args.emails) body.emails = JSON.parse(args.emails);
      if (args.phones) body.phones = JSON.parse(args.phones);

      const contact = await client.put<Contact>(
        `/contact/${args.contact_id}/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(contact, null, 2),
          },
        ],
      };
    }
  );

  // Delete contact
  server.tool(
    "close_delete_contact",
    "Delete a contact",
    {
      contact_id: {
        type: "string",
        description: "Contact ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(`/contact/${args.contact_id}/`);
      return {
        content: [
          {
            type: "text",
            text: `Contact ${args.contact_id} deleted successfully`,
          },
        ],
      };
    }
  );
}
