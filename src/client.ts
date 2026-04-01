import axios, { AxiosInstance } from 'axios';
import {
  LookupResponse,
  NumberAdditionsResponse,
  GlobalSearchResponse,
  EmailVerificationResponse,
  PhoneVerificationResponse,
  LookupOptions,
  SearchOptions,
} from './types';

const API_ENDPOINT = 'https://api.apicheck.nl';

export class ApiClient {
  private client: AxiosInstance;

  constructor(apiKey: string, options?: { referer?: string; timeout?: number }) {
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

  setApiKey(apiKey: string): this {
    this.client.defaults.headers['X-API-KEY'] = apiKey;
    return this;
  }

  setReferer(referer: string): this {
    this.client.defaults.headers['Referer'] = referer;
    return this;
  }

  // Lookup API (NL, LU)
  async lookup(country: string, query: { postalcode: string; number: string | number }, options?: LookupOptions): Promise<LookupResponse> {
    const params: Record<string, any> = { country, ...query };
    if (options?.aliases) params.aliases = options.aliases;
    if (options?.shortening) params.shortening = options.shortening;
    const { data } = await this.client.get('/lookup/v1/address/', { params });
    return data;
  }

  async getNumberAdditions(country: string, postalcode: string, number: string | number): Promise<NumberAdditionsResponse> {
    const { data } = await this.client.get('/lookup/v1/numberadditions/', { params: { country, postalcode, number } });
    return data;
  }

  // Search API
  async globalSearch(country: string, query: string, options?: SearchOptions): Promise<GlobalSearchResponse> {
    const params: Record<string, any> = { country, query };
    if (options?.limit) params.limit = options.limit;
    const { data } = await this.client.get('/search/v1/global/', { params });
    return data;
  }

  async search(type: 'city' | 'street' | 'postalcode' | 'address', country: string, name: string, options?: SearchOptions): Promise<GlobalSearchResponse> {
    const params: Record<string, any> = { country, name };
    if (options?.limit) params.limit = options.limit;
    const { data } = await this.client.get('/search/v1/' + type + '/', { params });
    return data;
  }

  // Verify API
  async verifyEmail(email: string): Promise<EmailVerificationResponse> {
    const { data } = await this.client.get('/verify/v1/email/', { params: { email } });
    return data;
  }

  async verifyPhone(number: string): Promise<PhoneVerificationResponse> {
    const { data } = await this.client.get('/verify/v1/phone/', { params: { number } });
    return data;
  }
}
