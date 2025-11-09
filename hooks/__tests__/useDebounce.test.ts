import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce, useDebouncedCallback } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial'));

    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBe('initial');

    // Update value
    act(() => {
      rerender({ value: 'updated' });
    });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout when value changes rapidly', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    act(() => {
      rerender({ value: 'first' });
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    act(() => {
      rerender({ value: 'second' });
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    act(() => {
      rerender({ value: 'third' });
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // After 600ms total, value should still be 'initial'
    expect(result.current).toBe('initial');

    // After 500ms from last update
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('third');
  });

  it('should use custom delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'initial' },
    });

    act(() => {
      rerender({ value: 'updated' });
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should handle different types of values', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 0 },
    });

    act(() => {
      rerender({ value: 42 });
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(42);

    act(() => {
      rerender({ value: 0 });
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(0);
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should debounce callback execution', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    result.current('arg1', 'arg2');

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous timeout on rapid calls', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current('first');
      vi.advanceTimersByTime(200);
    });

    act(() => {
      result.current('second');
      vi.advanceTimersByTime(200);
    });

    act(() => {
      result.current('third');
      vi.advanceTimersByTime(200);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledWith('third');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should use custom delay', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 1000));

    result.current('test');

    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledWith('test');
  });

  it('should handle multiple calls after delay', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    result.current('first');
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledWith('first');
    expect(callback).toHaveBeenCalledTimes(1);

    result.current('second');
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledWith('second');
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should preserve function arguments types', () => {
    const callback = vi.fn((a: number, b: string) => `${a}-${b}`);
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    result.current(42, 'test');
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledWith(42, 'test');
  });
});
