import { act, renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { useThrottle } from '@/shared/hooks/use-throttle';
import { useVideoPlayerControl } from './use-video-player-control';

jest.mock('@/shared/hooks/use-throttle', () => ({
  useThrottle: jest.fn((fn) => fn as unknown),
}));

describe('use-video-player-control', () => {
  const videoRef = createRef<HTMLVideoElement>();
  const updateTimestamp = jest.fn();
  let videoElement: HTMLVideoElement;

  beforeEach(() => {
    videoElement = document.createElement('video');
    videoElement.play = jest.fn().mockResolvedValue(undefined);
    videoElement.pause = jest.fn();

    Object.assign(videoRef, { current: videoElement });
  });

  it('handleVideoClick plays the video if it is paused', async () => {
    Object.defineProperty(videoElement, 'paused', { value: true, writable: true });

    const playSpy = jest.spyOn(videoElement, 'play');
    const pauseSpy = jest.spyOn(videoElement, 'pause');

    const { result } = renderHook(() => useVideoPlayerControl({ videoRef, updateTimestamp }));

    await act(async () => {
      await result.current.handleVideoClick();
    });

    expect(playSpy).toHaveBeenCalled();
    expect(pauseSpy).not.toHaveBeenCalled();
  });

  it('handleVideoClick pauses the video if it is playing', async () => {
    Object.defineProperty(videoElement, 'paused', { value: false, writable: true });

    const playSpy = jest.spyOn(videoElement, 'play');
    const pauseSpy = jest.spyOn(videoElement, 'pause');

    const { result } = renderHook(() => useVideoPlayerControl({ videoRef, updateTimestamp }));

    await act(async () => {
      await result.current.handleVideoClick();
    });

    expect(playSpy).not.toHaveBeenCalled();
    expect(pauseSpy).toHaveBeenCalled();
  });

  it('updates timestamp on timeupdate event', () => {
    const mockThrottle = jest.fn(updateTimestamp);
    jest.mocked(useThrottle).mockReturnValue(mockThrottle);

    renderHook(() => useVideoPlayerControl({ videoRef, updateTimestamp }));

    act(() => {
      videoElement.currentTime = 10;
      const event = new Event('timeupdate');
      videoElement.dispatchEvent(event);
    });

    expect(mockThrottle).toHaveBeenCalledWith(10);
    expect(updateTimestamp).toHaveBeenCalledWith(10);
  });

  it('removes event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(videoElement, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(videoElement, 'removeEventListener');

    const { unmount } = renderHook(() => useVideoPlayerControl({ videoRef, updateTimestamp }));

    expect(addEventListenerSpy).toHaveBeenCalledWith('timeupdate', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('timeupdate', expect.any(Function));
  });
});
