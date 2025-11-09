import { useState, useMemo, useCallback } from 'react';

/**
 * Filter function type
 * Returns true if item matches the filter criteria
 */
export type FilterFn<T> = (item: T, query: string) => boolean;

/**
 * useTableFilter Hook
 *
 * Manages table filtering with search query and custom filter logic.
 * Provides filtered data and filter state management.
 *
 * @param data - Array of items to filter
 * @param filterFn - Custom filter function (optional)
 * @param initialQuery - Initial search query (default: '')
 * @returns Object with filtered data and filter controls
 *
 * @example
 * ```tsx
 * // Basic usage with custom filter
 * const { filteredData, query, setQuery, clearFilter } = useTableFilter(
 *   contacts,
 *   (contact, query) => {
 *     const lowerQuery = query.toLowerCase();
 *     return (
 *       contact.name.toLowerCase().includes(lowerQuery) ||
 *       contact.email?.toLowerCase().includes(lowerQuery)
 *     );
 *   }
 * );
 *
 * return (
 *   <>
 *     <Input
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *       placeholder="Search contacts..."
 *     />
 *     {filteredData.map(contact => (
 *       <ContactCard key={contact.id} contact={contact} />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @example
 * ```tsx
 * // With multiple fields
 * const filterFn = (contact: Contact, query: string) => {
 *   const lowerQuery = query.toLowerCase();
 *   return [
 *     contact.name,
 *     contact.email,
 *     contact.phone,
 *     contact.company,
 *   ].some(field =>
 *     field?.toLowerCase().includes(lowerQuery)
 *   );
 * };
 *
 * const { filteredData, query, setQuery } = useTableFilter(contacts, filterFn);
 * ```
 */
export function useTableFilter<T>(
  data: T[],
  filterFn?: FilterFn<T>,
  initialQuery = ''
) {
  const [query, setQuery] = useState(initialQuery);

  /**
   * Filter data based on query and filter function
   */
  const filteredData = useMemo(() => {
    if (!query.trim()) {
      return data;
    }

    if (!filterFn) {
      // Default filter: convert to string and search
      const lowerQuery = query.toLowerCase();
      return data.filter(item =>
        JSON.stringify(item).toLowerCase().includes(lowerQuery)
      );
    }

    return data.filter(item => filterFn(item, query));
  }, [data, query, filterFn]);

  /**
   * Clear the filter query
   */
  const clearFilter = useCallback(() => {
    setQuery('');
  }, []);

  /**
   * Check if filter is active
   */
  const isFiltered = useMemo(() => {
    return query.trim().length > 0;
  }, [query]);

  /**
   * Get filter result count
   */
  const resultCount = useMemo(() => {
    return filteredData.length;
  }, [filteredData]);

  /**
   * Check if there are no results
   */
  const hasNoResults = useMemo(() => {
    return isFiltered && resultCount === 0;
  }, [isFiltered, resultCount]);

  return {
    filteredData,
    query,
    setQuery,
    clearFilter,
    isFiltered,
    resultCount,
    hasNoResults,
  };
}

/**
 * useMultiFieldFilter Hook
 *
 * Extended filter hook that searches across multiple specified fields.
 * More convenient for common use cases.
 *
 * @param data - Array of items to filter
 * @param fields - Array of field names to search
 * @param initialQuery - Initial search query
 *
 * @example
 * ```tsx
 * const { filteredData, query, setQuery } = useMultiFieldFilter(
 *   contacts,
 *   ['name', 'email', 'phone', 'company']
 * );
 * ```
 */
export function useMultiFieldFilter<T extends Record<string, unknown>>(
  data: T[],
  fields: (keyof T)[],
  initialQuery = ''
) {
  const filterFn: FilterFn<T> = useCallback(
    (item, query) => {
      const lowerQuery = query.toLowerCase();
      return fields.some(field => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      });
    },
    [fields]
  );

  return useTableFilter(data, filterFn, initialQuery);
}
