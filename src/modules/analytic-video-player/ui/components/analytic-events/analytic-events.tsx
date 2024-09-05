import { isActiveTimestamp } from '../../../utils/is-active-timestamp/is-active-timestamp';
import { AnalyticTimestampType } from '../../../model/types/analytic.type';
import cls from './analytic-events.module.scss';

export const AnalyticEvents = ({
  timeStamps = [],
  currentTimestamp,
}: {
  timeStamps: AnalyticTimestampType[] | null;
  currentTimestamp: number;
}) => {
  return timeStamps?.map(({ zone, timestamp, duration }) => {
    if (
      !isActiveTimestamp({
        timestamp,
        duration,
        currentTimestamp,
      })
    ) {
      return null;
    }

    return (
      <div
        className={cls.analytic_event}
        key={timestamp}
        style={{
          left: zone.left,
          top: zone.top,
          width: zone.width,
          height: zone.height,
        }}
      />
    );
  });
};
