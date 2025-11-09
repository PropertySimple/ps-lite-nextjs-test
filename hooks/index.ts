/**
 * Hooks Index
 *
 * Central export point for all custom hooks.
 * Import hooks from here to maintain consistency.
 */

// Existing hooks
export { useAdBuilder } from './useAdBuilder';
export { useToast, toast } from './use-toast';
export { useIsMobile } from './use-mobile';

// New shared hooks (Week 3)
export { useModal, useModalWithData } from './useModal';
export { useTableSort } from './useTableSort';
export { useTableFilter, useMultiFieldFilter } from './useTableFilter';
export { useLocalStorage, useSessionStorage } from './useLocalStorage';
export { useDebounce, useDebouncedCallback } from './useDebounce';

// Type exports
export type { SortDirection } from './useTableSort';
export type { FilterFn } from './useTableFilter';
