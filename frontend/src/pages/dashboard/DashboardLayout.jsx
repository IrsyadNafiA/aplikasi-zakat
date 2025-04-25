import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet } from "react-router";
import DashboardAppBar from "../../components/DashboardAppBar";
import DashboardDrawer from "../../components/DashboardDrawer";
import DashboardMain from "../../components/DashboardMain";
import DrawerList from "../../components/DrawerList";

// const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DashboardLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const location = window.location.pathname.split("/")[1].toLocaleUpperCase();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardAppBar
        position="fixed"
        open={open}
        color="background.paper"
        sx={{ boxShadow: "none", borderBottom: "1px solid #d9d9d9" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" fontWeight={600}>
            {location}
          </Typography>
        </Toolbar>
      </DashboardAppBar>
      <DashboardDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ bgcolor: "white" }} />
        <DrawerList />
      </DashboardDrawer>
      <DashboardMain open={open}>
        <DrawerHeader />
        <Outlet />
      </DashboardMain>
    </Box>
  );
};

export default DashboardLayout;
