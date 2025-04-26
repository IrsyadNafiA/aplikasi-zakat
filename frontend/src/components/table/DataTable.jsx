import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

const DataTable = ({
  columns,
  rows,
  paginationModel = { page: 0, pageSize: 5 },
  height = 500,
  minWidth = 600,
  showToolbar = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", overflowX: isMobile ? "auto" : "unset", mt: 2 }}>
      <Paper sx={{ width: "100%", minWidth: minWidth, height: height }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          checkboxSelection
          sx={{
            border: 0,
            ".MuiDataGrid-virtualScroller": {
              overflowX: isMobile ? "auto" : "hidden",
            },
          }}
          slots={{
            toolbar: showToolbar ? undefined : null,
          }}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
