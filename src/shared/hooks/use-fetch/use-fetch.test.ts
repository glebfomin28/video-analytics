import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './use-fetch';

global.fetch = jest.fn();

describe('shared/hooks/use-fetch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data after a successful request', async () => {
    const mockData = { message: 'Success' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should return an error if the request fails', async () => {
    const mockError = new Error('Fetch failed');

    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    // Изначально loading должно быть true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('should return an error on unsuccessful response status', async () => {
    // Мок для ответа с ошибочным статусом
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    // Изначально loading должно быть true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Ждем обновления хука (fetch должен завершиться)
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Проверяем, что ошибка была установлена корректно
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(new Error('HTTP error! status: 404'));
  });

  it('should return the loading state', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
