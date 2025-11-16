export type Align = "left" | "center" | "right";

export type CellRenderer<T> = (params: {
  value: any;
  row: T;
  rowIndex: number;
  colDef: ColumnDef<T>;
}) => React.ReactNode;

export type HeaderRenderer = (params: {
  colDef: ColumnDef<any>;
}) => React.ReactNode;

export interface ColumnDef<T> {
  field: string;
  headerName?: string;
  width?: number;
  flex?: number;
  minWidth?: number;
  maxWidth?: number;
  align?: Align;
  renderCell?: CellRenderer<T>;
  renderHeader?: HeaderRenderer;
  headerClassName?: string | (() => string);
  cellClassName?: string | ((row: T) => string);
}
