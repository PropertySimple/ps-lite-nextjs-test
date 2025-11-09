import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AiSuggestionBannerProps {
  /** The AI-generated suggestion text */
  suggestion: string;
  /** Callback when user accepts the suggestion */
  onAccept: () => void;
  /** Callback when user dismisses the suggestion */
  onDismiss: () => void;
  /** Optional title (defaults to "AI Suggestion") */
  title?: string;
  /** Optional variant */
  variant?: 'default' | 'compact';
  /** Optional className for custom styling */
  className?: string;
}

/**
 * AiSuggestionBanner
 *
 * Displays AI-generated suggestions with accept/dismiss actions.
 * Standardizes the AI suggestion UI pattern across the app.
 *
 * @example
 * ```tsx
 * {aiSuggestion && (
 *   <AiSuggestionBanner
 *     suggestion={aiSuggestion}
 *     onAccept={() => {
 *       setMessage(aiSuggestion);
 *       setAiSuggestion(null);
 *     }}
 *     onDismiss={() => setAiSuggestion(null)}
 *   />
 * )}
 * ```
 */
export function AiSuggestionBanner({
  suggestion,
  onAccept,
  onDismiss,
  title = 'AI Suggestion',
  variant = 'default',
  className,
}: AiSuggestionBannerProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800',
          className
        )}
      >
        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <p className="text-sm text-blue-900 dark:text-blue-100">{suggestion}</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={onAccept} className="h-7">
              Use This
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDismiss}
              className="h-7"
            >
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Alert className={cn('relative', className)}>
      <Sparkles className="h-4 w-4" />
      <AlertDescription className="flex flex-col gap-3">
        <div className="pr-8">
          <p className="font-medium mb-1">{title}</p>
          <p className="text-sm text-muted-foreground">{suggestion}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={onAccept}>
            Use This
          </Button>
          <Button size="sm" variant="outline" onClick={onDismiss}>
            Dismiss
          </Button>
        </div>
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={onDismiss}
        aria-label="Dismiss suggestion"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}

/**
 * AiSuggestionInline
 *
 * Inline variant for smaller spaces (e.g., within forms).
 *
 * @example
 * ```tsx
 * {aiSuggestion && (
 *   <AiSuggestionInline
 *     suggestion={aiSuggestion}
 *     onAccept={handleAccept}
 *     onDismiss={handleDismiss}
 *   />
 * )}
 * ```
 */
export function AiSuggestionInline({
  suggestion,
  onAccept,
  onDismiss,
  className,
}: Omit<AiSuggestionBannerProps, 'variant' | 'title'>) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm',
        className
      )}
    >
      <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
      <span className="flex-1 truncate">{suggestion}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={onAccept}
        className="h-6 px-2"
      >
        Use
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onDismiss}
        className="h-6 w-6 p-0"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
