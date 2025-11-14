import type { ColumnDef } from "../types/ColumnDef";

export const dummyColumns: ColumnDef<any>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    minWidth: 200,
    headerClassName: "first-header",
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "age",
    headerName: "Age",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "score",
    headerName: "Score",
    flex: 1,
    minWidth: 100,
  },
];
