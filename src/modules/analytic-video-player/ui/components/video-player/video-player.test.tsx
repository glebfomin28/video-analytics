import { render, screen, fireEvent } from '@testing-library/react';
import { VideoPlayer } from './video-player';
import { useVideoPlayerControl } from '../../../model/hooks/use-video-player-control/use-video-player-control';

jest.mock('../../../model/hooks/use-video-player-control/use-video-player-control', () => ({
  useVideoPlayerControl: jest.fn(),
}));

describe('modules/analytic-video-player/ui/video-player', () => {
  const updateTimestamp = jest.fn();
  const mockHandleVideoClick = jest.fn();

  beforeEach(() => {
    (useVideoPlayerControl as jest.Mock).mockReturnValue({
      handleVideoClick: mockHandleVideoClick,
    });
  });

  it('should render video element and analyticEventsRender', () => {
    render(
      <VideoPlayer
        analyticEventsRender={<div data-testid="analytic-events">Analytic Events</div>}
        updateTimestamp={updateTimestamp}
      />,
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('analytic-events')).toBeInTheDocument();
  });

  it('should call handleVideoClick when clicking on the video player container', () => {
    render(<VideoPlayer analyticEventsRender={<div>Analytic Events</div>} updateTimestamp={updateTimestamp} />);

    fireEvent.click(screen.getByTestId('video').parentElement!); // Click on the container
    expect(mockHandleVideoClick).toHaveBeenCalled();
  });

  it('should not call handleVideoClick when clicking directly on the video', () => {
    render(<VideoPlayer analyticEventsRender={<div>Analytic Events</div>} updateTimestamp={updateTimestamp} />);

    fireEvent.click(screen.getByTestId('video')); // Click directly on the video
    expect(mockHandleVideoClick).not.toHaveBeenCalled();
  });
});
