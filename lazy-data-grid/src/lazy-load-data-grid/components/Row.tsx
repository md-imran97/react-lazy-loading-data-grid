import React from "react";

import { Cell } from "./Cell";
import type { ColumnDef } from "../types/ColumnDef";
import { Box } from "@mui/material";

interface RowProps<T> {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
  rowHeight?: number;
  onRowClick?: (row: T) => void;
  getRowClass?: (row: T) => string;
}

export function Row<T>({
  row,
  rowIndex,
  columns,
  rowHeight = 40,
  onRowClick,
  getRowClass,
}: RowProps<T>) {
  const className = getRowClass ? getRowClass(row) : "";

  return (
    <Box className="lazy-grid-row-container">
      <Box
        className={`lazy-grid-row ${className}`}
        onClick={() => onRowClick?.(row)}
        sx={{
          height: rowHeight,
          cursor: onRowClick ? "pointer" : "default",
        }}
      >
        {columns.map((col) => (
          <Cell key={col.field} row={row} rowIndex={rowIndex} colDef={col} />
        ))}
      </Box>
    </Box>
  );
}
