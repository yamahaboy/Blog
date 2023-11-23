import React from "react";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { routeLocationsEnum } from "../../Router/Router";
import Logo from "../../assets/svg/blog-svgrepo-com.svg";
import { drawerStyles, imgStyles, listItemStyles } from "./styles";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerMenu: React.FC<DrawerProps> = (props) => {
  const { isOpen, onClose } = props;
  const pageNavigation = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    onClose();
    pageNavigation(path);
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Box sx={drawerStyles}>
        <Box sx={imgStyles}>
          <img
            src={Logo}
            style={{ cursor: "pointer", width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
      <List sx={{ width: "250px", marginTop: "1rem" }}>
        <ListItem
          onClick={() => navigateTo(routeLocationsEnum.home)}
          sx={listItemStyles}
        >
          <EmailIcon />
          <ListItemText primary="Posts" />
        </ListItem>
        {location.pathname.startsWith(routeLocationsEnum.post) && (
          <ListItem
            onClick={() => navigateTo(routeLocationsEnum.post)}
            sx={listItemStyles}
          >
            <CreditCardIcon />
            <ListItemText primary="Card" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
