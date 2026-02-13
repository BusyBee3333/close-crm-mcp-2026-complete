/**
 * Close CRM MCP Server - TypeScript Type Definitions
 * Complete type system for Close API v1
 */

// Configuration
export interface CloseConfig {
  apiKey: string;
  baseUrl?: string;
}

// Core Resources
export interface Lead {
  id: string;
  name: string;
  display_name: string;
  status_id: string;
  status_label: string;
  description?: string;
  url?: string;
  created_by: string;
  updated_by: string;
  date_created: string;
  date_updated: string;
  organization_id: string;
  contacts?: Contact[];
  opportunities?: Opportunity[];
  tasks?: Task[];
  custom?: Record<string, any>;
  addresses?: Address[];
}

export interface Contact {
  id: string;
  lead_id: string;
  name: string;
  title?: string;
  emails: EmailAddress[];
  phones: PhoneNumber[];
  urls?: UrlField[];
  date_created: string;
  date_updated: string;
  created_by: string;
  updated_by: string;
  organization_id: string;
}

export interface EmailAddress {
  email: string;
  type: string;
}

export interface PhoneNumber {
  phone: string;
  type: string;
  country?: string;
}

export interface UrlField {
  url: string;
  type?: string;
}

export interface Address {
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  label?: string;
}

export interface Opportunity {
  id: string;
  lead_id: string;
  status_id: string;
  status_label: string;
  status_type: 'active' | 'won' | 'lost';
  confidence?: number;
  value?: number;
  value_period?: 'one_time' | 'monthly' | 'annual';
  value_currency?: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  updated_by: string;
  note?: string;
  organization_id: string;
  contact_id?: string;
  user_id?: string;
  date_won?: string;
  date_lost?: string;
}

export interface Activity {
  id: string;
  type: string;
  lead_id?: string;
  contact_id?: string;
  opportunity_id?: string;
  user_id: string;
  created_by: string;
  date_created: string;
  date_updated: string;
  organization_id: string;
}

export interface Task {
  id: string;
  _type: 'lead' | 'contact';
  lead_id?: string;
  contact_id?: string;
  assigned_to: string;
  text: string;
  date: string;
  is_complete: boolean;
  created_by: string;
  date_created: string;
  date_updated: string;
  organization_id: string;
  view?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  organization_id: string;
  statuses: PipelineStatus[];
}

export interface PipelineStatus {
  id: string;
  label: string;
  type: 'active' | 'won' | 'lost';
}

export interface SmartView {
  id: string;
  name: string;
  type: 'lead' | 'opportunity' | 'contact';
  query: any;
  organization_id: string;
  created_by: string;
  date_created: string;
  date_updated: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  date_created: string;
  date_updated: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'choices' | 'user';
  choices?: string[];
  accepts_multiple_values?: boolean;
  editable_with_roles?: string[];
  created_by: string;
  date_created: string;
  date_updated: string;
  organization_id: string;
}

export interface Sequence {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  created_by: string;
  updated_by: string;
  date_created: string;
  date_updated: string;
  organization_id: string;
}

export interface SequenceSubscription {
  id: string;
  sequence_id: string;
  contact_id: string;
  lead_id: string;
  sender_account_id: string;
  sender_name: string;
  sender_email: string;
  status: 'active' | 'paused' | 'finished';
  date_created: string;
  date_updated: string;
}

// Activity Types
export interface EmailActivity extends Activity {
  type: 'Email';
  direction: 'incoming' | 'outgoing';
  status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'bounced';
  subject?: string;
  body_text?: string;
  body_html?: string;
  sender?: string;
  to?: string[];
  cc?: string[];
  bcc?: string[];
  template_id?: string;
  thread_id?: string;
  opens?: any[];
  clicks?: any[];
}

export interface CallActivity extends Activity {
  type: 'Call';
  direction: 'inbound' | 'outbound';
  status: 'completed' | 'canceled' | 'no-answer' | 'busy' | 'failed';
  duration?: number;
  note?: string;
  phone?: string;
  disposition?: string;
  recording_url?: string;
  voicemail_url?: string;
}

export interface NoteActivity extends Activity {
  type: 'Note';
  note: string;
}

export interface SMSActivity extends Activity {
  type: 'SMS';
  direction: 'incoming' | 'outgoing';
  status: 'sent' | 'delivered' | 'failed';
  text: string;
  local_phone?: string;
  remote_phone?: string;
}

export interface MeetingActivity extends Activity {
  type: 'Meeting';
  title?: string;
  note?: string;
  starts_at?: string;
  ends_at?: string;
  location?: string;
  attendees?: string[];
}

// Bulk Operations
export interface BulkAction {
  id: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_by: string;
  date_created: string;
  date_updated: string;
  organization_id: string;
}

// Reporting
export interface Report {
  data: any[];
  aggregate?: Record<string, any>;
  cursor?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  has_more: boolean;
  cursor?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Search/Filter
export interface SearchParams {
  query?: string;
  _skip?: number;
  _limit?: number;
  _fields?: string[];
  _order_by?: string;
}

export interface LeadSearchParams extends SearchParams {
  status_id?: string;
  user_id?: string;
}

export interface OpportunitySearchParams extends SearchParams {
  status_id?: string;
  status_type?: 'active' | 'won' | 'lost';
  user_id?: string;
  lead_id?: string;
}

// Export types
export type ActivityType = EmailActivity | CallActivity | NoteActivity | SMSActivity | MeetingActivity;
