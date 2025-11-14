import { Box, Button } from "@mui/material";
import type { LazyDataGridProps } from "./types/LazyDataGridProps";
import "./style/LazyDataGrid.scss";
import HeaderRow from "./components/HeaderRow";
import { Row } from "./components/Row";
import { rows } from "./dummy-data/dummyRows";
import { useEffect, useRef, useState } from "react";

export function LazyDataGrid<T>(props: LazyDataGridProps<T>) {
  const gridHeaderContainerRef = useRef<HTMLDivElement>(null);
  const gridBodyRootRef = useRef<HTMLDivElement>(null);

  const gridHeaderRootRef = useRef<HTMLDivElement>(null);

  const [verticalScrollBarWidth, setVerticalScrollBarWidth] = useState(0);
  const [headerFullWidth, setHeaderFullWidth] = useState(0);

  const handleScroll = () => {
    const el = gridBodyRootRef.current;
    if (!el) return;
    const top = el.scrollTop;
    const bottom = top + el.clientHeight;
    debugger;
    // setVisible({ top, bottom });
  };
  const scrollToPixel = (px: number) => {
    const el = gridBodyRootRef.current;
    if (!el) return;

    // Jump instantly
    el.scrollTop = px;

    // Or smooth scroll
    // el.scrollTo({ top: px, behavior: "smooth" });
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
        setHeaderFullWidth(gridHeaderContainerRef.current.offsetWidth);
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

  return (
    <>
      <Button
        onClick={() => scrollToPixel(840)}
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
                height="4000000px"
                width="100%"
                className="body-background-panel"
              >
                <Box paddingTop="800px">
                  {rows.map((row: any, index: number) => (
                    <Row
                      key={row.id}
                      row={row}
                      rowIndex={index}
                      columns={props.columns}
                      rowHeight={40}
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
