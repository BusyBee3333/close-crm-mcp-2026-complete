/**
 * Close CRM API Client
 * Full implementation for Close API v1 with Basic Auth
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  CloseConfig,
  Lead,
  Contact,
  Opportunity,
  Activity,
  Task,
  Pipeline,
  SmartView,
  User,
  CustomField,
  Sequence,
  SequenceSubscription,
  PaginatedResponse,
  SearchParams,
  LeadSearchParams,
  OpportunitySearchParams,
} from '../types.js';

export class CloseAPIClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: CloseConfig) {
    this.apiKey = config.apiKey;
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://api.close.com/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: config.apiKey,
        password: '', // Close uses API key as username with empty password
      },
    });
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `Close API Error: ${axiosError.response.status} - ${
            JSON.stringify(axiosError.response.data) || axiosError.message
          }`
        );
      }
      throw new Error(`Close API Request Failed: ${axiosError.message}`);
    }
    throw error;
  }

  // ============================================================================
  // LEADS
  // ============================================================================

  async getLeads(params?: LeadSearchParams): Promise<PaginatedResponse<Lead>> {
    try {
      const response = await this.client.get('/lead/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getLead(id: string): Promise<Lead> {
    try {
      const response = await this.client.get(`/lead/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createLead(data: Partial<Lead>): Promise<Lead> {
    try {
      const response = await this.client.post('/lead/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    try {
      const response = await this.client.put(`/lead/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteLead(id: string): Promise<void> {
    try {
      await this.client.delete(`/lead/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async searchLeads(query: string, params?: SearchParams): Promise<PaginatedResponse<Lead>> {
    try {
      const response = await this.client.get('/lead/', {
        params: { query, ...params },
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async mergeLeads(source: string, destination: string): Promise<Lead> {
    try {
      const response = await this.client.post('/lead/merge/', {
        source,
        destination,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // CONTACTS
  // ============================================================================

  async getContacts(params?: SearchParams): Promise<PaginatedResponse<Contact>> {
    try {
      const response = await this.client.get('/contact/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getContact(id: string): Promise<Contact> {
    try {
      const response = await this.client.get(`/contact/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createContact(data: Partial<Contact>): Promise<Contact> {
    try {
      const response = await this.client.post('/contact/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
    try {
      const response = await this.client.put(`/contact/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      await this.client.delete(`/contact/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // OPPORTUNITIES
  // ============================================================================

  async getOpportunities(params?: OpportunitySearchParams): Promise<PaginatedResponse<Opportunity>> {
    try {
      const response = await this.client.get('/opportunity/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getOpportunity(id: string): Promise<Opportunity> {
    try {
      const response = await this.client.get(`/opportunity/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createOpportunity(data: Partial<Opportunity>): Promise<Opportunity> {
    try {
      const response = await this.client.post('/opportunity/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateOpportunity(id: string, data: Partial<Opportunity>): Promise<Opportunity> {
    try {
      const response = await this.client.put(`/opportunity/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteOpportunity(id: string): Promise<void> {
    try {
      await this.client.delete(`/opportunity/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // ACTIVITIES
  // ============================================================================

  async getActivities(params?: SearchParams & { lead_id?: string }): Promise<PaginatedResponse<Activity>> {
    try {
      const response = await this.client.get('/activity/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getActivity(id: string): Promise<Activity> {
    try {
      const response = await this.client.get(`/activity/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Email Activities
  async createEmail(data: any): Promise<Activity> {
    try {
      const response = await this.client.post('/activity/email/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async sendEmail(data: any): Promise<Activity> {
    try {
      const response = await this.client.post('/activity/email/', {
        ...data,
        status: 'sent',
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Call Activities
  async createCall(data: any): Promise<Activity> {
    try {
      const response = await this.client.post('/activity/call/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCall(id: string, data: any): Promise<Activity> {
    try {
      const response = await this.client.put(`/activity/call/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Note Activities
  async createNote(data: { lead_id?: string; contact_id?: string; note: string }): Promise<Activity> {
    try {
      const response = await this.client.post('/activity/note/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // SMS Activities
  async sendSMS(data: any): Promise<Activity> {
    try {
      const response = await this.client.post('/activity/sms/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Meeting Activities
  async createMeeting(data: any): Promise<Activity> {
    try {
      const response = await this.client.post('/activity/meeting/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // TASKS
  // ============================================================================

  async getTasks(params?: SearchParams & { lead_id?: string; is_complete?: boolean }): Promise<PaginatedResponse<Task>> {
    try {
      const response = await this.client.get('/task/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTask(id: string): Promise<Task> {
    try {
      const response = await this.client.get(`/task/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      const response = await this.client.post('/task/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const response = await this.client.put(`/task/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.client.delete(`/task/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async completeTask(id: string): Promise<Task> {
    try {
      const response = await this.client.put(`/task/${id}/`, {
        is_complete: true,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // PIPELINES
  // ============================================================================

  async getPipelines(): Promise<{ data: Pipeline[] }> {
    try {
      const response = await this.client.get('/status/opportunity/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPipeline(id: string): Promise<Pipeline> {
    try {
      const response = await this.client.get(`/status/opportunity/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getLeadStatuses(): Promise<any> {
    try {
      const response = await this.client.get('/status/lead/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // SMART VIEWS
  // ============================================================================

  async getSmartViews(params?: { type?: string }): Promise<PaginatedResponse<SmartView>> {
    try {
      const response = await this.client.get('/saved_search/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSmartView(id: string): Promise<SmartView> {
    try {
      const response = await this.client.get(`/saved_search/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createSmartView(data: Partial<SmartView>): Promise<SmartView> {
    try {
      const response = await this.client.post('/saved_search/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateSmartView(id: string, data: Partial<SmartView>): Promise<SmartView> {
    try {
      const response = await this.client.put(`/saved_search/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteSmartView(id: string): Promise<void> {
    try {
      await this.client.delete(`/saved_search/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // USERS
  // ============================================================================

  async getUsers(): Promise<{ data: User[] }> {
    try {
      const response = await this.client.get('/user/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const response = await this.client.get(`/user/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.client.get('/me/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // CUSTOM FIELDS
  // ============================================================================

  async getCustomFields(type?: 'lead' | 'contact' | 'opportunity'): Promise<{ data: CustomField[] }> {
    try {
      const response = await this.client.get('/custom_fields/', {
        params: type ? { type } : undefined,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCustomField(id: string): Promise<CustomField> {
    try {
      const response = await this.client.get(`/custom_fields/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createCustomField(data: Partial<CustomField>): Promise<CustomField> {
    try {
      const response = await this.client.post('/custom_fields/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCustomField(id: string, data: Partial<CustomField>): Promise<CustomField> {
    try {
      const response = await this.client.put(`/custom_fields/${id}/`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteCustomField(id: string): Promise<void> {
    try {
      await this.client.delete(`/custom_fields/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // SEQUENCES
  // ============================================================================

  async getSequences(): Promise<{ data: Sequence[] }> {
    try {
      const response = await this.client.get('/sequence/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSequence(id: string): Promise<Sequence> {
    try {
      const response = await this.client.get(`/sequence/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async subscribeToSequence(data: {
    sequence_id: string;
    contact_id: string;
    sender_account_id?: string;
  }): Promise<SequenceSubscription> {
    try {
      const response = await this.client.post('/sequence_subscription/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSequenceSubscriptions(params?: {
    sequence_id?: string;
    contact_id?: string;
    lead_id?: string;
  }): Promise<PaginatedResponse<SequenceSubscription>> {
    try {
      const response = await this.client.get('/sequence_subscription/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async pauseSequenceSubscription(id: string): Promise<SequenceSubscription> {
    try {
      const response = await this.client.post(`/sequence_subscription/${id}/pause/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async resumeSequenceSubscription(id: string): Promise<SequenceSubscription> {
    try {
      const response = await this.client.post(`/sequence_subscription/${id}/resume/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async unsubscribeFromSequence(id: string): Promise<void> {
    try {
      await this.client.delete(`/sequence_subscription/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // BULK OPERATIONS
  // ============================================================================

  async bulkDeleteLeads(leadIds: string[]): Promise<any> {
    try {
      const response = await this.client.post('/lead/bulk_delete/', {
        lead_ids: leadIds,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async bulkUpdateLeads(leadIds: string[], data: Partial<Lead>): Promise<any> {
    try {
      const response = await this.client.post('/lead/bulk_update/', {
        lead_ids: leadIds,
        ...data,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async bulkEmailLeads(leadIds: string[], emailData: any): Promise<any> {
    try {
      const response = await this.client.post('/lead/bulk_email/', {
        lead_ids: leadIds,
        ...emailData,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async bulkDeleteContacts(contactIds: string[]): Promise<any> {
    try {
      const response = await this.client.post('/contact/bulk_delete/', {
        contact_ids: contactIds,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // REPORTING & ANALYTICS
  // ============================================================================

  async getLeadsReport(params?: any): Promise<any> {
    try {
      const response = await this.client.get('/report/lead/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getOpportunitiesReport(params?: any): Promise<any> {
    try {
      const response = await this.client.get('/report/opportunity/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getActivitiesReport(params?: any): Promise<any> {
    try {
      const response = await this.client.get('/report/activity/', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserActivityReport(userId: string, params?: any): Promise<any> {
    try {
      const response = await this.client.get(`/report/user/${userId}/`, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // ORGANIZATION
  // ============================================================================

  async getOrganization(): Promise<any> {
    try {
      const response = await this.client.get('/organization/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // WEBHOOKS
  // ============================================================================

  async getWebhooks(): Promise<any> {
    try {
      const response = await this.client.get('/webhook/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createWebhook(data: { url: string; events: string[] }): Promise<any> {
    try {
      const response = await this.client.post('/webhook/', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteWebhook(id: string): Promise<void> {
    try {
      await this.client.delete(`/webhook/${id}/`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // EMAIL TEMPLATES
  // ============================================================================

  async getEmailTemplates(): Promise<any> {
    try {
      const response = await this.client.get('/email_template/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getEmailTemplate(id: string): Promise<any> {
    try {
      const response = await this.client.get(`/email_template/${id}/`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // CONNECTED ACCOUNTS
  // ============================================================================

  async getConnectedAccounts(): Promise<any> {
    try {
      const response = await this.client.get('/connected_account/');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
