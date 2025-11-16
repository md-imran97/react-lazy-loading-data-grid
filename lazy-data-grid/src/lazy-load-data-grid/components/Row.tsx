import React from "react";

import { Cell } from "./Cell";
import type { ColumnDef } from "../types/ColumnDef";
import { Box } from "@mui/material";

interface RowProps<T> {
  row: T;
  rowIndex: number;
  columns: ColumnDef<T>[];
  rowHeight?: number;
  onRowClick?: (row: T, rowIndex: number) => void;
  getRowClass?: (params: { row: T; rowIndex: number }) => string;
}

export function Row<T>({
  row,
  rowIndex,
  columns,
  rowHeight = 40,
  onRowClick,
  getRowClass,
}: RowProps<T>) {
  const className = getRowClass ? getRowClass({ row, rowIndex }) : "";

  return (
    <Box display="flex">
      <Box
        className={className}
        onClick={() => onRowClick?.(row, rowIndex)}
        style={{
          display: "flex",
          height: rowHeight,
          alignItems: "center",
          borderBottom: "1px solid #eee",
          cursor: onRowClick ? "pointer" : "default",
          userSelect: "none",
          boxSizing: "border-box",
          backgroundColor: "red",
        }}
      >
        {columns.map((col) => (
          <Cell key={col.field} row={row} rowIndex={rowIndex} colDef={col} />
        ))}
      </Box>
    </Box>
  );
}
