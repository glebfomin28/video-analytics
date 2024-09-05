import { RefObject, useEffect } from 'react';
import { useThrottle } from '@/shared/hooks/use-throttle';

export const useVideoPlayerControl = ({
  videoRef,
  updateTimestamp,
}: {
  videoRef: RefObject<HTMLVideoElement>;
  updateTimestamp: (timestamp: number) => void;
}) => {
  const handleVideoClick = async () => {
    if (!videoRef?.current) return;
    try {
      if (videoRef?.current?.paused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (e) {
      console.error('Error handleVideoClick: ', e);
    }
  };

  const getTimeUpdate = useThrottle((time: number) => {
    if (!time) return;
    updateTimestamp(time);
  }, 300);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        getTimeUpdate(video.currentTime);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [getTimeUpdate, videoRef]);

  return {
    handleVideoClick,
  };
};
