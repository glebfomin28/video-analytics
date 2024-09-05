import { render, screen } from '@testing-library/react';
import { ListChildComponentProps } from 'react-window';
import { CSSProperties } from 'react';
import { InfiniteList } from './infinite-list';

jest.mock('react-virtualized-auto-sizer', () => ({
  __esModule: true,
  default: ({ children }: { children: (args: { height: number; width: number }) => JSX.Element }) => (
    <div>{children({ height: 300, width: 300 })}</div>
  ),
}));

jest.mock('react-window', () => ({
  __esModule: true,
  FixedSizeList: ({
    children,
    itemCount,
    itemSize,
  }: {
    children: (args: { index: number; style: CSSProperties }) => JSX.Element;
    itemCount: number;
    itemSize: number;
  }) => (
    <div data-testid="fixed-size-list" data-item-count={itemCount} data-item-size={itemSize}>
      {children({ index: 0, style: {} })}
    </div>
  ),
}));

describe('shared/ui/infinite-list', () => {
  const mockRenderComponent = ({ index, style }: ListChildComponentProps) => (
    <div data-testid={`item-${index}`} style={style}>
      Item {index}
    </div>
  );

  it('renders AutoSizer and FixedSizeList correctly', () => {
    render(<InfiniteList itemCount={10} renderComponents={mockRenderComponent} itemSize={50} className="test-class" />);

    // Проверяем, что FixedSizeList и элемент с item-0 рендерятся
    expect(screen.getByTestId('fixed-size-list')).toBeInTheDocument();
    expect(screen.getByTestId('item-0')).toBeInTheDocument();
  });

  it('passes correct props to FixedSizeList', () => {
    const { container } = render(
      <InfiniteList itemCount={5} renderComponents={mockRenderComponent} itemSize={40} className="test-class" />,
    );

    // Проверяем атрибуты на FixedSizeList
    const fixedSizeList = container.querySelector('[data-testid="fixed-size-list"]');
    expect(fixedSizeList).toHaveAttribute('data-item-count', '5');
    expect(fixedSizeList).toHaveAttribute('data-item-size', '40');
  });
});
