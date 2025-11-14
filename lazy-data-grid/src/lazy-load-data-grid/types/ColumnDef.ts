// Basic helper types
export type Align = "left" | "center" | "right";
export type ColumnType = "string" | "number" | "date" | "boolean" | "custom";
export type SortDirection = "asc" | "desc" | null;
export type Comparator<TValue> = (a: TValue, b: TValue) => number;

// Value getter/formatter types
export type ValueGetter<T, V = any> = (params: {
  row: T;
  rowIndex: number;
  field: string;
}) => V;

export type ValueFormatter<V = any> = (
  value: V,
  params: { row: any; rowIndex: number }
) => string;

// Renderers
export type CellRenderer<T> = (params: {
  value: any;
  row: T;
  rowIndex: number;
  colDef: ColumnDef<T>;
}) => React.ReactNode;

export type HeaderRenderer = (params: {
  colDef: ColumnDef<any>;
}) => React.ReactNode;

// Filter / Edit related
export type FilterOperator<T> = {
  id: string;
  label: string;
  // how to match rows: receives cell value and filter value
  apply: (cellValue: any, filterValue: any, row: T) => boolean;
  // optional input component/render for the operator
  InputComponent?: React.ComponentType<any>;
};

export type EditRenderer<T> = (params: {
  value: any;
  row: T;
  rowIndex: number;
  onChange: (newValue: any) => void;
}) => React.ReactNode;

// Column pinning
export type Pin = "left" | "right" | null;

// Main column def
export interface ColumnDef<T> {
  /** Unique identifier for the column (used for state/visibility/sorting) */
  field: string;

  /** Label shown in header */
  headerName?: string;

  /** explicit fixed width in px; if set, flex is ignored */
  width?: number;

  /** flexible grow factor (like flex in CSS) */
  flex?: number;

  /** minimum and maximum width in px (used during resize/layout) */
  minWidth?: number;
  maxWidth?: number;

  /** alignment for cell contents */
  align?: Align;

  /** custom render for the cell */
  renderCell?: CellRenderer<T>;

  /** custom render for the header */
  renderHeader?: HeaderRenderer;

  /** CSS class or function to apply to cell */
  cellClassName?:
    | string
    | ((params: { row: T; rowIndex: number; value: any }) => string);

  /** CSS class or function to apply to header */
  headerClassName?: string | (() => string);
}
