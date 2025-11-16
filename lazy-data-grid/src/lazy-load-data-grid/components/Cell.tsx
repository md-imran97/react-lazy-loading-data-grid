import React from "react";
import type { ColumnDef } from "../types/ColumnDef";
import { Box } from "@mui/material";
import { DEFAULT_MIN_COL_WIDTH } from "../constant";

interface CellProps<T> {
  row: T;
  rowIndex: number;
  colDef: ColumnDef<T>;
}

export function Cell<T>({ row, rowIndex, colDef }: CellProps<T>) {
  const rawValue = (row as any)[colDef.field];

  const content: React.ReactNode = colDef.renderCell
    ? colDef.renderCell({ value: rawValue, row, rowIndex, colDef })
    : rawValue;

  const className =
    typeof colDef.cellClassName === "function"
      ? colDef.cellClassName(row)
      : colDef.cellClassName;

  return (
    <Box
      className={`lazy-grid-cell ${className}`}
      sx={{
        flex: colDef.flex ?? undefined,
        width: colDef.width ?? colDef.minWidth ?? DEFAULT_MIN_COL_WIDTH,
        minWidth: colDef.minWidth ?? DEFAULT_MIN_COL_WIDTH,
        maxWidth: colDef.maxWidth,
        justifyContent:
          colDef.align === "right"
            ? "flex-end"
            : colDef.align === "center"
            ? "center"
            : "flex-start",
      }}
    >
      <Box className="cell-content">{content}</Box>
    </Box>
  );
}
