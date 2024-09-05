import { useMemo } from 'react';
import { useFetch } from '@/shared/hooks/use-fetch';
import { AnalyticTimestampType } from '../../types/analytic.type';

export const useFetchAnalyticTimestamp = () => {
  const { data, loading, error } = useFetch<AnalyticTimestampType[]>('https://5025y.wiremockapi.cloud/json/1');

  const sortedData = useMemo(() => data?.sort((a, b) => a.timestamp - b.timestamp), [data]);

  return {
    data: sortedData || [],
    loading,
    error,
  };
};
