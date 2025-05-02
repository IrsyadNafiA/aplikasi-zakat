import { Box, Button } from "@mui/material";
import ActionButton from "./ActionButton";

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
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <ActionButton
              label="lihat"
              color="info"
              href={`/zakat/lihat-zakat/${params.row.remark_id}`}
            />
          </Box>
        )}
      </>
    ),
  },
];

export default ZakatColumns;
