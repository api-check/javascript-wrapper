export interface LookupResponse {
  street: string;
  streetShort?: string;
  number: string;
  numberAddition?: string | null;
  postalcode: string;
  city: string;
  cityShort?: string;
  municipality?: string;
  country: { name: string; code: string };
  coordinates: { latitude: number; longitude: number };
}

export interface NumberAdditionsResponse {
  number: string;
  numberAdditions: string[];
}

export interface GlobalSearchResponse {
  results: Array<{
    id: number;
    name: string;
    type: 'city' | 'street' | 'postalcode' | 'address';
    city?: { id: number; name: string };
    latitude?: number;
    longitude?: number;
  }>;
  count: number;
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
  number_type?: 'mobile' | 'landline' | 'voip' | 'unknown';
  carrier?: string;
}

export interface LookupOptions {
  fields?: string[];
  aliases?: boolean;
  shortening?: boolean;
}

export interface SearchOptions {
  limit?: number;
  city_id?: number;
  street_id?: number;
}
