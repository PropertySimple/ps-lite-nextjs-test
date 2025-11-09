import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTableFilter, useMultiFieldFilter } from '../useTableFilter';

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
  company: string;
}

describe('useTableFilter', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 25, company: 'TechCorp' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 30, company: 'DevInc' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@test.com', age: 35, company: 'TechCorp' },
    { id: 4, name: 'David Lee', email: 'david@example.com', age: 28, company: 'StartupXYZ' },
  ];

  it('should return all data when query is empty', () => {
    const { result } = renderHook(() => useTableFilter(mockData));

    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.isFiltered).toBe(false);
  });

  it('should filter data with custom filter function', () => {
    const filterFn = (item: TestData, query: string) =>
      item.name.toLowerCase().includes(query.toLowerCase());

    const { result } = renderHook(() => useTableFilter(mockData, filterFn, 'alice'));

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Alice Johnson');
  });

  it('should use default JSON filter when no filter function provided', () => {
    const { result } = renderHook(() => useTableFilter(mockData, undefined, 'techcorp'));

    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.every(item => item.company === 'TechCorp')).toBe(true);
  });

  it('should update filtered data when query changes', () => {
    const { result } = renderHook(() => useTableFilter(mockData));

    expect(result.current.filteredData).toEqual(mockData);

    act(() => {
      result.current.setQuery('bob');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Bob Smith');
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useTableFilter(mockData, undefined, 'ALICE'));

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Alice Johnson');
  });

  it('should clear filter', () => {
    const { result } = renderHook(() => useTableFilter(mockData, undefined, 'bob'));

    expect(result.current.filteredData).toHaveLength(1);

    act(() => {
      result.current.clearFilter();
    });

    expect(result.current.query).toBe('');
    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.isFiltered).toBe(false);
  });

  it('should track filtered state correctly', () => {
    const { result } = renderHook(() => useTableFilter(mockData));

    expect(result.current.isFiltered).toBe(false);

    act(() => {
      result.current.setQuery('test');
    });

    expect(result.current.isFiltered).toBe(true);
  });

  it('should provide result count', () => {
    const { result } = renderHook(() => useTableFilter(mockData, undefined, 'techcorp'));

    expect(result.current.resultCount).toBe(2);
  });

  it('should detect no results', () => {
    const { result } = renderHook(() => useTableFilter(mockData, undefined, 'nonexistent'));

    expect(result.current.hasNoResults).toBe(true);
    expect(result.current.resultCount).toBe(0);
  });

  it('should handle whitespace-only queries as empty', () => {
    const { result } = renderHook(() => useTableFilter(mockData, undefined, '   '));

    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.isFiltered).toBe(false);
  });

  it('should handle empty data array', () => {
    const { result } = renderHook(() => useTableFilter<TestData>([], undefined, 'query'));

    expect(result.current.filteredData).toEqual([]);
    expect(result.current.hasNoResults).toBe(true);
  });
});

describe('useMultiFieldFilter', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 25, company: 'TechCorp' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 30, company: 'DevInc' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@test.com', age: 35, company: 'TechCorp' },
    { id: 4, name: 'David Lee', email: 'david@example.com', age: 28, company: 'StartupXYZ' },
  ];

  it('should filter across multiple fields', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['name', 'email'], 'alice')
    );

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Alice Johnson');
  });

  it('should match any of the specified fields', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['name', 'company'], 'tech')
    );

    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.every(
      item => item.company.toLowerCase().includes('tech') || item.name.toLowerCase().includes('tech')
    )).toBe(true);
  });

  it('should handle searches in email field', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['email'], 'test.com')
    );

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].email).toBe('charlie@test.com');
  });

  it('should handle multiple field search', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['name', 'email', 'company'], 'example')
    );

    expect(result.current.filteredData).toHaveLength(3);
  });

  it('should be case insensitive across all fields', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['name', 'email', 'company'], 'TECHCORP')
    );

    expect(result.current.filteredData).toHaveLength(2);
  });

  it('should handle null/undefined field values', () => {
    const dataWithNulls = [
      ...mockData,
      { id: 5, name: 'Eve', email: '', age: 22, company: '' } as TestData,
    ];

    const { result } = renderHook(() =>
      useMultiFieldFilter(dataWithNulls, ['name', 'email'], 'eve')
    );

    expect(result.current.filteredData).toHaveLength(1);
  });

  it('should update when query changes', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['name', 'email'])
    );

    expect(result.current.filteredData).toEqual(mockData);

    act(() => {
      result.current.setQuery('smith');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Bob Smith');
  });

  it('should clear filter correctly', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['name'], 'alice')
    );

    expect(result.current.filteredData).toHaveLength(1);

    act(() => {
      result.current.clearFilter();
    });

    expect(result.current.filteredData).toEqual(mockData);
  });

  it('should handle empty field array gracefully', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, [], 'alice')
    );

    expect(result.current.filteredData).toEqual([]);
  });

  it('should provide accurate result count', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['company'], 'techcorp')
    );

    expect(result.current.resultCount).toBe(2);
  });

  it('should handle numeric fields converted to strings', () => {
    const { result } = renderHook(() =>
      useMultiFieldFilter(mockData, ['age' as keyof TestData], '30')
    );

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].age).toBe(30);
  });
});
