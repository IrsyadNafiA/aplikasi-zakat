import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const DataKeluarga = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5" mb={2}>
        Data Keluarga
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/data-keluarga/tambah")}
      >
        Tambah Keluarga
      </Button>
    </>
  );
};

export default DataKeluarga;
