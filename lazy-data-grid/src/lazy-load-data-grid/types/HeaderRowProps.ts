import type { ColumnDef } from "./ColumnDef";

export interface HeaderRowProps<T> {
  columns: ColumnDef<T>[];
  /** Height of header row */
  headerHeight?: number;
}
