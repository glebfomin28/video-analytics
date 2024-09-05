import { act, renderHook } from '@testing-library/react';
import { createRef } from 'react';

import { useAnalyticVideoPlayer } from './use-analytic-video-player';

describe('use-calculator-control', () => {
  const videoRef = createRef<HTMLVideoElement>();

  beforeEach(() => {
    Object.assign(videoRef, { current: document.createElement('video') });
  });

  it('returns the correct initial state', () => {
    const { result } = renderHook(() => useAnalyticVideoPlayer(videoRef));

    expect(result.current).toHaveProperty('currentTimestamp');
    expect(result.current).toHaveProperty('setCurrentTimestamp');
    expect(result.current).toHaveProperty('onUpdateTimestamp');
  });

  it('updates currentTimestamp and video currentTime', () => {
    const { result } = renderHook(() => useAnalyticVideoPlayer(videoRef));

    act(() => {
      result.current.onUpdateTimestamp(10);
    });

    expect(videoRef.current?.currentTime).toBe(10);
    expect(result.current?.currentTimestamp).toBe(10);
  });

  it('does not update currentTimestamp or video currentTime if videoRef is null', () => {
    const videoRefNull = createRef<HTMLVideoElement>();
    const { result } = renderHook(() => useAnalyticVideoPlayer(videoRefNull));

    act(() => {
      result.current.onUpdateTimestamp(10);
    });

    expect(result.current.currentTimestamp).toBe(0);
    expect(videoRefNull.current).toBeNull();
  });
});
