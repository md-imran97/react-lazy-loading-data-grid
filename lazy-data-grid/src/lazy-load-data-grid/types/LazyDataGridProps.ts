import type { ColumnDef } from "./ColumnDef";

export interface LazyDataGridProps<T> {
  uniqueDataKey: string;
  dataRequestDebouceTime?: number;
  showFooter?: boolean;
  footerHeight?: number;
  footer?: React.ReactNode;
  additionalRowCacheSize?: number;
  columns: ColumnDef<T>[];
  onRowClick?: (row: T, rowIndex: number) => void;
  rowHeight?: number;
  headerHeight?: number;
  getRowClass?: (params: { row: T; rowIndex: number }) => string;
  pageSize?: number;

  dataSource: {
    getRows: (
      startIndex: number,
      endIndex: number
    ) => Promise<{
      rows: T[];
      totalRowCount: number;
    }>;
  };
}
