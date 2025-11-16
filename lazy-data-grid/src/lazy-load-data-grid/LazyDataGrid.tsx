import { Box, Button } from "@mui/material";
import type { LazyDataGridProps } from "./types/LazyDataGridProps";
import "./style/LazyDataGrid.scss";
import HeaderRow from "./components/HeaderRow";
import { Row } from "./components/Row";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_CACHED_ROW_SIZE,
  DEFAULT_FOOTER_HEIGHT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_REQUEST_DEBOUNCE_TIME,
  DEFAULT_ROW_HEIGHT,
} from "./constant";
import _ from "lodash";
import type { LazyDataGridApi } from "./types/LazyDataGridApi";

export function GenericLazyDataGrid<T>(
  props: LazyDataGridProps<T>,
  ref: React.Ref<LazyDataGridApi>
) {
  const {
    columns = [],
    dataSource,
    rowHeight = DEFAULT_ROW_HEIGHT,
    headerHeight,
    pageSize = DEFAULT_PAGE_SIZE,
    uniqueDataKey = "id",
    dataRequestDebouceTime = DEFAULT_REQUEST_DEBOUNCE_TIME,
    showFooter = false,
    footerHeight = DEFAULT_FOOTER_HEIGHT,
    additionalRowCacheSize = DEFAULT_CACHED_ROW_SIZE,
    footer,
    getRowClass,
  } = props;

  const [rowsData, setRowsData] = useState<T[]>([]);
  const [totalRowCount, setTotalRowCount] = useState<number>(0);
  const [gridBodyHeight, setGridBodyHeight] = useState<number>(0);
  const [rowsSegmentTopPadding, setRowsSegmentTopPadding] = useState<number>(0);

  const gridHeaderContainerRef = useRef<HTMLDivElement>(null);
  const gridBodyRootRef = useRef<HTMLDivElement>(null);

  const gridHeaderRootRef = useRef<HTMLDivElement>(null);

  const [verticalScrollBarWidth, setVerticalScrollBarWidth] = useState(0);
  const [headerFullWidth, setHeaderFullWidth] = useState(0);

  const gridBodyTopVisiblePosition = useRef<number>(0);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (rowIndex: number) => {
      scrollToPosition(rowIndex * rowHeight);
    },
    reloadData: () => handleScroll(true),
  }));
  const debouncedDisplayRowsData = useMemo(
    () =>
      _.debounce((topVisiblePosition: number) => {
        displayRowsData(topVisiblePosition);
      }, dataRequestDebouceTime),
    []
  );
  const handleScroll = (forceReload = false) => {
    const el = gridBodyRootRef.current;
    if (!el) return;
    const topVisiblePosition = el.scrollTop;
    if (
      forceReload ||
      rowsData.length == 0 ||
      Math.abs(topVisiblePosition - gridBodyTopVisiblePosition.current) >=
        (additionalRowCacheSize / 2) * rowHeight
    ) {
      gridBodyTopVisiblePosition.current = topVisiblePosition;
      debouncedDisplayRowsData(topVisiblePosition);
    }
  };
  const scrollToPosition = (position: number) => {
    const el = gridBodyRootRef.current;
    if (!el) return;
    el.scrollTop = position;
  };

  const getRowsData = async (startIndex: number, endIndex: number) => {
    const data = await dataSource?.getRows(startIndex, endIndex);
    return data;
  };

  const displayRowsData = async (startPosition: number) => {
    const topInvisibleRows = Math.floor(startPosition / rowHeight);
    let startIndex = 0;

    if (topInvisibleRows < additionalRowCacheSize) startIndex = 0;
    else {
      startIndex = topInvisibleRows - additionalRowCacheSize;
    }
    const endIndex = startIndex + pageSize;
    const rowsInfo = await getRowsData(startIndex, endIndex);
    setGridBodyHeight(rowsInfo.totalRowCount * rowHeight);
    if (totalRowCount != rowsInfo?.totalRowCount) {
      setTotalRowCount(rowsInfo?.totalRowCount ?? 0);
    }
    setRowsData(rowsInfo?.rows ?? []);
    setRowsSegmentTopPadding(startIndex * rowHeight);
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (gridBodyRootRef.current) {
        setVerticalScrollBarWidth(
          gridBodyRootRef.current.offsetWidth -
            gridBodyRootRef.current.clientWidth
        );
      }
      if (gridHeaderContainerRef.current) {
        setHeaderFullWidth(gridHeaderContainerRef.current.clientWidth);
      }
    });
    if (gridBodyRootRef.current) {
      observer.observe(gridBodyRootRef.current);
    }
    if (gridHeaderContainerRef.current) {
      observer.observe(gridHeaderContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = gridHeaderRootRef.current;
    const body = gridBodyRootRef.current;

    if (!header || !body) return;

    const scrollSync = () => {
      header.scrollLeft = body.scrollLeft;
    };

    body.addEventListener("scroll", scrollSync);
    return () => {
      body.removeEventListener("scroll", scrollSync);
    };
  }, []);

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <>
      <Box className="lazy-data-grid">
        <Box className="lazy-data-grid-root">
          <Box className="lazy-data-grid-content-root">
            <Box ref={gridHeaderRootRef} className="lazy-data-grid-header-root">
              <Box display="flex">
                <HeaderRow
                  columns={columns}
                  ref={gridHeaderContainerRef}
                  headerHeight={headerHeight}
                />
                <Box
                  component="span"
                  minWidth={`${verticalScrollBarWidth}px`}
                  width={`${verticalScrollBarWidth}px`}
                ></Box>
              </Box>
            </Box>

            <Box
              className="lazy-data-grid-body-root"
              ref={gridBodyRootRef}
              onScroll={() => handleScroll()}
            >
              <Box
                height={`${gridBodyHeight}px`}
                width={rowsData.length ? "100%" : `${headerFullWidth}px`}
                className="body-background-panel"
              >
                <Box paddingTop={`${rowsSegmentTopPadding}px`}>
                  {rowsData.map((row: any, index: number) => (
                    <Row
                      key={row[uniqueDataKey]}
                      row={row}
                      rowIndex={index}
                      columns={columns}
                      rowHeight={rowHeight}
                      onRowClick={(row) => console.log("Clicked", row)}
                      getRowClass={(row) => getRowClass?.(row) ?? ""}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          {showFooter && (
            <Box
              className="lazy-data-grid-footer-root"
              sx={{
                minHeight: `${footerHeight}px`,
                maxHeight: `${footerHeight}px`,
                height: `${footerHeight}px`,
              }}
            >
              {footer}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export const LazyDataGrid = forwardRef(GenericLazyDataGrid) as <T>(
  props: LazyDataGridProps<T> & {
    ref?: React.Ref<LazyDataGridApi>;
  }
) => React.ReactElement;
