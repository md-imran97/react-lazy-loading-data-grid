import { Box } from "@mui/material";
import type { LazyDataGridProps } from "./types/LazyDataGridProps";
import "./style/LazyDataGrid.scss";
import HeaderRow from "./components/HeaderRow";

export function LazyDataGrid<T>(props: LazyDataGridProps<T>) {
  return (
    <>
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
              className="lazy-data-grid-header-root"
              sx={{ height: "155px", flexShrink: 0 }}
            >
              <HeaderRow columns={props.columns} />
            </Box>

            {/* Body: takes remaining height */}
            <Box className="lazy-data-grid-body-root">
              <Box
                height="2000px"
                width="100%"
                className="body-background-panel"
              >
                <Box paddingTop="400px">row container</Box>
              </Box>
            </Box>

            {/* Bottom scrollbar: fixed height */}
            <Box
              className="lazy-data-grid-horizontal-scroll-root"
              sx={{
                minHeight: "20px",
                flexShrink: 0,
                background: "gray",
              }}
            >
              <Box width="900px"></Box>
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
            }}
          >
            lazy-data-grid-footer-root
          </Box>
        </Box>
      </Box>
    </>
  );
}
