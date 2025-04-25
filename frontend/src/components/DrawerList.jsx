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

const DrawerList = () => {
  const [openNested, setOpenNested] = useState(null);

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
    </List>
  );
};

export default DrawerList;
