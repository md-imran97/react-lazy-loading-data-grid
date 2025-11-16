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
import { DEFAULT_ROW_HEIGHT } from "./constant";
import _ from "lodash";
import type { LazyDataGridApi } from "./types/LazyDataGridApi";

const DEFAULT_CACHED_ROW_BUFFER = 20;

export function GenericLazyDataGrid<T>(
  props: LazyDataGridProps<T>,
  ref: React.Ref<LazyDataGridApi>
) {
  const {
    dataSource,
    rowHeight = DEFAULT_ROW_HEIGHT,
    headerHeight,
    pageSize = 0,
    uniqueDataKey = "id",
  } = props;

  const [rowsData, setRowsData] = useState<T[]>([]);
  const [totalRowCount, setTotalRowCount] = useState<number>(0);
  const [gridBodyHeight, setGridBodyHeight] = useState<number>(0);
  const [rowsSegmentTopPadding, setRowsSegmentTopPadding] = useState<number>(0);

  const gridHeaderContainerRef = useRef<HTMLDivElement>(null);
  const gridBodyRootRef = useRef<HTMLDivElement>(null);

  const gridHeaderRootRef = useRef<HTMLDivElement>(null);

  const [verticalScrollBarWidth, setVerticalScrollBarWidth] = useState(0);
  // const [headerFullWidth, setHeaderFullWidth] = useState(0);

  const gridBodyTopVisiblePosition = useRef<number>(0);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (rowIndex: number) => {
      scrollToPixel(rowIndex * rowHeight);
    },
    reloadData: () => handleScroll(true),
  }));
  const debouncedDisplayRowsData = useMemo(
    () =>
      _.debounce((topVisiblePosition: number) => {
        displayRowsData(topVisiblePosition);
      }, 100),
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
        DEFAULT_CACHED_ROW_BUFFER * rowHeight
    ) {
      gridBodyTopVisiblePosition.current = topVisiblePosition;
      debouncedDisplayRowsData(topVisiblePosition);
      // displayRowsData(topVisiblePosition);
    }
  };
  const scrollToPixel = (px: number) => {
    const el = gridBodyRootRef.current;
    if (!el) return;
    el.scrollTop = px;
  };

  const getRowsData = async (startIndex: number, endIndex: number) => {
    const data = await dataSource?.getRows(startIndex, endIndex);
    return data;
  };

  const displayRowsData = async (startPosition: number) => {
    const topInvisibleRows = Math.floor(startPosition / rowHeight);
    let startIndex = 0;

    if (topInvisibleRows < 40) startIndex = 0;
    else {
      startIndex = topInvisibleRows - 40;
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
      // if (gridHeaderContainerRef.current) {
      //   // setHeaderFullWidth(gridHeaderContainerRef.current.offsetWidth);
      // }
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
      <Button
        onClick={() => {
          setRowsData((prev) => {
            return prev.map((row) => {
              return { ...row, name: "imran" };
            });
          });
          // scrollToPixel(500 * 40)
        }}
        variant="contained"
        sx={{ mb: 2 }}
      >
        gsdfg
      </Button>
      <Box className="lazy-data-grid">
        <Box
          className="lazy-data-grid-root"
          sx={{
            height: "100%", // parent takes full height
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box className="lazy-data-grid-content-root">
            {/* Header: fixed height */}
            <Box
              ref={gridHeaderRootRef}
              className="lazy-data-grid-header-root"
              // sx={{ height: "57px", flexShrink: 0 }}
            >
              <Box sx={{ display: "flex" }}>
                <HeaderRow
                  columns={props.columns}
                  ref={gridHeaderContainerRef}
                />
                <Box
                  component="span"
                  minWidth={`${verticalScrollBarWidth}px`}
                  width={`${verticalScrollBarWidth}px`}
                  // maxWidth={`${verticalScrollBarWidth}px`}
                  sx={{ backgroundColor: "yellow" }}
                ></Box>
              </Box>
            </Box>

            {/* Body: takes remaining height */}
            <Box
              className="lazy-data-grid-body-root"
              ref={gridBodyRootRef}
              onScroll={handleScroll}
            >
              <Box
                height={`${gridBodyHeight}px`}
                width="100%"
                className="body-background-panel"
              >
                <Box paddingTop={`${rowsSegmentTopPadding}px`}>
                  {rowsData.map((row: any, index: number) => (
                    <Row
                      key={row[uniqueDataKey]}
                      row={row}
                      rowIndex={index}
                      columns={props.columns}
                      rowHeight={rowHeight}
                      onRowClick={(row, index) =>
                        console.log("Clicked", row, index)
                      }
                      getRowClass={(row) =>
                        row.row?.id % 2 == 0 ? "even" : "odd"
                      }
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            className="lazy-data-grid-footer-root"
            sx={{
              height: "80px", // fixed height
              background: "lightgreen",
              display: "flex",
              flex: 1,
              minHeight: "50px",
              maxHeight: "80px",
            }}
          >
            lazy-data-grid-footer-root
          </Box>
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
