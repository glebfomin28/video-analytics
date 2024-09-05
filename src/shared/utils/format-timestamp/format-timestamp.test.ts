import { formatTimestamp } from './format-timestamp';

describe('shared/utils/format-timestamp', () => {
  it('should format time with full minutes and seconds correctly', () => {
    expect(formatTimestamp(90)).toBe('01:30:000');
  });

  it('should format time with decimal seconds correctly', () => {
    expect(formatTimestamp(90.123)).toBe('01:30:123');
  });

  it('should pad minutes, seconds, and milliseconds with zeros', () => {
    expect(formatTimestamp(0)).toBe('00:00:000');
    expect(formatTimestamp(1)).toBe('00:01:000');
    expect(formatTimestamp(0.5)).toBe('00:00:500');
  });

  it('should handle large values of minutes and seconds correctly', () => {
    expect(formatTimestamp(3605.678)).toBe('60:05:678');
  });

  it('should round milliseconds correctly', () => {
    expect(formatTimestamp(1.999)).toBe('00:01:999');
  });

  it('should handle milliseconds less than 1000', () => {
    expect(formatTimestamp(0.123)).toBe('00:00:123');
  });
});
