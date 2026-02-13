// Sequences and automation tools

import type { CloseClient } from "../client/close-client.js";
import type { Sequence, SequenceSubscription } from "../types/index.js";

export function registerSequencesTools(server: any, client: CloseClient) {
  // List sequences
  server.tool(
    "close_list_sequences",
    "List all email sequences",
    {},
    async () => {
      const sequences = await client.get<{ data: Sequence[] }>("/sequence/");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(sequences, null, 2),
          },
        ],
      };
    }
  );

  // Get sequence
  server.tool(
    "close_get_sequence",
    "Get a specific sequence by ID",
    {
      sequence_id: {
        type: "string",
        description: "Sequence ID",
        required: true,
      },
    },
    async (args: any) => {
      const sequence = await client.get<Sequence>(
        `/sequence/${args.sequence_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(sequence, null, 2),
          },
        ],
      };
    }
  );

  // Create sequence
  server.tool(
    "close_create_sequence",
    "Create a new email sequence",
    {
      name: {
        type: "string",
        description: "Sequence name",
        required: true,
      },
      max_activations: {
        type: "number",
        description: "Maximum activations per lead",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        name: args.name,
      };

      if (args.max_activations)
        body.max_activations = args.max_activations;

      const sequence = await client.post<Sequence>("/sequence/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(sequence, null, 2),
          },
        ],
      };
    }
  );

  // Subscribe lead to sequence
  server.tool(
    "close_subscribe_lead_to_sequence",
    "Subscribe a lead to an email sequence",
    {
      sequence_id: {
        type: "string",
        description: "Sequence ID",
        required: true,
      },
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      contact_id: {
        type: "string",
        description: "Contact ID (optional, for specific contact)",
        required: false,
      },
      sender_account_id: {
        type: "string",
        description: "Sender email account ID",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
      };

      if (args.contact_id) body.contact_id = args.contact_id;
      if (args.sender_account_id)
        body.sender_account_id = args.sender_account_id;

      const subscription = await client.post<SequenceSubscription>(
        `/sequence/${args.sequence_id}/subscribe/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(subscription, null, 2),
          },
        ],
      };
    }
  );

  // Unsubscribe lead from sequence
  server.tool(
    "close_unsubscribe_lead_from_sequence",
    "Unsubscribe a lead from a sequence",
    {
      subscription_id: {
        type: "string",
        description: "Sequence subscription ID",
        required: true,
      },
    },
    async (args: any) => {
      await client.delete(
        `/sequence_subscription/${args.subscription_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: `Lead unsubscribed from sequence successfully`,
          },
        ],
      };
    }
  );

  // Get sequence stats
  server.tool(
    "close_get_sequence_stats",
    "Get statistics for a sequence",
    {
      sequence_id: {
        type: "string",
        description: "Sequence ID",
        required: true,
      },
    },
    async (args: any) => {
      const stats = await client.get(
        `/sequence/${args.sequence_id}/stats/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    }
  );
}
