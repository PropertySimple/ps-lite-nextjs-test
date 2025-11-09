import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useSessionStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default value when key does not exist', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('should initialize with stored value when key exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('stored');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('should support functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10));

    act(() => {
      result.current[1](prev => prev + 5);
    });

    expect(result.current[0]).toBe(15);
  });

  it('should handle complex objects', () => {
    const complexObj = { id: 1, name: 'Test', nested: { value: 42 } };
    const { result } = renderHook(() => useLocalStorage('test-key', complexObj));

    expect(result.current[0]).toEqual(complexObj);

    act(() => {
      result.current[1]({ ...complexObj, name: 'Updated' });
    });

    expect(result.current[0]).toEqual({ ...complexObj, name: 'Updated' });
  });

  it('should handle arrays', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('test-key', [1, 2, 3]));

    act(() => {
      result.current[1](prev => [...prev, 4]);
    });

    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it('should remove value from localStorage when removeValue is called', () => {
    localStorage.setItem('test-key', JSON.stringify('value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('value');

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('default');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle invalid JSON gracefully', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    localStorage.setItem('test-key', 'invalid-json');

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it('should persist value in localStorage', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('shared-key', 'initial'));

    act(() => {
      result1.current[1]('updated');
    });

    const { result: result2 } = renderHook(() => useLocalStorage('shared-key', 'initial'));

    expect(result2.current[0]).toBe('updated');
  });

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem('test-key')).toBe('true');
  });

  it('should handle null values', () => {
    const { result } = renderHook(() => useLocalStorage<string | null>('test-key', null));

    expect(result.current[0]).toBeNull();

    act(() => {
      result.current[1]('not null');
    });

    expect(result.current[0]).toBe('not null');
  });
});

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with default value', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('should store value in sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(sessionStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('should remove value from sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 'value'));

    act(() => {
      result.current[2]();
    });

    expect(sessionStorage.getItem('test-key')).toBeNull();
    expect(result.current[0]).toBe('value');
  });

  it('should handle complex objects in sessionStorage', () => {
    const obj = { id: 1, data: [1, 2, 3] };
    const { result } = renderHook(() => useSessionStorage('test-key', obj));

    expect(result.current[0]).toEqual(obj);

    act(() => {
      result.current[1]({ id: 2, data: [4, 5] });
    });

    expect(result.current[0]).toEqual({ id: 2, data: [4, 5] });
  });
});
