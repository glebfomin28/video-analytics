import cn from 'classnames';
import { formatTimestamp } from '@/shared/utils/format-timestamp';

import { isActiveTimestamp } from '../../../utils/is-active-timestamp/is-active-timestamp';
import { AnalyticTimestampType } from '../../../model/types/analytic.type';
import cls from './time-stamp-list.module.scss';
import { InfiniteList } from '@/shared/ui/infinite-list';

export const TimeStampList = ({
  timestamps = [],
  currentTimestamp = 0,
  changeTimestamp,
  isLoading,
  isError,
}: {
  timestamps: AnalyticTimestampType[];
  currentTimestamp: number;
  changeTimestamp: (timestamp: number) => void;
  isLoading?: boolean;
  isError?: boolean;
}) => {
  if (isError) {
    return (
      <section className={cls.time_stamps}>
        <p>Error</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={cls.time_stamps}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={cls.time_stamps}>
      <InfiniteList
        data-testid="infinite-list"
        itemCount={timestamps?.length || 0}
        itemSize={32}
        renderComponents={({ index, style }) => (
          <div
            key={timestamps[index].timestamp}
            className={cn(cls.time_stamp, {
              [cls.time_stamp_active]: isActiveTimestamp({
                timestamp: timestamps[index].timestamp,
                duration: timestamps[index].duration,
                currentTimestamp,
              }),
            })}
            onClick={() => changeTimestamp(timestamps[index].timestamp)}
            style={style}
          >
            {formatTimestamp(timestamps[index].timestamp)}
          </div>
        )}
      />
    </section>
  );
};
