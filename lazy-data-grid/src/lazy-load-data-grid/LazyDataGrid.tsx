import { Box } from "@mui/material";
import type { LazyDataGridProps } from "./types/LazyDataGridProps";

export function LazyDataGrid<T>(props: LazyDataGridProps<T>) {
  return (
    <>
      <Box className="lazy-data-grid-root">
        <Box className="lazy-data-grid-header-root">
          lazy-data-grid-header-root
        </Box>
        <Box className="lazy-data-grid-body-root">lazy-data-grid-body-root</Box>
        <Box className="lazy-data-grid-horizontal-scroll-root">
          lazy-data-grid-horizontal-scroll-root
        </Box>
        <Box className="lazy-data-grid-footer-root">
          lazy-data-grid-footer-root
        </Box>
      </Box>
    </>
  );
}
