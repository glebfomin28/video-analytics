export function formatTimestamp(time: number): string {
  const totalSeconds = Math.floor(time);
  const milliseconds = Math.round((time - totalSeconds) * 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}
