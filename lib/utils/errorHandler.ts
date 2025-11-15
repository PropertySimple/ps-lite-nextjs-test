/**
 * Centralized error handling utility
 *
 * Features:
 * - Consistent error logging
 * - Error tracking service integration (ready for Sentry)
 * - User-friendly error messages
 * - Development vs production modes
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public context?: ErrorContext
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Log error to console and error tracking service
 */
export function logError(error: Error | AppError, context?: ErrorContext): void {
  const isDev = process.env.NODE_ENV === 'development';

  // Always log to console in development
  if (isDev) {
    console.error('Error occurred:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  // In production, send to error tracking service
  if (!isDev) {
    // TODO: Integrate with Sentry or similar service
    // Sentry.captureException(error, { contexts: { app: context } });

    // For now, log minimal info to console
    console.error('[Production Error]:', error.message);
  }
}

/**
 * Handle async operation with try-catch wrapper
 * Returns [data, error] tuple
 */
export async function handleAsync<T>(
  promise: Promise<T>,
  context?: ErrorContext
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logError(err, context);
    return [null, err];
  }
}

/**
 * Get user-friendly error message
 */
export function getUserErrorMessage(error: Error): string {
  if (error instanceof AppError && error.message) {
    return error.message;
  }

  // Network errors
  if (error.message.includes('fetch') || error.message.includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Timeout errors
  if (error.message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  // Default fallback
  return 'Something went wrong. Please try again or contact support if the problem persists.';
}

/**
 * Safe error message for UI display
 * Hides sensitive details in production
 */
export function getSafeErrorMessage(error: Error): string {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    return error.message || 'An error occurred';
  }

  return getUserErrorMessage(error);
}

/**
 * Retry async operation with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
        onRetry?.(attempt + 1, lastError);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}
