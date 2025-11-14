import { Box } from "@mui/material";
import type { HeaderRowProps } from "../types/HeaderRowProps";
import { DEFAULT_MIN_COL_WIDTH, DEFAULT_ROW_HEIGHT } from "../constant";
import React, { type JSX } from "react";

function GenericHeaderRow<T>({
  columns,
  headerHeight = DEFAULT_ROW_HEIGHT,
}: HeaderRowProps<T>) {
  return (
    <Box className="header-container" height={headerHeight}>
      {columns.map((col) => {
        const headerContent = col.renderHeader
          ? col.renderHeader({ colDef: col })
          : col.headerName ?? col.field;

        return (
          <Box
            className={`header-cell ${col.headerClassName}`}
            key={col.field}
            sx={{
              flex: col.flex ?? undefined,
              width: col.width ?? undefined,
              minWidth: col.minWidth ?? DEFAULT_MIN_COL_WIDTH,
              maxWidth: col.maxWidth,
              justifyContent:
                col.align === "right"
                  ? "flex-end"
                  : col.align === "center"
                  ? "center"
                  : "flex-start",
            }}
          >
            <span>{headerContent}</span>
          </Box>
        );
      })}
    </Box>
  );
}
const HeaderRow = React.memo(GenericHeaderRow) as <T>(
  props: HeaderRowProps<T>
) => JSX.Element;

export default HeaderRow;
