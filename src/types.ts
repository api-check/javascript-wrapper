export interface LookupResponse {
  street: string;
  streetShort?: string;
  number: string;
  numberAddition?: string | null;
  postalcode: string;
  city: string;
  cityShort?: string;
  municipality?: string;
  province?: string;
  country: { name: string; code: string };
  coordinates: { latitude: number; longitude: number };
}

export interface NumberAdditionsResponse {
  number: string;
  numberAdditions: string[];
}

export interface SearchResult {
  id: number;
  name: string;
  type?: 'city' | 'street' | 'postalcode' | 'locality' | 'municipality' | 'address';
  city?: string;
  postalcode?: string;
  latitude?: number;
  longitude?: number;
}

export interface GlobalSearchResponse {
  results: SearchResult[];
  count: number;
  limit?: number;
}

export interface CitySearchResponse {
  id: number;
  name: string;
  municipality?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
}

export interface StreetSearchResponse {
  id: number;
  name: string;
  city: string;
  city_id: number;
  latitude?: number;
  longitude?: number;
}

export interface PostalcodeSearchResponse {
  id: number;
  postalcode: string;
  city: string;
  city_id: number;
  latitude?: number;
  longitude?: number;
}

export interface LocalitySearchResponse {
  id: number;
  name: string;
  municipality: string;
  municipality_id: number;
}

export interface MunicipalitySearchResponse {
  id: number;
  name: string;
  province?: string;
}

export interface AddressSearchResponse {
  street: string;
  number: string;
  numberAddition?: string;
  postalcode: string;
  city: string;
  country: { name: string; code: string };
  coordinates?: { latitude: number; longitude: number };
}

export interface EmailVerificationResponse {
  email: string;
  status: 'valid' | 'invalid' | 'unknown';
  disposable_email: boolean;
  greylisted: boolean;
}

export interface PhoneVerificationResponse {
  number: string;
  valid: boolean;
  country_code?: string;
  area_code?: string;
  international_formatted?: string;
  national_formatted?: string;
  number_type?: 'mobile' | 'landline' | 'voip' | 'unknown';
  carrier?: string;
}

export interface LookupOptions {
  numberAddition?: string;
  fields?: string[];
  aliases?: boolean;
  shortening?: boolean;
}

export interface GlobalSearchOptions {
  query: string;
  limit?: number;
  city_id?: number;
  street_id?: number;
  postalcode_id?: number;
  locality_id?: number;
  municipality_id?: number;
}

export interface SearchOptions {
  name: string;
  limit?: number;
  city_id?: number;
}

export interface AddressSearchOptions {
  street_id?: number;
  city_id?: number;
  postalcode_id?: number;
  locality_id?: number;
  municipality_id?: number;
  number?: string;
  numberAddition?: string;
  limit?: number;
}
