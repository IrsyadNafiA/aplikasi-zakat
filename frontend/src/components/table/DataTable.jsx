import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

const DataTable = ({
  columns,
  rows,
  getRowId,
  paginationModel = { page: 0, pageSize: 5 },
  height = 500,
  minWidth = 600,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", overflowX: isMobile ? "auto" : "unset", mt: 2 }}>
      <Paper sx={{ width: "100%", minWidth: minWidth, height: height }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            ".MuiDataGrid-virtualScroller": {
              overflowX: isMobile ? "auto" : "hidden",
            },
          }}
          showToolbar
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
