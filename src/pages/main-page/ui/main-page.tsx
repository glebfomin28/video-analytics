import { AnalyticVideoPlayer } from '@/modules/analytic-video-player';
import cls from './main-page.module.scss';

export const MainPage = () => {
  return (
    <main className={cls.page}>
      <AnalyticVideoPlayer />
    </main>
  );
};
