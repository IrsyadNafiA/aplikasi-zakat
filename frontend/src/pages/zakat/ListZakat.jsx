import { Typography } from "@mui/material";
import DataTable from "../../components/table/DataTable";

const columns = [
  { field: "id", headerName: "ID", minWidth: 70 },
  { field: "firstName", headerName: "First name", minWidth: 130, flex: 1 },
  { field: "lastName", headerName: "Last name", minWidth: 130, flex: 1 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    minWidth: 90,
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 160,
    flex: 2,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  // ...
];

const ListZakat = () => {
  return (
    <div>
      <Typography variant="h5">List Zakat</Typography>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
};

export default ListZakat;
