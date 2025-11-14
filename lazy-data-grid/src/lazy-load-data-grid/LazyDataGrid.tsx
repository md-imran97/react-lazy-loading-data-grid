import { Box } from "@mui/material";
import type { LazyDataGridProps } from "./types/LazyDataGridProps";
import "./style/LazyDataGrid.scss";
import HeaderRow from "./components/HeaderRow";

export function LazyDataGrid<T>(props: LazyDataGridProps<T>) {
  return (
    <>
      <Box className="lazy-data-grid">
        <Box className="lazy-data-grid-root">
          <Box className="lazy-data-grid-header-root">
            <HeaderRow columns={props.columns} />
          </Box>
          <Box className="lazy-data-grid-body-root">
            lazy-data-grid-body-root
          </Box>
          <Box className="lazy-data-grid-horizontal-scroll-root">
            lazy-data-grid-horizontal-scroll-root
          </Box>
          <Box className="lazy-data-grid-footer-root">
            lazy-data-grid-footer-root
          </Box>
        </Box>
      </Box>
    </>
  );
}
