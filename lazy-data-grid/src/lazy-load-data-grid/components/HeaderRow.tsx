import { Box } from "@mui/material";
import React, { type JSX } from "react";
import type { HeaderRowProps } from "../types/HeaderRowProps";
import { DEFAULT_MIN_COL_WIDTH, DEFAULT_ROW_HEIGHT } from "../constant";

function GenericHeaderRow<T>(
  { columns, headerHeight = DEFAULT_ROW_HEIGHT }: HeaderRowProps<T>,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <Box ref={ref} className="lazy-header-container" height={headerHeight}>
      {columns.map((col) => {
        const headerContent = col.renderHeader
          ? col.renderHeader({ colDef: col })
          : col.headerName ?? col.field;

        const headerClass =
          typeof col.headerClassName === "function"
            ? col.headerClassName()
            : col.headerClassName;

        return (
          <Box
            key={col.field}
            className={`lazy-header-cell ${headerClass}`}
            sx={{
              flex: col.flex ?? undefined,
              width: col.width ?? col.minWidth ?? DEFAULT_MIN_COL_WIDTH,
              minWidth: col.minWidth ?? DEFAULT_MIN_COL_WIDTH,
              maxWidth: col.maxWidth,

              px: 1,
              justifyContent:
                col.align === "right"
                  ? "flex-end"
                  : col.align === "center"
                  ? "center"
                  : "flex-start",
            }}
          >
            <Box className="lazy-header-cell-content">{headerContent}</Box>
          </Box>
        );
      })}
    </Box>
  );
}

const HeaderRow = React.memo(React.forwardRef(GenericHeaderRow)) as <T>(
  props: HeaderRowProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element;

export default HeaderRow;
