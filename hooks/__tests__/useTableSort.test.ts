import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTableSort } from '../useTableSort';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';

interface TestData {
  id: number;
  name: string;
  age: number;
  date: string;
  score: number | null;
}

describe('useTableSort', () => {
  const mockData: TestData[] = [
    { id: 3, name: 'Charlie', age: 35, date: '2023-03-15', score: 85 },
    { id: 1, name: 'Alice', age: 25, date: '2023-01-10', score: null },
    { id: 2, name: 'Bob', age: 30, date: '2023-02-20', score: 92 },
    { id: 4, name: 'David', age: 28, date: '2023-04-05', score: 78 },
  ];

  it('should sort data by initial field in ascending order', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'id', 'asc'));

    expect(result.current.sortedData[0].id).toBe(1);
    expect(result.current.sortedData[3].id).toBe(4);
  });

  it('should sort data by initial field in descending order', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'id', 'desc'));

    expect(result.current.sortedData[0].id).toBe(4);
    expect(result.current.sortedData[3].id).toBe(1);
  });

  it('should sort strings correctly', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'name', 'asc'));

    expect(result.current.sortedData[0].name).toBe('Alice');
    expect(result.current.sortedData[3].name).toBe('David');
  });

  it('should sort numbers correctly', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'age', 'desc'));

    expect(result.current.sortedData[0].age).toBe(35);
    expect(result.current.sortedData[3].age).toBe(25);
  });

  it('should sort dates correctly', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'date', 'asc'));

    expect(result.current.sortedData[0].date).toBe('2023-01-10');
    expect(result.current.sortedData[3].date).toBe('2023-04-05');
  });

  it('should handle null values by placing them at the end', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'score', 'asc'));

    expect(result.current.sortedData[0].score).toBe(78);
    expect(result.current.sortedData[3].score).toBeNull();
  });

  it('should toggle sort direction when clicking same field', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'name', 'asc'));

    expect(result.current.sortDirection).toBe('asc');

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].name).toBe('David');

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData[0].name).toBe('Alice');
  });

  it('should reset to ascending when sorting by new field', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'name', 'desc'));

    expect(result.current.sortDirection).toBe('desc');

    act(() => {
      result.current.handleSort('age');
    });

    expect(result.current.sortField).toBe('age');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.sortedData[0].age).toBe(25);
  });

  it('should provide correct sort icon', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'name', 'asc'));

    expect(result.current.getSortIcon('name')).toBe(ChevronUp);
    expect(result.current.getSortIcon('age')).toBe(ArrowUpDown);

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.getSortIcon('name')).toBe(ChevronDown);
  });

  it('should correctly identify sorted field', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'name', 'asc'));

    expect(result.current.isSortedBy('name')).toBe(true);
    expect(result.current.isSortedBy('age')).toBe(false);

    act(() => {
      result.current.handleSort('age');
    });

    expect(result.current.isSortedBy('name')).toBe(false);
    expect(result.current.isSortedBy('age')).toBe(true);
  });

  it('should reset sort to initial state', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'id', 'asc'));

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortField).toBe('name');

    act(() => {
      result.current.resetSort();
    });

    expect(result.current.sortField).toBe('id');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('should allow manual sort field and direction changes', () => {
    const { result } = renderHook(() => useTableSort(mockData, 'id', 'asc'));

    act(() => {
      result.current.setSortField('name');
    });

    expect(result.current.sortField).toBe('name');

    act(() => {
      result.current.setSortDirection('desc');
    });

    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].name).toBe('David');
  });

  it('should handle empty data array', () => {
    const { result } = renderHook(() => useTableSort<TestData>([], 'id', 'asc'));

    expect(result.current.sortedData).toEqual([]);
  });

  it('should handle single item array', () => {
    const singleItem = [mockData[0]];
    const { result } = renderHook(() => useTableSort(singleItem, 'name', 'asc'));

    expect(result.current.sortedData).toEqual(singleItem);
  });

  it('should maintain referential stability with memoization', () => {
    const { result, rerender } = renderHook(
      ({ data }) => useTableSort(data, 'name', 'asc'),
      { initialProps: { data: mockData } }
    );

    const firstResult = result.current.sortedData;

    // Rerender with same data
    rerender({ data: mockData });

    expect(result.current.sortedData).toBe(firstResult);
  });
});
