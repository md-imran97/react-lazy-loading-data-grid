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
      ? colDef.cellClassName({ row, rowIndex, value: rawValue })
      : colDef.cellClassName;

  return (
    <Box
      className={`lazy-grid-cell ${className}`}
      style={{
        flex: colDef.flex ?? undefined,
        width: colDef.width ?? undefined,
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
      {content}
    </Box>
  );
}
