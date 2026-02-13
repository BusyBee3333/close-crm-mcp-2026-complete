// Activity management tools (notes, calls, emails, SMS, meetings)

import type { CloseClient } from "../client/close-client.js";
import type { Activity, Note, Call, Email, SMS, Meeting } from "../types/index.js";

export function registerActivitiesTools(server: any, client: CloseClient) {
  // List activities
  server.tool(
    "close_list_activities",
    "List activities (notes, calls, emails, etc.)",
    {
      lead_id: {
        type: "string",
        description: "Filter by lead ID",
        required: false,
      },
      type: {
        type: "string",
        description: "Activity type (note, call, email, sms, meeting)",
        required: false,
      },
      limit: {
        type: "number",
        description: "Number of results",
        required: false,
      },
    },
    async (args: any) => {
      const endpoint = args.type ? `/activity/${args.type}/` : "/activity/";
      const params: any = { limit: args.limit };
      if (args.lead_id) params.lead_id = args.lead_id;

      const activities = await client.search<Activity>(endpoint, params);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(activities, null, 2),
          },
        ],
      };
    }
  );

  // Get activity
  server.tool(
    "close_get_activity",
    "Get a specific activity by type and ID",
    {
      activity_type: {
        type: "string",
        description: "Activity type (note, call, email, sms, meeting)",
        required: true,
      },
      activity_id: {
        type: "string",
        description: "Activity ID",
        required: true,
      },
    },
    async (args: any) => {
      const activity = await client.get<Activity>(
        `/activity/${args.activity_type}/${args.activity_id}/`
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(activity, null, 2),
          },
        ],
      };
    }
  );

  // Create note
  server.tool(
    "close_create_note",
    "Create a note activity",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      note: {
        type: "string",
        description: "Note content",
        required: true,
      },
      contact_id: {
        type: "string",
        description: "Contact ID (optional)",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        note: args.note,
      };

      if (args.contact_id) {
        body.contact_id = args.contact_id;
      }

      const note = await client.post<Note>("/activity/note/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(note, null, 2),
          },
        ],
      };
    }
  );

  // Create call
  server.tool(
    "close_create_call",
    "Log a call activity",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      direction: {
        type: "string",
        description: "Call direction (inbound or outbound)",
        required: true,
      },
      phone: {
        type: "string",
        description: "Phone number",
        required: false,
      },
      duration: {
        type: "number",
        description: "Call duration in seconds",
        required: false,
      },
      note: {
        type: "string",
        description: "Call notes",
        required: false,
      },
      disposition: {
        type: "string",
        description: "Call disposition",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        direction: args.direction,
      };

      if (args.phone) body.phone = args.phone;
      if (args.duration) body.duration = args.duration;
      if (args.note) body.note = args.note;
      if (args.disposition) body.disposition = args.disposition;

      const call = await client.post<Call>("/activity/call/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(call, null, 2),
          },
        ],
      };
    }
  );

  // Create email
  server.tool(
    "close_create_email",
    "Log an email activity",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      direction: {
        type: "string",
        description: "Email direction (inbound or outbound)",
        required: true,
      },
      subject: {
        type: "string",
        description: "Email subject",
        required: true,
      },
      body_text: {
        type: "string",
        description: "Email body (plain text)",
        required: false,
      },
      body_html: {
        type: "string",
        description: "Email body (HTML)",
        required: false,
      },
      sender: {
        type: "string",
        description: "Sender email address",
        required: false,
      },
      to: {
        type: "string",
        description: "JSON array of recipient email addresses",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        direction: args.direction,
        subject: args.subject,
      };

      if (args.body_text) body.body_text = args.body_text;
      if (args.body_html) body.body_html = args.body_html;
      if (args.sender) body.sender = args.sender;
      if (args.to) body.to = JSON.parse(args.to);

      const email = await client.post<Email>("/activity/email/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(email, null, 2),
          },
        ],
      };
    }
  );

  // Create SMS
  server.tool(
    "close_create_sms",
    "Log an SMS activity",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      text: {
        type: "string",
        description: "SMS message text",
        required: true,
      },
      direction: {
        type: "string",
        description: "SMS direction (inbound or outbound)",
        required: true,
      },
      remote_phone: {
        type: "string",
        description: "Remote phone number",
        required: false,
      },
      local_phone: {
        type: "string",
        description: "Local phone number",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        text: args.text,
        direction: args.direction,
      };

      if (args.remote_phone) body.remote_phone = args.remote_phone;
      if (args.local_phone) body.local_phone = args.local_phone;

      const sms = await client.post<SMS>("/activity/sms/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(sms, null, 2),
          },
        ],
      };
    }
  );

  // Create meeting
  server.tool(
    "close_create_meeting",
    "Create a meeting activity",
    {
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      title: {
        type: "string",
        description: "Meeting title",
        required: true,
      },
      starts_at: {
        type: "string",
        description: "Start time (ISO 8601 format)",
        required: true,
      },
      ends_at: {
        type: "string",
        description: "End time (ISO 8601 format)",
        required: false,
      },
      location: {
        type: "string",
        description: "Meeting location",
        required: false,
      },
      note: {
        type: "string",
        description: "Meeting notes",
        required: false,
      },
    },
    async (args: any) => {
      const body: any = {
        lead_id: args.lead_id,
        title: args.title,
        starts_at: args.starts_at,
      };

      if (args.ends_at) body.ends_at = args.ends_at;
      if (args.location) body.location = args.location;
      if (args.note) body.note = args.note;

      const meeting = await client.post<Meeting>("/activity/meeting/", body);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(meeting, null, 2),
          },
        ],
      };
    }
  );

  // Log generic activity
  server.tool(
    "close_log_activity",
    "Log a generic activity",
    {
      activity_type: {
        type: "string",
        description: "Activity type",
        required: true,
      },
      lead_id: {
        type: "string",
        description: "Lead ID",
        required: true,
      },
      data: {
        type: "string",
        description: "JSON object with activity data",
        required: true,
      },
    },
    async (args: any) => {
      const body = {
        lead_id: args.lead_id,
        ...JSON.parse(args.data),
      };

      const activity = await client.post<Activity>(
        `/activity/${args.activity_type}/`,
        body
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(activity, null, 2),
          },
        ],
      };
    }
  );
}
