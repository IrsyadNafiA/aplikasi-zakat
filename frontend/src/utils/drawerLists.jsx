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
        isAdmin: true,
      },
    ],
  },
  {
    kind: "subHeader",
    title: "User Menu",
  },
  {
    link: "/profil-saya",
    title: "Profil Saya",
    icon: <AccountCircleIcon />,
  },
  {
    link: "/auth/logout",
    title: "Log Out",
    icon: <LogoutIcon />,
  },
];

export default lists;
