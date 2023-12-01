import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { burgerIconStyles, headerStyles } from "./styles";
import DrawerMenu from "../drawer/Drawer";
import Logo from "../../assets/svg/blog-svgrepo-com.svg";
import { routeLocationsEnum } from "../../Router/Router";
import { useAppSelector } from "../../store/store";

const Header = React.memo(() => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const homeNavigation = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);

  const handleToggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const navigateTo = (path: string) => () => {
    homeNavigation(path);
  };

  return (
    <Box sx={headerStyles}>
      <IconButton sx={burgerIconStyles} onClick={handleToggleDrawer}>
        <MenuIcon sx={{ fontSize: "40px", color: "#fff" }} />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          onClick={navigateTo(routeLocationsEnum.home)}
          style={{
            cursor: "pointer",
            width: "96px",
            height: "96px",
          }}
        />
        <Box
          sx={{
            marginRight: "10px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {user && user.email}
        </Box>
      </Box>
      <DrawerMenu
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      />
    </Box>
  );
});

export default Header;
