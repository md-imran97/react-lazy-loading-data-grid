import type { ColumnDef } from "./ColumnDef";

export interface HeaderRowProps<T> {
  columns: ColumnDef<T>[];
  headerHeight?: number;
}
