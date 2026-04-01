import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { ApiClient } from '../src/client';

vi.mock('axios');

describe('ApiClient', () => {
  let client: ApiClient;
  let mockAxios: any;

  beforeEach(() => {
    mockAxios = {
      get: vi.fn(),
    };
    vi.mocked(axios.create).mockReturnValue(mockAxios);
    client = new ApiClient('test-api-key');
  });

  it('should create client', () => {
    expect(client).toBeInstanceOf(ApiClient);
  });

  it('should lookup address', async () => {
    mockAxios.get.mockResolvedValue({
      data: { data: { street: 'Damrak', number: '1', city: 'Amsterdam' } },
    });

    const result = await client.lookup('nl', { postalcode: '1012LM', number: '1' });
    expect(result.street).toBe('Damrak');
  });

  it('should verify email', async () => {
    mockAxios.get.mockResolvedValue({
      data: { data: { email: 'test@example.com', status: 'valid' } },
    });

    const result = await client.verifyEmail('test@example.com');
    expect(result.status).toBe('valid');
  });

  it('should verify phone', async () => {
    mockAxios.get.mockResolvedValue({
      data: { data: { number: '+31612345678', valid: true } },
    });

    const result = await client.verifyPhone('+31612345678');
    expect(result.valid).toBe(true);
  });
});
