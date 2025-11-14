import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import axios from "axios";

// Example props: you can adapt to your API
export type Item = {
  id: number;
  name: string;
  email?: string;
};

type Props = {
  totalCount?: number; // total rows in server (used to make scrollbar accurate)
  pageSize?: number; // how many rows to fetch per request
  rowHeight?: number; // height of each row in px
  height?: number; // height for the list viewport
  fetchUrl?: string; // optional URL for real API
};

// Default export React component (single-file, ready to drop into a Vite + React app)
export default function VirtualizedLazyTable({
  totalCount = 500,
  pageSize = 50,
  rowHeight = 56,
  height = 600,
  fetchUrl,
}: Props) {
  // pages cache: pageIndex -> array of items
  const [pages, setPages] = useState<Record<number, Item[]>>({});
  const [loadingPages, setLoadingPages] = useState<Record<number, boolean>>({});

  // Helper to compute page index from item index
  const pageForIndex = useCallback(
    (index: number) => Math.floor(index / pageSize),
    [pageSize]
  );

  // Check if an item is loaded
  const isItemLoaded = useCallback(
    (index: number) => {
      const p = pageForIndex(index);
      const page = pages[p];
      if (!page) return false;
      const idxInPage = index - p * pageSize;
      return typeof page[idxInPage] !== "undefined";
    },
    [pages, pageForIndex, pageSize]
  );

  // Fetch a page from API (or simulated)
  const fetchPage = useCallback(
    async (pageIndex: number) => {
      if (loadingPages[pageIndex]) return; // already loading
      setLoadingPages((s) => ({ ...s, [pageIndex]: true }));
      try {
        // If you have a real API, call it here. Example:
        // const res = await axios.get(`${fetchUrl}?page=${pageIndex}&size=${pageSize}`);
        // const items: Item[] = res.data.items;

        // --- Simulated delay + data for demo ---
        await new Promise((r) => setTimeout(r, 300));
        const items: Item[] = Array.from({ length: pageSize })
          .map((_, i) => {
            const id = pageIndex * pageSize + i;
            return {
              id,
              name: `User ${id + 1}`,
              email: `user${id + 1}@example.com`,
            };
          })
          .filter((_, i) => pageIndex * pageSize + i < totalCount);
        // ---------------------------------------

        setPages((s) => ({ ...s, [pageIndex]: items }));
      } catch (err) {
        console.error("Failed to fetch page", pageIndex, err);
      } finally {
        setLoadingPages((s) => {
          const copy = { ...s };
          delete copy[pageIndex];
          return copy;
        });
      }
    },
    [fetchUrl, pageSize, loadingPages, totalCount]
  );

  // loadMoreItems callback for InfiniteLoader
  const loadMoreItems = useCallback(
    (startIndex: number, stopIndex: number) => {
      const startPage = pageForIndex(startIndex);
      const endPage = pageForIndex(stopIndex);
      const promises: Promise<any>[] = [];
      for (let p = startPage; p <= endPage; p++) {
        if (!pages[p]) promises.push(fetchPage(p));
      }
      return Promise.all(promises);
    },
    [fetchPage, pageForIndex, pages]
  );

  // itemCount must be the full count (so scrollbar size is accurate)
  const itemCount = totalCount;

  // Render a row (shows placeholder if not loaded)
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const loaded = isItemLoaded(index);
    if (!loaded) {
      return (
        <div style={style} className="flex items-center px-4 border-b">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
      );
    }
    const p = pageForIndex(index);
    const item = pages[p]![index - p * pageSize];
    return (
      <div style={style} className="flex items-center px-4 border-b">
        <div className="w-12">{item.id + 1}</div>
        <div className="flex-1">{item.name}</div>
        <div className="w-64 text-sm text-gray-600">{item.email}</div>
      </div>
    );
  };

  // Optionally prefetch first page on mount
  useEffect(() => {
    if (!pages[0]) fetchPage(0);
  }, [fetchPage, pages]);

  // Overscan to make scroll smoother
  const overscanCount = 5;

  return (
    <div className="w-full border rounded shadow-sm">
      <div className="px-4 py-2 font-medium">
        Users (virtualized lazy table)
      </div>
      <div style={{ height }}>
        <AutoSizer>
          {({ width, height: autoHeight }) => (
            <InfiniteLoader
              isItemLoaded={(index) => isItemLoaded(index)}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={autoHeight}
                  itemCount={itemCount}
                  itemSize={rowHeight}
                  width={width}
                  onItemsRendered={(props: ListOnItemsRenderedProps) => {
                    onItemsRendered({
                      visibleStartIndex: props.visibleStartIndex,
                      visibleStopIndex: props.visibleStopIndex,
                      overscanStartIndex: props.overscanStartIndex,
                      overscanStopIndex: props.overscanStopIndex,
                    } as any);
                  }}
                  ref={ref as any}
                  overscanCount={overscanCount}
                >
                  {Row}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

// Usage notes (local):
// npm install react-window react-window-infinite-loader react-virtualized-auto-sizer axios
// The key trick: pass the *totalCount* to the list so the scrollbar size is accurate even if you only fetch pages.
