import { render } from '@testing-library/react';
import { AnalyticEvents } from './analytic-events';
import { isActiveTimestamp } from '../../../utils/is-active-timestamp/is-active-timestamp';
import cls from './analytic-events.module.scss';

jest.mock('../../../utils/is-active-timestamp/is-active-timestamp', () => ({
  isActiveTimestamp: jest.fn(),
}));
const currentTimestamp = 1500;

describe('AnalyticEvents', () => {
  const timestamps = [
    { timestamp: 1000, duration: 10, zone: { height: 10, top: 10, width: 10, left: 10 } },
    { timestamp: 2000, duration: 10, zone: { height: 20, top: 20, width: 20, left: 20 } },
  ];

  it('should not render any events when all timestamps are inactive', () => {
    (isActiveTimestamp as jest.Mock).mockReturnValue(false);

    const { container } = render(<AnalyticEvents timeStamps={timestamps} currentTimestamp={currentTimestamp} />);

    expect(container.querySelectorAll(`.${cls.analytic_event}`).length).toBe(0);
  });

  it('should render events when at least one timestamp is active', () => {
    (isActiveTimestamp as jest.Mock).mockReturnValue(true);

    const { container } = render(<AnalyticEvents timeStamps={timestamps} currentTimestamp={currentTimestamp} />);

    expect(container.querySelectorAll(`.${cls.analytic_event}`).length).toBe(2); // 2 активных события
  });

  it('should not render any events when timeStamps is null', () => {
    const { container } = render(<AnalyticEvents timeStamps={null} currentTimestamp={currentTimestamp} />);

    expect(container.querySelectorAll(`.${cls.analytic_event}`).length).toBe(0);
  });
});
