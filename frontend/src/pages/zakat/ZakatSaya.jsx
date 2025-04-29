import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ZakatColumns from "../../components/table/ZakatColumns";
import { authAxios } from "../../utils/store/useAuthStore";
import DataTable from "../../components/table/DataTable";

const ZakatSaya = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getRemarkDatas = async () => {
      try {
        const response = await authAxios.get("/zakat/my-remarks");
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
      <Typography variant="h5" mb={2}>
        Zakat Saya
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/zakat/bayar-zakat")}
      >
        Bayar Zakat
      </Button>
      <DataTable
        columns={ZakatColumns}
        rows={tableData}
        getRowId={(row) => row.remark_id}
      />
    </div>
  );
};

export default ZakatSaya;
