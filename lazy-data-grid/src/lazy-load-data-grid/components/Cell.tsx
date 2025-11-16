import React from "react";
import type { ColumnDef } from "../types/ColumnDef";
import { Box } from "@mui/material";

interface CellProps<T> {
  row: T;
  rowIndex: number;
  colDef: ColumnDef<T>;
}

export function Cell<T>({ row, rowIndex, colDef }: CellProps<T>) {
  const rawValue = (row as any)[colDef.field];

  // Apply renderCell if provided
  const content: React.ReactNode = colDef.renderCell
    ? colDef.renderCell({ value: rawValue, row, rowIndex, colDef })
    : rawValue;

  // Determine cell className
  const className =
    typeof colDef.cellClassName === "function"
      ? colDef.cellClassName({ row, rowIndex, value: rawValue })
      : colDef.cellClassName;

  return (
    <Box
      className={className}
      style={{
        flex: colDef.flex ?? undefined,
        width: colDef.width ?? undefined,
        minWidth: colDef.minWidth ?? 50,
        maxWidth: colDef.maxWidth,
        padding: "0 8px",
        display: "flex",
        alignItems: "center",
        justifyContent:
          colDef.align === "right"
            ? "flex-end"
            : colDef.align === "center"
            ? "center"
            : "flex-start",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        borderRight: "1px solid #eee",
        boxSizing: "border-box",
      }}
    >
      {content}
    </Box>
  );
}
