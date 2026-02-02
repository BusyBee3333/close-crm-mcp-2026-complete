#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============================================
// CONFIGURATION
// ============================================
const MCP_NAME = "close";
const MCP_VERSION = "1.0.0";
const API_BASE_URL = "https://api.close.com/api/v1";

// ============================================
// REST API CLIENT
// ============================================
class CloseClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = API_BASE_URL;
  }

  private getAuthHeader(): string {
    // Close uses Basic auth with API key as username, empty password
    return `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": this.getAuthHeader(),
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Close API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return response.json();
  }

  async get(endpoint: string, params: Record<string, any> = {}) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: "GET" });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

// ============================================
// TOOL DEFINITIONS
// ============================================
const tools = [
  {
    name: "list_leads",
    description: "List leads from Close CRM with optional search query",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Search query (Close query syntax)" },
        _limit: { type: "number", description: "Max results to return (default 100)" },
        _skip: { type: "number", description: "Number of results to skip (pagination)" },
        _fields: { type: "string", description: "Comma-separated list of fields to return" },
      },
    },
  },
  {
    name: "get_lead",
    description: "Get a specific lead by ID",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Lead ID (e.g., lead_xxx)" },
      },
      required: ["lead_id"],
    },
  },
  {
    name: "create_lead",
    description: "Create a new lead in Close CRM",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Lead/Company name" },
        url: { type: "string", description: "Company website URL" },
        description: { type: "string", description: "Lead description" },
        status_id: { type: "string", description: "Lead status ID" },
        contacts: {
          type: "array",
          description: "Array of contacts to add to the lead",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "Contact name" },
              title: { type: "string", description: "Job title" },
              emails: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    type: { type: "string", description: "office, home, direct, mobile, fax, other" },
                  },
                },
              },
              phones: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    phone: { type: "string" },
                    type: { type: "string", description: "office, home, direct, mobile, fax, other" },
                  },
                },
              },
            },
          },
        },
        addresses: {
          type: "array",
          description: "Lead addresses",
          items: {
            type: "object",
            properties: {
              address_1: { type: "string" },
              address_2: { type: "string" },
              city: { type: "string" },
              state: { type: "string" },
              zipcode: { type: "string" },
              country: { type: "string" },
            },
          },
        },
        custom: { type: "object", description: "Custom field values (key-value pairs)" },
      },
      required: ["name"],
    },
  },
  {
    name: "update_lead",
    description: "Update an existing lead",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Lead ID to update" },
        name: { type: "string", description: "Lead/Company name" },
        url: { type: "string", description: "Company website URL" },
        description: { type: "string", description: "Lead description" },
        status_id: { type: "string", description: "Lead status ID" },
        custom: { type: "object", description: "Custom field values to update" },
      },
      required: ["lead_id"],
    },
  },
  {
    name: "list_opportunities",
    description: "List opportunities from Close CRM",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Filter by lead ID" },
        status_id: { type: "string", description: "Filter by opportunity status ID" },
        user_id: { type: "string", description: "Filter by assigned user ID" },
        _limit: { type: "number", description: "Max results to return" },
        _skip: { type: "number", description: "Number of results to skip" },
      },
    },
  },
  {
    name: "create_opportunity",
    description: "Create a new opportunity/deal",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Lead ID to attach opportunity to" },
        status_id: { type: "string", description: "Opportunity status ID" },
        value: { type: "number", description: "Deal value in cents" },
        value_period: { type: "string", description: "one_time, monthly, annual" },
        confidence: { type: "number", description: "Confidence percentage (0-100)" },
        note: { type: "string", description: "Opportunity notes" },
        date_won: { type: "string", description: "Date won (YYYY-MM-DD)" },
      },
      required: ["lead_id"],
    },
  },
  {
    name: "create_activity",
    description: "Create an activity (note, call, email, meeting, etc.)",
    inputSchema: {
      type: "object" as const,
      properties: {
        activity_type: { type: "string", description: "Type: Note, Call, Email, Meeting, SMS" },
        lead_id: { type: "string", description: "Lead ID for the activity" },
        contact_id: { type: "string", description: "Contact ID (optional)" },
        user_id: { type: "string", description: "User ID who performed activity" },
        note: { type: "string", description: "Activity note/body content" },
        subject: { type: "string", description: "Subject (for emails)" },
        status: { type: "string", description: "Call status: completed, no-answer, busy, etc." },
        direction: { type: "string", description: "inbound or outbound" },
        duration: { type: "number", description: "Duration in seconds (for calls)" },
        date_created: { type: "string", description: "Activity date (ISO 8601)" },
      },
      required: ["activity_type", "lead_id"],
    },
  },
  {
    name: "list_tasks",
    description: "List tasks from Close CRM",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Filter by lead ID" },
        assigned_to: { type: "string", description: "Filter by assigned user ID" },
        is_complete: { type: "boolean", description: "Filter by completion status" },
        _type: { type: "string", description: "Task type: lead, opportunity, incoming_email, missed_call, etc." },
        _limit: { type: "number", description: "Max results to return" },
        _skip: { type: "number", description: "Number of results to skip" },
      },
    },
  },
  {
    name: "create_task",
    description: "Create a new task",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Lead ID for the task" },
        assigned_to: { type: "string", description: "User ID to assign task to" },
        text: { type: "string", description: "Task description" },
        date: { type: "string", description: "Due date (YYYY-MM-DD or ISO 8601)" },
        is_complete: { type: "boolean", description: "Task completion status" },
      },
      required: ["lead_id", "text"],
    },
  },
  {
    name: "send_email",
    description: "Send an email through Close CRM",
    inputSchema: {
      type: "object" as const,
      properties: {
        lead_id: { type: "string", description: "Lead ID" },
        contact_id: { type: "string", description: "Contact ID to send to" },
        to: { type: "array", items: { type: "string" }, description: "Recipient email addresses" },
        cc: { type: "array", items: { type: "string" }, description: "CC email addresses" },
        bcc: { type: "array", items: { type: "string" }, description: "BCC email addresses" },
        subject: { type: "string", description: "Email subject" },
        body_text: { type: "string", description: "Plain text body" },
        body_html: { type: "string", description: "HTML body" },
        status: { type: "string", description: "draft, outbox, sent" },
        template_id: { type: "string", description: "Email template ID to use" },
      },
      required: ["lead_id", "to", "subject"],
    },
  },
  {
    name: "list_statuses",
    description: "List lead and opportunity statuses",
    inputSchema: {
      type: "object" as const,
      properties: {
        type: { type: "string", description: "lead or opportunity" },
      },
    },
  },
  {
    name: "list_users",
    description: "List users in the Close organization",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
];

// ============================================
// TOOL HANDLERS
// ============================================
async function handleTool(client: CloseClient, name: string, args: any) {
  switch (name) {
    case "list_leads": {
      const { query, _limit = 100, _skip, _fields } = args;
      const params: any = { _limit };
      if (query) params.query = query;
      if (_skip) params._skip = _skip;
      if (_fields) params._fields = _fields;
      return await client.get("/lead/", params);
    }
    case "get_lead": {
      const { lead_id } = args;
      return await client.get(`/lead/${lead_id}/`);
    }
    case "create_lead": {
      const { name, url, description, status_id, contacts, addresses, custom } = args;
      const data: any = { name };
      if (url) data.url = url;
      if (description) data.description = description;
      if (status_id) data.status_id = status_id;
      if (contacts) data.contacts = contacts;
      if (addresses) data.addresses = addresses;
      if (custom) data.custom = custom;
      return await client.post("/lead/", data);
    }
    case "update_lead": {
      const { lead_id, ...updates } = args;
      return await client.put(`/lead/${lead_id}/`, updates);
    }
    case "list_opportunities": {
      const { lead_id, status_id, user_id, _limit = 100, _skip } = args;
      const params: any = { _limit };
      if (lead_id) params.lead_id = lead_id;
      if (status_id) params.status_id = status_id;
      if (user_id) params.user_id = user_id;
      if (_skip) params._skip = _skip;
      return await client.get("/opportunity/", params);
    }
    case "create_opportunity": {
      const { lead_id, status_id, value, value_period, confidence, note, date_won } = args;
      const data: any = { lead_id };
      if (status_id) data.status_id = status_id;
      if (value !== undefined) data.value = value;
      if (value_period) data.value_period = value_period;
      if (confidence !== undefined) data.confidence = confidence;
      if (note) data.note = note;
      if (date_won) data.date_won = date_won;
      return await client.post("/opportunity/", data);
    }
    case "create_activity": {
      const { activity_type, lead_id, contact_id, user_id, note, subject, status, direction, duration, date_created } = args;
      
      // Map activity type to endpoint
      const typeMap: Record<string, string> = {
        'Note': 'note',
        'Call': 'call',
        'Email': 'email',
        'Meeting': 'meeting',
        'SMS': 'sms',
      };
      const endpoint = typeMap[activity_type] || activity_type.toLowerCase();
      
      const data: any = { lead_id };
      if (contact_id) data.contact_id = contact_id;
      if (user_id) data.user_id = user_id;
      if (note) data.note = note;
      if (subject) data.subject = subject;
      if (status) data.status = status;
      if (direction) data.direction = direction;
      if (duration) data.duration = duration;
      if (date_created) data.date_created = date_created;
      
      return await client.post(`/activity/${endpoint}/`, data);
    }
    case "list_tasks": {
      const { lead_id, assigned_to, is_complete, _type, _limit = 100, _skip } = args;
      const params: any = { _limit };
      if (lead_id) params.lead_id = lead_id;
      if (assigned_to) params.assigned_to = assigned_to;
      if (is_complete !== undefined) params.is_complete = is_complete;
      if (_type) params._type = _type;
      if (_skip) params._skip = _skip;
      return await client.get("/task/", params);
    }
    case "create_task": {
      const { lead_id, assigned_to, text, date, is_complete } = args;
      const data: any = { lead_id, text };
      if (assigned_to) data.assigned_to = assigned_to;
      if (date) data.date = date;
      if (is_complete !== undefined) data.is_complete = is_complete;
      return await client.post("/task/", data);
    }
    case "send_email": {
      const { lead_id, contact_id, to, cc, bcc, subject, body_text, body_html, status, template_id } = args;
      const data: any = { lead_id, to, subject };
      if (contact_id) data.contact_id = contact_id;
      if (cc) data.cc = cc;
      if (bcc) data.bcc = bcc;
      if (body_text) data.body_text = body_text;
      if (body_html) data.body_html = body_html;
      if (status) data.status = status;
      if (template_id) data.template_id = template_id;
      return await client.post("/activity/email/", data);
    }
    case "list_statuses": {
      const { type } = args;
      if (type === 'opportunity') {
        return await client.get("/status/opportunity/");
      }
      return await client.get("/status/lead/");
    }
    case "list_users": {
      return await client.get("/user/");
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================
// SERVER SETUP
// ============================================
async function main() {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) {
    console.error("Error: CLOSE_API_KEY environment variable required");
    console.error("Get your API key at Settings > Integrations > API Keys in Close");
    process.exit(1);
  }

  const client = new CloseClient(apiKey);

  const server = new Server(
    { name: `${MCP_NAME}-mcp`, version: MCP_VERSION },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      const result = await handleTool(client, name, args || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${MCP_NAME} MCP server running on stdio`);
}

main().catch(console.error);
