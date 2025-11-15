import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error;
  onRetry?: () => void;
  showDetails?: boolean;
}

/**
 * Reusable error state component for displaying errors in components
 *
 * Usage:
 * ```tsx
 * {error && <ErrorState error={error} onRetry={() => refetch()} />}
 * ```
 */
export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  error,
  onRetry,
  showDetails = process.env.NODE_ENV === 'development',
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        {showDetails && error && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium mb-2">
              Error details
            </summary>
            <pre className="bg-muted p-3 rounded text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        {onRetry && (
          <Button onClick={onRetry} className="w-full" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Inline error message component for forms and inputs
 */
export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-destructive mt-2">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

/**
 * Compact error banner for list items or cards
 */
export function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
