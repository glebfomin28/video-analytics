import { isActiveTimestamp } from './is-active-timestamp';

describe('is-active-timestamp', () => {
  it('returns true when currentTimestamp is within the range', () => {
    const result = isActiveTimestamp({
      timestamp: 10,
      duration: 5,
      currentTimestamp: 12,
    });
    expect(result).toBe(true);
  });

  it('returns false when currentTimestamp is before the range', () => {
    const result = isActiveTimestamp({
      timestamp: 10,
      duration: 1,
      currentTimestamp: 9,
    });
    expect(result).toBe(false);
  });

  it('returns false when currentTimestamp is after the range', () => {
    const result = isActiveTimestamp({
      timestamp: 10,
      duration: 5,
      currentTimestamp: 16,
    });
    expect(result).toBe(false);
  });

  it('returns true when currentTimestamp is exactly at the start', () => {
    const result = isActiveTimestamp({
      timestamp: 10,
      duration: 5,
      currentTimestamp: 10,
    });
    expect(result).toBe(true);
  });

  it('returns true when currentTimestamp is exactly at the end', () => {
    const result = isActiveTimestamp({
      timestamp: 10,
      duration: 5,
      currentTimestamp: 15,
    });
    expect(result).toBe(true);
  });
});
