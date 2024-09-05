import { renderHook } from '@testing-library/react';
import { useFetchAnalyticTimestamp } from './use-fetch-analytic-timestamp';
import { useFetch } from '@/shared/hooks/use-fetch';

jest.mock('@/shared/hooks/use-fetch');

const mockData = [{ timestamp: 3 }, { timestamp: 1 }, { timestamp: 2 }];

describe('use-fetch-analytic-timestamp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return sorted data', () => {
    jest.mocked(useFetch).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useFetchAnalyticTimestamp());

    expect(result.current.data).toEqual([{ timestamp: 1 }, { timestamp: 2 }, { timestamp: 3 }]);
  });

  it('should return an empty array if there is no data', () => {
    jest.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useFetchAnalyticTimestamp());

    expect(result.current.data).toEqual([]);
  });

  it('should return a loading flag when data is loaded', () => {
    jest.mocked(useFetch).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => useFetchAnalyticTimestamp());

    expect(result.current.loading).toBe(true);
  });

  it('should return an error if an error occurs', () => {
    jest.mocked(useFetch).mockReturnValue({
      data: null,
      loading: false,
      error: 'Some error' as unknown as Error,
    });

    const { result } = renderHook(() => useFetchAnalyticTimestamp());

    expect(result.current.error).toBe('Some error');
  });
});
