import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import lists from "../utils/drawerLists";

// icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuthStore from "../utils/store/useAuthStore";
import { useNavigate } from "react-router";
import useNotificationStore from "../utils/store/useNotificationStore";

const DrawerList = () => {
  const [openNested, setOpenNested] = useState(null);
  const { logout } = useAuthStore();
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  // Check if path is active
  const isActive = (path) => location.pathname.startsWith(path);

  // Check if any child is active
  const isAnyChildActive = (children) =>
    children.some((child) => isActive(child.link));

  useEffect(() => {
    // Check if any nested header is active the open it
    for (const item of lists) {
      if (
        item.kind === "nestedHeader" &&
        item.children?.some((child) => location.pathname.startsWith(child.link))
      ) {
        setOpenNested(item.title);
        break;
      }
    }
  }, []);

  // Toggle nested header
  const handleToggle = (title) => {
    setOpenNested((prev) => (prev === title ? null : title));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout gagal:", error);
      showNotification("Gagal logout, coba lagi!", "error");
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "primary.main",
        color: "white",
      }}
      component="nav"
    >
      {lists.map((item, idx) => {
        // Handle Subheader
        if (item.kind === "subHeader") {
          return (
            <ListSubheader
              key={`sub-${idx}`}
              component="div"
              sx={{ bgcolor: "primary.main", color: "white" }}
            >
              {item.title}
            </ListSubheader>
          );
        }

        // Handle Nested Header with children
        if (item.kind === "nestedHeader" && item.children?.length) {
          const isOpen = openNested === item.title;
          return (
            <div key={`nested-${idx}`}>
              <ListItemButton
                onClick={() => handleToggle(item.title)}
                selected={isAnyChildActive(item.children)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child, i) => (
                    <ListItemButton
                      selected={isActive(child.link)}
                      key={child.link || i}
                      href={child.link}
                      sx={{
                        pl: 4,
                        "&.Mui-selected": {
                          backgroundColor: "primary.light",
                          color: "white",
                          "& .MuiListItemIcon-root": {
                            color: "white",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "primary.light",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "white" }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              <Divider sx={{ bgcolor: "white" }} />
            </div>
          );
        }

        // Default flat menu item
        return (
          <ListItemButton
            selected={isActive(item.link)}
            key={item.link || idx}
            href={item.link}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        );
      })}
      {/* Fix Menu :: Start*/}
      <Divider sx={{ bgcolor: "white" }} />
      <ListSubheader
        component="div"
        sx={{ bgcolor: "primary.main", color: "white" }}
      >
        User Menu
      </ListSubheader>
      {/* Profil Saya :: Start */}
      <div>
        <ListItemButton
          selected={isActive("/profil-saya")}
          href="/profil-saya"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "primary.light",
              color: "white",
              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profil Saya" />
        </ListItemButton>
      </div>
      {/* Profil Saya :: End */}

      {/* Logout :: Start */}
      <div>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </div>
      {/* Logout :: End */}
      {/* Fix Menu :: End */}
    </List>
  );
};

export default DrawerList;
