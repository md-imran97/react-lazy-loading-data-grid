import type { ColumnDef } from "./ColumnDef";

export interface LazyDataGridProps<T> {
  /** Full dataset for client-side mode */
  rows?: T[];

  /** Column definitions */
  columns: ColumnDef<T>[];

  /** Initial sort configuration */
  initialSort?: { field: string; direction: "asc" | "desc" };

  /** Row uniquely identifies a row (default: row.id) */
  getRowId?: (row: T) => string | number;

  /** Grid height (px or %) */
  height?: number | string;

  /** Grid width (px or %) */
  width?: number | string;

  /** Row click callback */
  onRowClick?: (row: T, rowIndex: number) => void;

  /**
   * Height of each data row (default: 40px)
   * Used by virtualization/lazy loading
   */
  rowHeight?: number;

  /**
   * Function to return a CSS class for each row.
   * Similar to MUI's getRowClassName
   */
  getRowClass?: (params: { row: T; rowIndex: number }) => string;

  /**
   * Lazy loading data source
   * Similar to MUI's DataGridPro dataSource
   */
  dataSource?: {
    /**
     * Fetch rows from server.
     * Receives the requested row range.
     */
    getRows: (params: {
      startIndex: number;
      endIndex: number;
      sortModel?: { field: string; direction: "asc" | "desc" } | null;
    }) => Promise<{
      rows: T[];
      totalRowCount: number;
    }>;

    /** Initial row count (if unknown, can be undefined) */
    rowCount?: number;

    /**
     * Whether to cache fetched chunks
     * (true = less network load, false = always refetch)
     */
    enableCache?: boolean;
  };
}
