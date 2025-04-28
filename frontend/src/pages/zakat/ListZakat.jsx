import { Typography } from "@mui/material";
import DataTable from "../../components/table/DataTable";
import { useEffect, useState } from "react";
import { authAxios } from "../../utils/store/useAuthStore";

const columns = [
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
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 160,
    flex: 2,
  },
];

const ListZakat = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getRemarkDatas = async () => {
      try {
        const response = await authAxios.get("/zakat/remarks");
        const indexingData = response.data.payload.map((datas, index) => ({
          no: index + 1,
          ...datas,
        }));
        setTableData(indexingData);
      } catch (error) {
        console.error(
          "Gagal fetch remark data:",
          error.response?.data?.message || error.message
        );
      }
    };

    getRemarkDatas();
  }, []);

  return (
    <div>
      <Typography variant="h5">List Zakat</Typography>
      <DataTable
        columns={columns}
        rows={tableData}
        getRowId={(row) => row.remark_id}
      />
    </div>
  );
};

export default ListZakat;
