import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { ComponentType, ReactNode } from 'react';

interface IInfiniteList {
  itemCount: number;
  renderComponents: ComponentType<ListChildComponentProps<ReactNode>>;
  itemSize: number;
  className?: string;
}

export const InfiniteList = (props: IInfiniteList) => {
  const { itemCount, renderComponents, itemSize, className } = props;

  return (
    <AutoSizer className={className}>
      {({ height, width }) => (
        <FixedSizeList height={height} width={width} itemCount={itemCount} itemSize={itemSize}>
          {renderComponents}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
