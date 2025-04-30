import { Button } from "@mui/material";

const ZakatColumns = [
  {
    field: "no",
    headerName: "No",
    width: 70,
  },
  { field: "muzaki", headerName: "Muzaki", minWidth: 130, flex: 1 },
  { field: "pengurus", headerName: "Pengurus", minWidth: 130, flex: 1 },
  {
    field: "tipe_zakat",
    headerName: "Tipe",
    type: "number",
    minWidth: 90,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 160,
    flex: 2,
  },
  {
    field: "action",
    headerName: "Action",
    description: "Aksi yang bisa dilakukan",
    sortable: false,
    minWidth: 160,
    flex: 2,
    renderCell: (params) => (
      <>
        {params.row.status === "DIAJUKAN" && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => console.log(params.row.remark_id)}
          >
            Edit
          </Button>
        )}
      </>
    ),
  },
];

export default ZakatColumns;
