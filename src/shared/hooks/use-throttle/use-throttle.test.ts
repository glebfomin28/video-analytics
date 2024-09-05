import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './use-throttle';

describe('shared/hooks/use-throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call the callback immediately on the first call', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    // Вызываем throttled функцию
    act(() => {
      result.current('arg1', 'arg2');
    });

    // Проверяем, что callback был вызван немедленно
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should not call the callback again before the delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    act(() => {
      result.current('first call');
      result.current('second call');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first call');
  });

  it('should call the callback again after the delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    // Первый вызов
    act(() => {
      result.current('first call');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Второй вызов (не должен сработать)
    act(() => {
      result.current('second call');
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Коллбэк должен сработать второй раз
    act(() => {
      result.current('third call');
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('first call');
    expect(callback).toHaveBeenCalledWith('third call');
  });
});
