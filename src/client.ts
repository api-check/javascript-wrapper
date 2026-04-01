import axios, { AxiosInstance } from 'axios';

const API_ENDPOINT = 'https://api.apicheck.nl';

export class ApiClient {
  private client: AxiosInstance;

  constructor(private apiKey: string, options?: { referer?: string; timeout?: number }) {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-API-KEY': apiKey,
    };
    if (options?.referer) headers['Referer'] = options.referer;

    this.client = axios.create({
      baseURL: API_ENDPOINT,
      timeout: options?.timeout || 10000,
      headers,
    });
  }

  // Lookup API (NL, LU)
  async lookup(country: string, query: { postalcode: string; number: string | number }): Promise<any> {
    const { data } = await this.client.get(`/lookup/v1/postalcode/${country.toLowerCase()}`, { params: query });
    return data.data || data;
  }

  async getNumberAdditions(country: string, postalcode: string, number: string | number): Promise<any> {
    const { data } = await this.client.get(`/lookup/v1/address/${country.toLowerCase()}`, {
      params: { postalcode, number, fields: '["numberAdditions"]' }
    });
    return data.data || data;
  }

  // Search API
  async globalSearch(country: string, query: string, limit?: number): Promise<any> {
    const { data } = await this.client.get(`/search/v1/global/${country.toLowerCase()}`, {
      params: { query, limit }
    });
    return data.data?.Results || data.results || data;
  }

  // Verify API
  async verifyEmail(email: string): Promise<any> {
    const { data } = await this.client.get('/verify/v1/email/', { params: { email } });
    return data.data || data;
  }

  async verifyPhone(number: string): Promise<any> {
    const { data } = await this.client.get('/verify/v1/phone/', { params: { number } });
    return data.data || data;
  }
}
