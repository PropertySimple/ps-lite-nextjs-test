import { useState, useMemo, useCallback } from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export type SortDirection = 'asc' | 'desc';

/**
 * useTableSort Hook
 *
 * Manages table sorting state and provides sorted data.
 * Eliminates repetitive sorting logic in table components.
 *
 * @param data - Array of items to sort
 * @param initialField - Initial field to sort by
 * @param initialDirection - Initial sort direction ('asc' or 'desc')
 * @returns Object with sorted data and sorting controls
 *
 * @example
 * ```tsx
 * const { sortedData, sortField, sortDirection, handleSort, getSortIcon } =
 *   useTableSort(contacts, 'name', 'asc');
 *
 * return (
 *   <Table>
 *     <TableHead>
 *       <TableRow>
 *         <TableHeader onClick={() => handleSort('name')}>
 *           Name {getSortIcon('name')}
 *         </TableHeader>
 *       </TableRow>
 *     </TableHead>
 *     <TableBody>
 *       {sortedData.map(contact => (
 *         <TableRow key={contact.id}>
 *           <TableCell>{contact.name}</TableCell>
 *         </TableRow>
 *       ))}
 *     </TableBody>
 *   </Table>
 * );
 * ```
 */
export function useTableSort<T extends Record<string, unknown>>(
  data: T[],
  initialField: keyof T,
  initialDirection: SortDirection = 'asc'
) {
  const [sortField, setSortField] = useState<keyof T>(initialField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);

  /**
   * Sort data based on current sort field and direction
   */
  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Handle different types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      // Handle dates
      if (aValue instanceof Date && bValue instanceof Date) {
        const comparison = aValue.getTime() - bValue.getTime();
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      // Handle date strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          const comparison = aDate.getTime() - bDate.getTime();
          return sortDirection === 'asc' ? comparison : -comparison;
        }
      }

      // Fallback to string comparison
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortField, sortDirection]);

  /**
   * Handle sort field change
   * - If clicking the same field, toggle direction
   * - If clicking a new field, set to ascending
   */
  const handleSort = useCallback((field: keyof T) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  /**
   * Get the appropriate sort icon for a column
   */
  const getSortIcon = useCallback((field: keyof T) => {
    if (sortField !== field) {
      return ArrowUpDown;
    }
    return sortDirection === 'asc' ? ChevronUp : ChevronDown;
  }, [sortField, sortDirection]);

  /**
   * Check if a field is currently being sorted
   */
  const isSortedBy = useCallback((field: keyof T) => {
    return sortField === field;
  }, [sortField]);

  /**
   * Reset sorting to initial state
   */
  const resetSort = useCallback(() => {
    setSortField(initialField);
    setSortDirection(initialDirection);
  }, [initialField, initialDirection]);

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort,
    getSortIcon,
    isSortedBy,
    resetSort,
    setSortField,
    setSortDirection,
  };
}
