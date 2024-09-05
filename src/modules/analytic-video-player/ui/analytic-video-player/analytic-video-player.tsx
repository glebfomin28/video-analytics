import { useRef } from 'react';

import { VideoPlayer } from '../components/video-player/video-player';
import { TimeStampList } from '../components/time-stamp-list/time-stamp-list';
import { AnalyticEvents } from '../components/analytic-events/analytic-events';
import { useAnalyticVideoPlayer } from '../../model/hooks/use-analytic-video-player/use-analytic-video-player';
import { useFetchAnalyticTimestamp } from '../../model/hooks/use-fetch-analytic-timestamp/use-fetch-analytic-timestamp';
import cls from './analytic-video-player.module.scss';

export const AnalyticVideoPlayer = () => {
  const { data, loading, error } = useFetchAnalyticTimestamp();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { currentTimestamp, setCurrentTimestamp, onUpdateTimestamp } = useAnalyticVideoPlayer(videoRef);

  return (
    <section className={cls.section}>
      <VideoPlayer
        ref={videoRef}
        analyticEventsRender={<AnalyticEvents timeStamps={data} currentTimestamp={currentTimestamp} />}
        updateTimestamp={setCurrentTimestamp}
      />
      <TimeStampList
        timestamps={data}
        currentTimestamp={currentTimestamp}
        changeTimestamp={onUpdateTimestamp}
        isLoading={loading}
        isError={!!error}
      />
    </section>
  );
};
