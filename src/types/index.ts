// Close CRM Types

export interface CloseConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface PaginationParams {
  limit?: number;
  skip?: number;
  _cursor?: string;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  _fields?: string[];
}

// Lead Types
export interface Lead {
  id: string;
  name: string;
  display_name?: string;
  status_id?: string;
  status_label?: string;
  description?: string;
  url?: string;
  created_by?: string;
  created_by_name?: string;
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
  contacts?: Contact[];
  opportunities?: Opportunity[];
  tasks?: Task[];
  custom?: Record<string, any>;
  addresses?: Address[];
}

export interface Address {
  label?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

// Contact Types
export interface Contact {
  id: string;
  lead_id?: string;
  name?: string;
  title?: string;
  emails?: EmailAddress[];
  phones?: Phone[];
  urls?: Url[];
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
  created_by?: string;
}

export interface EmailAddress {
  email: string;
  type?: string;
}

export interface Phone {
  phone: string;
  type?: string;
  country?: string;
}

export interface Url {
  url: string;
  type?: string;
}

// Opportunity Types
export interface Opportunity {
  id: string;
  lead_id: string;
  status_id: string;
  status_type?: string;
  status_label?: string;
  note?: string;
  confidence?: number;
  value?: number;
  value_period?: string;
  value_currency?: string;
  date_created?: string;
  date_updated?: string;
  date_won?: string;
  user_id?: string;
  user_name?: string;
  organization_id?: string;
}

export interface OpportunityStatus {
  id: string;
  label: string;
  type: string;
}

export interface Pipeline {
  id: string;
  name: string;
  organization_id?: string;
  statuses?: OpportunityStatus[];
}

// Activity Types
export interface Activity {
  id: string;
  lead_id?: string;
  contact_id?: string;
  user_id?: string;
  user_name?: string;
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
  _type?: string;
}

export interface Note extends Activity {
  note: string;
}

export interface Call extends Activity {
  duration?: number;
  phone?: string;
  direction?: string;
  disposition?: string;
  note?: string;
  recording_url?: string;
}

export interface Email extends Activity {
  subject?: string;
  body_text?: string;
  body_html?: string;
  status?: string;
  direction?: string;
  sender?: string;
  to?: string[];
  cc?: string[];
  bcc?: string[];
  opens?: number;
  clicks?: number;
}

export interface SMS extends Activity {
  text: string;
  direction?: string;
  status?: string;
  remote_phone?: string;
  local_phone?: string;
}

export interface Meeting extends Activity {
  title?: string;
  starts_at?: string;
  ends_at?: string;
  location?: string;
  note?: string;
  attendees?: string[];
}

// Task Types
export interface Task {
  id: string;
  _type: string;
  assigned_to?: string;
  assigned_to_name?: string;
  lead_id?: string;
  lead_name?: string;
  text?: string;
  date?: string;
  is_complete?: boolean;
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
}

// Smart View Types
export interface SmartView {
  id: string;
  name: string;
  query?: string;
  type?: string;
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  image?: string;
  date_created?: string;
  date_updated?: string;
  organizations?: any[];
}

export interface Role {
  id: string;
  name: string;
  organization_id?: string;
}

// Custom Field Types
export interface CustomField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  accepts_multiple_values?: boolean;
  editable_with_roles?: string[];
  choices?: string[];
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
}

// Sequence Types
export interface Sequence {
  id: string;
  name: string;
  status?: string;
  max_activations?: number;
  throttle_capacity?: number;
  throttle_period_seconds?: number;
  date_created?: string;
  date_updated?: string;
  organization_id?: string;
}

export interface SequenceSubscription {
  id: string;
  sequence_id: string;
  lead_id: string;
  contact_id?: string;
  sender_account_id?: string;
  status?: string;
  date_created?: string;
  date_paused?: string;
  date_completed?: string;
}

// Bulk Operation Types
export interface BulkEditRequest {
  lead_ids?: string[];
  query?: string;
  updates: Record<string, any>;
}

export interface BulkDeleteRequest {
  lead_ids?: string[];
  query?: string;
}

export interface BulkEmailRequest {
  lead_ids?: string[];
  query?: string;
  template_id?: string;
  subject: string;
  body: string;
  sender?: string;
}

// Reporting Types
export interface LeadStatusChange {
  lead_id: string;
  lead_name?: string;
  old_status?: string;
  new_status?: string;
  changed_by?: string;
  date_changed?: string;
}

export interface OpportunityFunnel {
  status_id: string;
  status_label?: string;
  count: number;
  total_value?: number;
  average_value?: number;
}

export interface ActivitySummary {
  date: string;
  calls?: number;
  emails?: number;
  meetings?: number;
  notes?: number;
  total?: number;
}

export interface RevenueForcast {
  period: string;
  pipeline_value?: number;
  weighted_value?: number;
  won_value?: number;
  closed_count?: number;
}

// API Response Types
export interface CloseAPIResponse<T> {
  data?: T[];
  has_more?: boolean;
  total_results?: number;
  cursor?: string;
}

export interface CloseAPIError {
  error?: string;
  errors?: any[];
  field_errors?: Record<string, string[]>;
}
