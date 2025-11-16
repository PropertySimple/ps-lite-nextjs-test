'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function InboxError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Inbox error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Error Loading Inbox</h1>
          <p className="text-muted-foreground">
            We couldn't load your inbox messages. Please try again.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm font-medium">Error details</summary>
              <pre className="mt-2 text-xs bg-muted p-3 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
