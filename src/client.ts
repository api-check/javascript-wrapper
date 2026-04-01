import axios, { AxiosInstance } from 'axios';

import { COUNTRIES_ALL, COUNTRIES_LOOKUP, from './types';

import type { CountryCode, LookupCountryCode } from './types';

const API_ENDPOINT = 'https://api.apicheck.nl';

export const COUNTRIES_ALL = ['nl', 'be', 'lu', 'de', 'fr', 'cz', 'fi', 'it', 'no', 'pl', 'pt', 'ro', 'es', 'ch', 'at', 'dk', 'gb', 'se'] as const;
export const COUNTRIES_LOOKUP = ['nl', 'lu'] as const;

export type CountryCode = typeof COUNTRIES_ALL[number];
export type LookupCountryCode = typeof COUNTRIES_LOOKUP[number];

export interface LookupQuery {
  postalcode: string;
  number: string | number;
  numberAddition?: string;
}

export interface GlobalSearchParams {
  query: string;
  limit?: number;
  city_id?: number;
  street_id?: number;
  postalcode_id?: number;
  locality_id?: number;
  municipality_id?: number;
}

export interface SearchParams {
  name: string;
  limit?: number;
  city_id?: number;
}

export interface AddressSearchParams {
  street_id?: number;
  city_id?: number;
  postalcode_id?: number;
  locality_id?: number;
  municipality_id?: number;
  number?: string;
  numberAddition?: string;
  limit?: number;
}

export class ApiClient {
  private client: AxiosInstance;

  constructor(
    private apiKey: string,
    options?: { referer?: string; timeout?: number }
  ) {
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

  private extractData(response: any): any {
    return response.data?.data || response.data;
  }

  // Lookup API (NL, LU)
  async lookup(country: LookupCountryCode, query: LookupQuery): Promise<any> {
    const { data } = await this.client.get(`/lookup/v1/postalcode/${country.toLowerCase()}`, { params: query });
    return this.extractData({ data });
  }

  async getNumberAdditions(country: LookupCountryCode, postalcode: string, number: string | number): Promise<any> {
    const { data } = await this.client.get(`/lookup/v1/address/${country.toLowerCase()}`, {
      params: { postalcode, number, fields: '["numberAdditions"]' }
    });
    return this.extractData({ data });
  }

  // Search API (18 countries)
  async globalSearch(country: CountryCode, params: GlobalSearchParams): Promise<any[]> {
    const { data } = await this.client.get(`/search/v1/global/${country.toLowerCase()}`, { params });
    const result = this.extractData({ data });
    const results: any[] = [];
    if (result?.Results) {
      if (result.Results.Streets) results.push(...result.Results.Streets.map((s: any) => ({ ...s, type: 'street' }));
      if (result.Results.Cities) results.push(...result.Results.Cities.map((c: any) => ({ ...c, type: 'city' }));
      }
      if (result.Results.Postalcodes) results.push(...result.Results.Postalcodes.map((p: any) => ({ ...p, type: 'postalcode' }));
      }
    }
    return results.slice(0, params.limit || 10);
  }

  async searchCity(country: CountryCode, params: SearchParams): Promise<any> {
    const { data } = await this.client.get(`/search/v1/city/${country.toLowerCase()}`, { params });
    return this.extractData({ data });
  }

  async searchStreet(country: CountryCode, params: SearchParams): Promise<any> {
    const { data } = await this.client.get(`/search/v1/street/${country.toLowerCase()}`, { params });
    return this.extractData({ data });
  }

  async searchPostalcode(country: CountryCode, params: SearchParams): Promise<any> {
    const { data } = await this.client.get(`/search/v1/postalcode/${country.toLowerCase()}`, { params });
    return this.extractData({ data });
  }

  async searchLocality(country: CountryCode, params: { name: string; limit?: number }): Promise<any> {
    const { data } = await this.client.get(`/search/v1/locality/${country.toLowerCase()}`, { params });
    return this.extractData({ data });
  }

  async searchMunicipality(country: CountryCode, params: { name: string; limit?: number }): Promise<any> {
    const { data } = await this.client.get(`/search/v1/municipality/${country.toLowerCase()}`, { params });
    return this.extractData({ data });
  }

  async searchAddress(country: CountryCode, params: AddressSearchParams): Promise<any> {
    const { data } = await this.client.get(`/search/v1/address/${country.toLowerCase()}`, { params });
    return this.extractData({ data });
  }

  // Verify API
  async verifyEmail(email: string): Promise<any> {
    const { data } = await this.client.get('/verify/v1/email/', { params: { email } });
    return this.extractData({ data });
  }

  async verifyPhone(number: string): Promise<any> {
    const { data } = await this.client.get('/verify/v1/phone/', { params: { number } });
    return this.extractData({ data });
  }
}
