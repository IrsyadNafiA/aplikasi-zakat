import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const DashboardDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#2E7D32",
  },
}));

export default DashboardDrawer;
