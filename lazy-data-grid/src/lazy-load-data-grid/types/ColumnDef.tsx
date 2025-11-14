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
export interface ColumnDef<T, TValue = any> {
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

  /** column data type (helps with default sort/format) */
  type?: ColumnType;

  /** whether the column is sortable */
  sortable?: boolean;

  /** custom comparator used for sorting */
  sortComparator?: Comparator<TValue>;

  /** whether the column is filterable */
  filterable?: boolean;

  /** available filter operators for this column */
  filterOperators?: Array<FilterOperator<T>>;

  /** whether the column is editable */
  editable?: boolean;

  /** custom cell edit renderer (e.g. input, select) */
  editRenderer?: EditRenderer<T>;

  /** function to compute the value for the cell from the row */
  valueGetter?: ValueGetter<T, TValue>;

  /** function to present formatted string for display (and CSV export) */
  valueFormatter?: ValueFormatter<TValue>;

  /** custom render for the cell */
  renderCell?: CellRenderer<T>;

  /** custom render for the header */
  renderHeader?: HeaderRenderer;

  /** whether the column is resizable by the user */
  resizable?: boolean;

  /** whether the column is hidden */
  hide?: boolean;

  /** whether the column is pinnable/frozen (left or right) */
  pinned?: Pin;

  /** CSS class or function to apply to cell */
  cellClassName?:
    | string
    | ((params: { row: T; rowIndex: number; value: any }) => string);

  /** CSS class or function to apply to header */
  headerClassName?: string | (() => string);

  /** whether to allow row grouping by this column */
  groupable?: boolean;

  /** aggregation reducer name or function when grouped (sum, avg, custom) */
  aggregator?: string | ((values: TValue[], rows: T[]) => any);

  /** optional description or tooltip text for header */
  description?: string;

  /** meta — arbitrary metadata consumers can use (e.g. permission info) */
  meta?: Record<string, any>;
}
