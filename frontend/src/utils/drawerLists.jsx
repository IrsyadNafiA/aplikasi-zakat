import DashboardIcon from "@mui/icons-material/Dashboard";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const lists = [
  {
    kind: "subHeader",
    title: "Main Menu",
  },
  {
    link: "/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "nestedHeader",
    title: "Zakat",
    icon: <VolunteerActivismIcon />,
    children: [
      {
        link: "/zakat/zakat-saya",
        title: "Zakat Saya",
        icon: <VolunteerActivismIcon />,
      },
      {
        link: "/zakat/list-zakat",
        title: "List Zakat",
        icon: <ListIcon />,
        isAdmin: 1,
      },
    ],
  },
  {
    kind: "subHeader",
    title: "User Menu",
    isAdmin: 1,
  },
  {
    link: "/list-pengguna",
    title: "List Pengguna",
    icon: <AccountCircleIcon />,
    isAdmin: 1,
  },
];

export default lists;
