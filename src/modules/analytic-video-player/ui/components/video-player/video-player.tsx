import { forwardRef, ReactNode, RefObject } from 'react';
import cls from './video-player.module.scss';
import { useVideoPlayerControl } from '@/modules/analytic-video-player/model/hooks/use-video-player-control/use-video-player-control';

export const VideoPlayer = forwardRef<
  HTMLVideoElement,
  {
    analyticEventsRender: ReactNode;
    updateTimestamp: (timestamp: number) => void;
  }
>(({ analyticEventsRender, updateTimestamp }, ref) => {
  const { handleVideoClick } = useVideoPlayerControl({
    videoRef: ref as RefObject<HTMLVideoElement>,
    updateTimestamp,
  });

  return (
    <div className={cls.video_player} onClick={handleVideoClick}>
      <video data-testid="video" ref={ref} width="1280" height="720" controls onClick={(e) => e.stopPropagation()}>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
      {analyticEventsRender}
    </div>
  );
});
