import { SideMenu } from "@gib-ui/core";
import React from "react";
import { menuItems } from "../shared/enums/SideMenuEnums";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideMenuComp = () => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.link) {
      navigate(item.link);
    }
  };
  return (
    <Box>
      <SideMenu
        initiallySmallMenu
        menuItems={menuItems}
        menuSearch
        onAction={function noRefCheck() {}}
        onItemClick={handleItemClick}
      />
    </Box>
  );
};

export default SideMenuComp;
