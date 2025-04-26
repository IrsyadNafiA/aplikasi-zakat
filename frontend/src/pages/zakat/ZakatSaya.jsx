import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const ZakatSaya = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default ZakatSaya;
