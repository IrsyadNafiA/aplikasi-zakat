import { Button, Typography } from "@mui/material";
import capitalizeString from "../../utils/stringFormatter";
import { useParams } from "react-router";

const ActionKeluarga = () => {
  const { type } = useParams();

  return (
    <>
      <Typography variant="h5" mb={2}>
        {capitalizeString(type)} Keluarga
      </Typography>
    </>
  );
};

export default ActionKeluarga;
