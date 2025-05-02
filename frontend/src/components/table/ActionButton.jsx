import { Button } from "@mui/material";

const ActionButton = ({ label, color, ...props }) => {
  return (
    <Button variant="contained" color={color} size="small" {...props}>
      {label}
    </Button>
  );
};

export default ActionButton;
