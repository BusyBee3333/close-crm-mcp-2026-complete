// Close API Client with authentication, pagination, and error handling

import type {
  CloseConfig,
  PaginationParams,
  SearchParams,
  CloseAPIResponse,
} from "../types/index.js";

export class CloseClient {
  private apiKey: string;
  private baseUrl: string;
  private authHeader: string;

  constructor(config: CloseConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.close.com/api/v1";
    // Basic auth: encode "api_key:" (note the colon after key, no password)
    this.authHeader = `Basic ${Buffer.from(`${this.apiKey}:`).toString("base64")}`;
  }

  /**
   * Make a GET request to the Close API
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>("GET", url);
  }

  /**
   * Make a POST request to the Close API
   */
  async post<T>(endpoint: string, body?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>("POST", url, body);
  }

  /**
   * Make a PUT request to the Close API
   */
  async put<T>(endpoint: string, body?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>("PUT", url, body);
  }

  /**
   * Make a DELETE request to the Close API
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>("DELETE", url);
  }

  /**
   * Paginated GET request - fetches all pages automatically
   */
  async getPaginated<T>(
    endpoint: string,
    params?: PaginationParams & Record<string, any>
  ): Promise<T[]> {
    const results: T[] = [];
    let cursor: string | undefined;
    const limit = params?.limit || 100;

    do {
      const queryParams = {
        ...params,
        _limit: limit,
        _skip: cursor ? undefined : params?.skip,
        _cursor: cursor,
      };

      const response = await this.get<CloseAPIResponse<T>>(
        endpoint,
        queryParams
      );

      if (response.data) {
        results.push(...response.data);
      }

      cursor = response.has_more ? response.cursor : undefined;
    } while (cursor);

    return results;
  }

  /**
   * Search with pagination support
   */
  async search<T>(
    endpoint: string,
    params?: SearchParams
  ): Promise<T[]> {
    return this.getPaginated<T>(endpoint, params);
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, any>
  ): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.set(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  /**
   * Make HTTP request with error handling
   */
  private async request<T>(
    method: string,
    url: string,
    body?: any
  ): Promise<T> {
    try {
      const headers: Record<string, string> = {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
      };

      const options: RequestInit = {
        method,
        headers,
      };

      if (body && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      // Handle different response codes
      if (response.status === 204) {
        // No content - successful DELETE
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Close API error (${response.status}): ${
            data.error || data.errors?.[0] || "Unknown error"
          }`
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Close API request failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.get("/me/");
      return true;
    } catch {
      return false;
    }
  }
}
