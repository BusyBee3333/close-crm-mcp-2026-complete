/**
 * Close CRM MCP Tools - 60+ Tools
 * Complete tool definitions for MCP server
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const CLOSE_TOOLS: Tool[] = [
  // ============================================================================
  // LEAD TOOLS (10 tools)
  // ============================================================================
  {
    name: 'close_list_leads',
    description: 'List all leads with optional filtering and pagination',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        status_id: { type: 'string', description: 'Filter by status ID' },
        user_id: { type: 'string', description: 'Filter by assigned user ID' },
        _skip: { type: 'number', description: 'Number of records to skip (pagination)' },
        _limit: { type: 'number', description: 'Max number of records to return (default: 100)' },
      },
    },
  },
  {
    name: 'close_get_lead',
    description: 'Get a specific lead by ID with all details',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Lead ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_lead',
    description: 'Create a new lead',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Company/lead name' },
        description: { type: 'string', description: 'Lead description' },
        url: { type: 'string', description: 'Company website URL' },
        status_id: { type: 'string', description: 'Lead status ID' },
        contacts: {
          type: 'array',
          description: 'Array of contacts to create with this lead',
          items: { type: 'object' },
        },
        custom: { type: 'object', description: 'Custom field values (key-value pairs)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'close_update_lead',
    description: 'Update an existing lead',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Lead ID' },
        name: { type: 'string', description: 'Company/lead name' },
        description: { type: 'string', description: 'Lead description' },
        url: { type: 'string', description: 'Company website URL' },
        status_id: { type: 'string', description: 'Lead status ID' },
        custom: { type: 'object', description: 'Custom field values' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_delete_lead',
    description: 'Delete a lead permanently',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Lead ID to delete' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_search_leads',
    description: 'Search leads with advanced query',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (supports field:value syntax)' },
        _limit: { type: 'number', description: 'Max results' },
      },
      required: ['query'],
    },
  },
  {
    name: 'close_merge_leads',
    description: 'Merge two leads (moves all data from source to destination)',
    inputSchema: {
      type: 'object',
      properties: {
        source: { type: 'string', description: 'Source lead ID (will be deleted)' },
        destination: { type: 'string', description: 'Destination lead ID (will receive all data)' },
      },
      required: ['source', 'destination'],
    },
  },
  {
    name: 'close_get_lead_statuses',
    description: 'Get all available lead statuses',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'close_bulk_update_leads',
    description: 'Update multiple leads at once',
    inputSchema: {
      type: 'object',
      properties: {
        lead_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of lead IDs to update',
        },
        status_id: { type: 'string', description: 'New status ID' },
        custom: { type: 'object', description: 'Custom field updates' },
      },
      required: ['lead_ids'],
    },
  },
  {
    name: 'close_bulk_delete_leads',
    description: 'Delete multiple leads at once',
    inputSchema: {
      type: 'object',
      properties: {
        lead_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of lead IDs to delete',
        },
      },
      required: ['lead_ids'],
    },
  },

  // ============================================================================
  // CONTACT TOOLS (7 tools)
  // ============================================================================
  {
    name: 'close_list_contacts',
    description: 'List all contacts with pagination',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Filter by lead ID' },
        _skip: { type: 'number', description: 'Pagination skip' },
        _limit: { type: 'number', description: 'Pagination limit' },
      },
    },
  },
  {
    name: 'close_get_contact',
    description: 'Get a specific contact by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Contact ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_contact',
    description: 'Create a new contact',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID this contact belongs to' },
        name: { type: 'string', description: 'Contact full name' },
        title: { type: 'string', description: 'Job title' },
        emails: {
          type: 'array',
          description: 'Array of email objects [{email: "...", type: "office"}]',
          items: { type: 'object' },
        },
        phones: {
          type: 'array',
          description: 'Array of phone objects [{phone: "...", type: "mobile"}]',
          items: { type: 'object' },
        },
      },
      required: ['lead_id'],
    },
  },
  {
    name: 'close_update_contact',
    description: 'Update an existing contact',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Contact ID' },
        name: { type: 'string', description: 'Contact name' },
        title: { type: 'string', description: 'Job title' },
        emails: { type: 'array', items: { type: 'object' } },
        phones: { type: 'array', items: { type: 'object' } },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_delete_contact',
    description: 'Delete a contact',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Contact ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_bulk_delete_contacts',
    description: 'Delete multiple contacts at once',
    inputSchema: {
      type: 'object',
      properties: {
        contact_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of contact IDs to delete',
        },
      },
      required: ['contact_ids'],
    },
  },
  {
    name: 'close_search_contacts',
    description: 'Search contacts by name, email, or phone',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        _limit: { type: 'number', description: 'Max results' },
      },
      required: ['query'],
    },
  },

  // ============================================================================
  // OPPORTUNITY TOOLS (8 tools)
  // ============================================================================
  {
    name: 'close_list_opportunities',
    description: 'List all opportunities with filtering',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Filter by lead ID' },
        status_id: { type: 'string', description: 'Filter by status ID' },
        status_type: {
          type: 'string',
          enum: ['active', 'won', 'lost'],
          description: 'Filter by status type',
        },
        user_id: { type: 'string', description: 'Filter by assigned user' },
        _skip: { type: 'number' },
        _limit: { type: 'number' },
      },
    },
  },
  {
    name: 'close_get_opportunity',
    description: 'Get a specific opportunity by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Opportunity ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_opportunity',
    description: 'Create a new opportunity/deal',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        status_id: { type: 'string', description: 'Pipeline status ID' },
        value: { type: 'number', description: 'Deal value in cents' },
        value_period: {
          type: 'string',
          enum: ['one_time', 'monthly', 'annual'],
          description: 'Value period',
        },
        confidence: { type: 'number', description: 'Win probability (0-100)' },
        note: { type: 'string', description: 'Opportunity note' },
        contact_id: { type: 'string', description: 'Primary contact ID' },
      },
      required: ['lead_id', 'status_id'],
    },
  },
  {
    name: 'close_update_opportunity',
    description: 'Update an existing opportunity',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Opportunity ID' },
        status_id: { type: 'string', description: 'New status ID' },
        value: { type: 'number', description: 'Deal value' },
        confidence: { type: 'number', description: 'Win probability' },
        note: { type: 'string', description: 'Note' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_delete_opportunity',
    description: 'Delete an opportunity',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Opportunity ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_mark_opportunity_won',
    description: 'Mark an opportunity as won',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Opportunity ID' },
        status_id: { type: 'string', description: 'Won status ID' },
        date_won: { type: 'string', description: 'Won date (ISO 8601)' },
      },
      required: ['id', 'status_id'],
    },
  },
  {
    name: 'close_mark_opportunity_lost',
    description: 'Mark an opportunity as lost',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Opportunity ID' },
        status_id: { type: 'string', description: 'Lost status ID' },
        date_lost: { type: 'string', description: 'Lost date (ISO 8601)' },
      },
      required: ['id', 'status_id'],
    },
  },
  {
    name: 'close_get_opportunity_pipelines',
    description: 'Get all opportunity pipelines and their statuses',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // ============================================================================
  // ACTIVITY TOOLS (12 tools)
  // ============================================================================
  {
    name: 'close_list_activities',
    description: 'List activities (emails, calls, notes, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Filter by lead ID' },
        contact_id: { type: 'string', description: 'Filter by contact ID' },
        _skip: { type: 'number' },
        _limit: { type: 'number' },
      },
    },
  },
  {
    name: 'close_get_activity',
    description: 'Get a specific activity by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Activity ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_send_email',
    description: 'Send an email to a lead or contact',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        to: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of recipient email addresses',
        },
        subject: { type: 'string', description: 'Email subject' },
        body_text: { type: 'string', description: 'Plain text body' },
        body_html: { type: 'string', description: 'HTML body' },
        cc: { type: 'array', items: { type: 'string' }, description: 'CC recipients' },
        bcc: { type: 'array', items: { type: 'string' }, description: 'BCC recipients' },
      },
      required: ['to', 'subject'],
    },
  },
  {
    name: 'close_create_email_draft',
    description: 'Create an email draft (not sent)',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string' },
        contact_id: { type: 'string' },
        to: { type: 'array', items: { type: 'string' } },
        subject: { type: 'string' },
        body_text: { type: 'string' },
        body_html: { type: 'string' },
      },
      required: ['to', 'subject'],
    },
  },
  {
    name: 'close_log_call',
    description: 'Log a phone call activity',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        direction: {
          type: 'string',
          enum: ['inbound', 'outbound'],
          description: 'Call direction',
        },
        status: {
          type: 'string',
          enum: ['completed', 'canceled', 'no-answer', 'busy', 'failed'],
          description: 'Call outcome',
        },
        duration: { type: 'number', description: 'Call duration in seconds' },
        note: { type: 'string', description: 'Call notes' },
        phone: { type: 'string', description: 'Phone number called' },
      },
      required: ['direction', 'status'],
    },
  },
  {
    name: 'close_update_call',
    description: 'Update a call activity (e.g., add notes after call)',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Call activity ID' },
        note: { type: 'string', description: 'Call notes' },
        disposition: { type: 'string', description: 'Call disposition' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_note',
    description: 'Add a note to a lead or contact',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        note: { type: 'string', description: 'Note content' },
      },
      required: ['note'],
    },
  },
  {
    name: 'close_send_sms',
    description: 'Send an SMS message',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        text: { type: 'string', description: 'SMS message text' },
        remote_phone: { type: 'string', description: 'Recipient phone number' },
        local_phone: { type: 'string', description: 'Sender phone number' },
      },
      required: ['text', 'remote_phone'],
    },
  },
  {
    name: 'close_create_meeting',
    description: 'Schedule a meeting activity',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        title: { type: 'string', description: 'Meeting title' },
        note: { type: 'string', description: 'Meeting notes/agenda' },
        starts_at: { type: 'string', description: 'Meeting start time (ISO 8601)' },
        ends_at: { type: 'string', description: 'Meeting end time (ISO 8601)' },
        location: { type: 'string', description: 'Meeting location' },
      },
      required: ['starts_at'],
    },
  },
  {
    name: 'close_bulk_email',
    description: 'Send bulk email to multiple leads',
    inputSchema: {
      type: 'object',
      properties: {
        lead_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of lead IDs',
        },
        subject: { type: 'string', description: 'Email subject' },
        body_text: { type: 'string', description: 'Email body (plain text)' },
        body_html: { type: 'string', description: 'Email body (HTML)' },
      },
      required: ['lead_ids', 'subject'],
    },
  },
  {
    name: 'close_get_email_templates',
    description: 'List all email templates',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'close_get_email_template',
    description: 'Get a specific email template',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Template ID' },
      },
      required: ['id'],
    },
  },

  // ============================================================================
  // TASK TOOLS (6 tools)
  // ============================================================================
  {
    name: 'close_list_tasks',
    description: 'List tasks with filtering',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Filter by lead ID' },
        contact_id: { type: 'string', description: 'Filter by contact ID' },
        is_complete: { type: 'boolean', description: 'Filter by completion status' },
        assigned_to: { type: 'string', description: 'Filter by assigned user ID' },
        _skip: { type: 'number' },
        _limit: { type: 'number' },
      },
    },
  },
  {
    name: 'close_get_task',
    description: 'Get a specific task by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Task ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_task',
    description: 'Create a new task',
    inputSchema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'Lead ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        assigned_to: { type: 'string', description: 'User ID to assign to' },
        text: { type: 'string', description: 'Task description' },
        date: { type: 'string', description: 'Due date (ISO 8601)' },
      },
      required: ['text', 'assigned_to'],
    },
  },
  {
    name: 'close_update_task',
    description: 'Update an existing task',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Task ID' },
        text: { type: 'string', description: 'Task description' },
        date: { type: 'string', description: 'Due date' },
        assigned_to: { type: 'string', description: 'User ID' },
        is_complete: { type: 'boolean', description: 'Completion status' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_complete_task',
    description: 'Mark a task as complete',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Task ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_delete_task',
    description: 'Delete a task',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Task ID' },
      },
      required: ['id'],
    },
  },

  // ============================================================================
  // SMART VIEW TOOLS (5 tools)
  // ============================================================================
  {
    name: 'close_list_smart_views',
    description: 'List all saved smart views/searches',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['lead', 'opportunity', 'contact'],
          description: 'Filter by view type',
        },
      },
    },
  },
  {
    name: 'close_get_smart_view',
    description: 'Get a specific smart view by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Smart view ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_smart_view',
    description: 'Create a new smart view/saved search',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'View name' },
        type: {
          type: 'string',
          enum: ['lead', 'opportunity', 'contact'],
          description: 'View type',
        },
        query: { type: 'object', description: 'Search query object' },
      },
      required: ['name', 'type', 'query'],
    },
  },
  {
    name: 'close_update_smart_view',
    description: 'Update an existing smart view',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Smart view ID' },
        name: { type: 'string', description: 'View name' },
        query: { type: 'object', description: 'Search query' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_delete_smart_view',
    description: 'Delete a smart view',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Smart view ID' },
      },
      required: ['id'],
    },
  },

  // ============================================================================
  // USER TOOLS (3 tools)
  // ============================================================================
  {
    name: 'close_list_users',
    description: 'List all users in the organization',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'close_get_user',
    description: 'Get a specific user by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'User ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_get_current_user',
    description: 'Get the currently authenticated user',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // ============================================================================
  // CUSTOM FIELD TOOLS (5 tools)
  // ============================================================================
  {
    name: 'close_list_custom_fields',
    description: 'List all custom fields',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['lead', 'contact', 'opportunity'],
          description: 'Filter by object type',
        },
      },
    },
  },
  {
    name: 'close_get_custom_field',
    description: 'Get a specific custom field by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Custom field ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_create_custom_field',
    description: 'Create a new custom field',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Field name' },
        type: {
          type: 'string',
          enum: ['text', 'number', 'date', 'choices', 'user'],
          description: 'Field type',
        },
        choices: {
          type: 'array',
          items: { type: 'string' },
          description: 'Available choices (for choices type)',
        },
      },
      required: ['name', 'type'],
    },
  },
  {
    name: 'close_update_custom_field',
    description: 'Update a custom field definition',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Custom field ID' },
        name: { type: 'string', description: 'Field name' },
        choices: { type: 'array', items: { type: 'string' } },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_delete_custom_field',
    description: 'Delete a custom field',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Custom field ID' },
      },
      required: ['id'],
    },
  },

  // ============================================================================
  // SEQUENCE TOOLS (6 tools)
  // ============================================================================
  {
    name: 'close_list_sequences',
    description: 'List all email sequences',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'close_get_sequence',
    description: 'Get a specific sequence by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Sequence ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_subscribe_to_sequence',
    description: 'Subscribe a contact to an email sequence',
    inputSchema: {
      type: 'object',
      properties: {
        sequence_id: { type: 'string', description: 'Sequence ID' },
        contact_id: { type: 'string', description: 'Contact ID' },
        sender_account_id: { type: 'string', description: 'Email account ID to send from' },
      },
      required: ['sequence_id', 'contact_id'],
    },
  },
  {
    name: 'close_list_sequence_subscriptions',
    description: 'List sequence subscriptions with filtering',
    inputSchema: {
      type: 'object',
      properties: {
        sequence_id: { type: 'string', description: 'Filter by sequence ID' },
        contact_id: { type: 'string', description: 'Filter by contact ID' },
        lead_id: { type: 'string', description: 'Filter by lead ID' },
      },
    },
  },
  {
    name: 'close_pause_sequence_subscription',
    description: 'Pause a sequence subscription',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Subscription ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'close_unsubscribe_from_sequence',
    description: 'Unsubscribe/remove a contact from a sequence',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Subscription ID' },
      },
      required: ['id'],
    },
  },

  // ============================================================================
  // REPORTING TOOLS (4 tools)
  // ============================================================================
  {
    name: 'close_get_leads_report',
    description: 'Get leads report/analytics',
    inputSchema: {
      type: 'object',
      properties: {
        date_start: { type: 'string', description: 'Start date (ISO 8601)' },
        date_end: { type: 'string', description: 'End date (ISO 8601)' },
        group_by: { type: 'string', description: 'Grouping field' },
      },
    },
  },
  {
    name: 'close_get_opportunities_report',
    description: 'Get opportunities/pipeline report',
    inputSchema: {
      type: 'object',
      properties: {
        date_start: { type: 'string', description: 'Start date' },
        date_end: { type: 'string', description: 'End date' },
        group_by: { type: 'string', description: 'Grouping field (e.g., status_id, user_id)' },
      },
    },
  },
  {
    name: 'close_get_activities_report',
    description: 'Get activities report (calls, emails, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        date_start: { type: 'string', description: 'Start date' },
        date_end: { type: 'string', description: 'End date' },
        activity_type: { type: 'string', description: 'Filter by activity type' },
      },
    },
  },
  {
    name: 'close_get_user_activity_report',
    description: 'Get activity report for a specific user',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'User ID' },
        date_start: { type: 'string', description: 'Start date' },
        date_end: { type: 'string', description: 'End date' },
      },
      required: ['user_id'],
    },
  },

  // ============================================================================
  // ORGANIZATION & MISC TOOLS (4 tools)
  // ============================================================================
  {
    name: 'close_get_organization',
    description: 'Get organization details and settings',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'close_list_webhooks',
    description: 'List all configured webhooks',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'close_create_webhook',
    description: 'Create a new webhook subscription',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Webhook endpoint URL' },
        events: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of event types to subscribe to',
        },
      },
      required: ['url', 'events'],
    },
  },
  {
    name: 'close_get_connected_accounts',
    description: 'List all connected email/calendar accounts',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];
