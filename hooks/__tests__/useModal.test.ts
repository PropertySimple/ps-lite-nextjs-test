import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModal, useModalWithData } from '../useModal';

describe('useModal', () => {
  it('should initialize with closed state by default', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.open).toBe(false);
    expect(result.current.isOpen).toBe(false);
    expect(result.current.isClosed).toBe(true);
  });

  it('should initialize with open state when initialOpen is true', () => {
    const { result } = renderHook(() => useModal(true));

    expect(result.current.open).toBe(true);
    expect(result.current.isOpen).toBe(true);
    expect(result.current.isClosed).toBe(false);
  });

  it('should open modal when openModal is called', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.open).toBe(true);
    expect(result.current.isOpen).toBe(true);
  });

  it('should close modal when closeModal is called', () => {
    const { result } = renderHook(() => useModal(true));

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.isClosed).toBe(true);
  });

  it('should toggle modal state', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.toggleModal();
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.toggleModal();
    });
    expect(result.current.open).toBe(false);
  });

  it('should update state when setOpen is called', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.setOpen(true);
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.open).toBe(false);
  });
});

describe('useModalWithData', () => {
  it('should initialize without data', () => {
    const { result } = renderHook(() => useModalWithData<string>());

    expect(result.current.open).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should initialize with initial data', () => {
    const initialData = { id: 1, name: 'Test' };
    const { result } = renderHook(() => useModalWithData(false, initialData));

    expect(result.current.data).toEqual(initialData);
  });

  it('should open modal with data', () => {
    const { result } = renderHook(() => useModalWithData<{ id: number; name: string }>());
    const testData = { id: 1, name: 'Test' };

    act(() => {
      result.current.openModal(testData);
    });

    expect(result.current.open).toBe(true);
    expect(result.current.data).toEqual(testData);
  });

  it('should keep data when closeModal is called', () => {
    const testData = { id: 1, name: 'Test' };
    const { result} = renderHook(() => useModalWithData<{ id: number; name: string }>(false, testData));

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.data).toEqual(testData);
  });

  it('should update data with setData', () => {
    const { result } = renderHook(() => useModalWithData<string>());

    act(() => {
      result.current.setData('new data');
    });

    expect(result.current.data).toBe('new data');
  });

  it('should open modal without changing data if no data provided', () => {
    const initialData = { id: 1, name: 'Initial' };
    const { result } = renderHook(() => useModalWithData(false, initialData));

    act(() => {
      result.current.openModal();
    });

    expect(result.current.open).toBe(true);
    expect(result.current.data).toEqual(initialData);
  });

  it('should keep data when toggling if not cleared', () => {
    const testData = { id: 1, name: 'Test' };
    const { result } = renderHook(() => useModalWithData<{ id: number; name: string }>());

    act(() => {
      result.current.openModal(testData);
    });

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.data).toEqual(testData);
  });
});
