# Error Handling Guide

This document explains the error handling implementation in the PropertySimple application.

## Overview

The app uses a multi-layered error handling approach:
1. **Route-level error boundaries** - Catch and display errors per route
2. **Component-level error states** - Graceful degradation in UI
3. **Try-catch blocks** - Protect async operations
4. **Error logging utility** - Centralized error tracking

## Error Boundaries

Error boundaries are implemented for each major route to prevent full app crashes.

### Available Error Boundaries

- `/app/error.tsx` - Root-level fallback
- `/app/dashboard/error.tsx` - Dashboard errors
- `/app/campaigns/error.tsx` - Campaign management errors
- `/app/contacts/error.tsx` - Contact management errors
- `/app/inbox/error.tsx` - Inbox errors

### Features

- **User-friendly messages** - Clear, actionable error messages
- **Retry functionality** - Users can attempt to recover
- **Navigation options** - Easy way back to safety (dashboard/home)
- **Development details** - Error stack traces in dev mode only
- **Production safety** - Sensitive details hidden in production

## Error Logging Utility

Location: `/lib/utils/errorHandler.ts`

### Core Functions

#### `logError(error, context?)`
```typescript
import { logError } from '@/lib/utils/errorHandler';

try {
  await riskyOperation();
} catch (error) {
  logError(error instanceof Error ? error : new Error(String(error)), {
    component: 'MyComponent',
    action: 'riskyOperation',
  });
  // Handle error in UI
}
```

#### `handleAsync(promise, context?)`
```typescript
import { handleAsync } from '@/lib/utils/errorHandler';

const [data, error] = await handleAsync(
  fetch('/api/data').then(r => r.json()),
  { component: 'DataFetcher' }
);

if (error) {
  // Handle error
  return <ErrorState error={error} />;
}

// Use data
```

#### `retryAsync(fn, options)`
```typescript
import { retryAsync } from '@/lib/utils/errorHandler';

const data = await retryAsync(
  () => fetch('/api/data').then(r => r.json()),
  {
    maxRetries: 3,
    initialDelay: 1000,
    onRetry: (attempt) => console.log(`Retry attempt ${attempt}`)
  }
);
```

## Error State Components

Location: `/components/common/ErrorState.tsx`

### ErrorState
Full-page error display with retry functionality:
```tsx
import { ErrorState } from '@/components/common/ErrorState';

{error && (
  <ErrorState
    error={error}
    title="Failed to load data"
    message="We couldn't load your data. Please try again."
    onRetry={() => refetch()}
  />
)}
```

### InlineError
Form field errors:
```tsx
import { InlineError } from '@/components/common/ErrorState';

{fieldError && <InlineError message={fieldError} />}
```

### ErrorBanner
Dismissible banner for non-critical errors:
```tsx
import { ErrorBanner } from '@/components/common/ErrorState';

{error && (
  <ErrorBanner
    message="Some features may be unavailable"
    onDismiss={() => setError(null)}
  />
)}
```

## Best Practices

### 1. Wrap Async Operations

Always wrap async operations that might fail:

```typescript
// ❌ BAD - No error handling
const data = await fetch('/api/data').then(r => r.json());

// ✅ GOOD - With error handling
try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
} catch (error) {
  logError(error instanceof Error ? error : new Error(String(error)));
  // Show error to user
}

// ✅ BETTER - Using handleAsync utility
const [data, error] = await handleAsync(
  fetch('/api/data').then(r => r.json())
);
```

### 2. User-Friendly Messages

Don't show technical errors to users:

```typescript
// ❌ BAD
<p>{error.message}</p> // "Cannot read property 'x' of undefined"

// ✅ GOOD
import { getSafeErrorMessage } from '@/lib/utils/errorHandler';
<p>{getSafeErrorMessage(error)}</p> // "Something went wrong. Please try again."
```

### 3. Provide Context

Include context when logging errors:

```typescript
logError(error, {
  component: 'ContactsList',
  action: 'loadContacts',
  userId: user?.id,
  metadata: { page, filters }
});
```

### 4. Graceful Degradation

Show partial UI when possible:

```tsx
function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  // If error, show error state but keep showing header
  return (
    <div>
      <h1>Contacts</h1>
      {error ? (
        <ErrorState error={error} onRetry={() => loadContacts()} />
      ) : (
        <ContactsTable data={contacts} />
      )}
    </div>
  );
}
```

### 5. Loading and Error States

Always handle all three states:

```tsx
function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState(null);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} onRetry={() => refetch()} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
}
```

## Integration with Error Tracking Services

The error handler is ready for integration with services like Sentry.

### Setup Sentry (Future)

1. Install Sentry:
```bash
npm install @sentry/nextjs
```

2. Update `lib/utils/errorHandler.ts`:
```typescript
import * as Sentry from '@sentry/nextjs';

export function logError(error: Error, context?: ErrorContext): void {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      contexts: { app: context }
    });
  }
  // ... existing code
}
```

3. Configure in `sentry.client.config.ts` and `sentry.server.config.ts`

## Testing Error Handling

### Manual Testing

Test error boundaries by intentionally throwing errors:

```tsx
// Add this button temporarily to test error boundary
<button onClick={() => { throw new Error('Test error') }}>
  Test Error Boundary
</button>
```

### Common Scenarios to Test

1. **Network failures** - Disable network in DevTools
2. **Timeout errors** - Slow 3G in DevTools
3. **Invalid data** - Mock API with bad data
4. **Permission errors** - Try restricted actions
5. **Concurrent operations** - Rapid clicking

## Error Codes Reference

When backend is implemented, use consistent error codes:

```typescript
export enum ErrorCode {
  // Auth errors (1000-1099)
  UNAUTHORIZED = 'ERR_1000',
  FORBIDDEN = 'ERR_1001',
  SESSION_EXPIRED = 'ERR_1002',

  // Data errors (1100-1199)
  NOT_FOUND = 'ERR_1100',
  VALIDATION_FAILED = 'ERR_1101',
  DUPLICATE_ENTRY = 'ERR_1102',

  // Network errors (1200-1299)
  NETWORK_ERROR = 'ERR_1200',
  TIMEOUT = 'ERR_1201',
  RATE_LIMIT = 'ERR_1202',

  // Server errors (1300-1399)
  INTERNAL_ERROR = 'ERR_1300',
  SERVICE_UNAVAILABLE = 'ERR_1301',
}
```

## Checklist for New Components

When creating new components:

- [ ] Wrap async operations in try-catch
- [ ] Use handleAsync utility for promises
- [ ] Add loading state
- [ ] Add error state with ErrorState component
- [ ] Log errors with logError utility
- [ ] Show user-friendly messages
- [ ] Provide retry functionality where applicable
- [ ] Test error scenarios manually

## Summary

The error handling system provides:
- ✅ Route-level error boundaries (4 routes covered)
- ✅ Reusable error components (ErrorState, InlineError, ErrorBanner)
- ✅ Error logging utility with context
- ✅ Retry logic with exponential backoff
- ✅ Development vs production modes
- ✅ Ready for error tracking service integration
- ✅ User-friendly error messages

This creates a robust foundation that won't need rewriting when the backend is added.
