export const isActiveTimestamp = ({
  timestamp,
  duration,
  currentTimestamp,
}: {
  timestamp: number;
  duration: number;
  currentTimestamp: number;
}) => {
  const start = timestamp;
  const end = timestamp + duration;
  return currentTimestamp >= start && currentTimestamp <= end;
};
