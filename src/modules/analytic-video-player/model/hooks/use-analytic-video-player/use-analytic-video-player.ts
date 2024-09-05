import { RefObject, useState } from 'react';

export const useAnalyticVideoPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);

  const onUpdateTimestamp = (newTimestamp: number) => {
    if (videoRef.current) {
      setCurrentTimestamp(newTimestamp);
      videoRef.current.currentTime = newTimestamp;
    }
  };

  return {
    currentTimestamp,
    setCurrentTimestamp,
    onUpdateTimestamp,
  };
};
