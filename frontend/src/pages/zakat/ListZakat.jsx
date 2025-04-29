import { Typography } from "@mui/material";
import DataTable from "../../components/table/DataTable";
import { useEffect, useState } from "react";
import { authAxios } from "../../utils/store/useAuthStore";
import ZakatColumns from "../../components/table/ZakatColumns";

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
        columns={ZakatColumns}
        rows={tableData}
        getRowId={(row) => row.remark_id}
      />
    </div>
  );
};

export default ListZakat;
