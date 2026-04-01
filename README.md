# @api-check/javascript

JavaScript/TypeScript client for ApiCheck.

## Install

```bash
npm install @api-check/javascript
```

## Usage

```typescript
import { ApiClient } from '@api-check/javascript';

const client = new ApiClient('your-api-key');

// Lookup address
const address = await client.lookup('nl', { postalcode: '1012LM', number: '1' });

// Search
const results = await client.globalSearch('nl', 'amsterdam');

// Verify email
const email = await client.verifyEmail('test@example.com');

// Verify phone
const phone = await client.verifyPhone('+31612345678');
```

## API

- `lookup(country, { postalcode, number }, options?)` - Address lookup (NL, LU)
- `getNumberAdditions(country, postalcode, number)` - Get number additions
- `globalSearch(country, query, options?)` - Global search
- `search(type, country, name, options?)` - Search by type
- `verifyEmail(email)` - Verify email
- `verifyPhone(number)` - Verify phone

## License

MIT
