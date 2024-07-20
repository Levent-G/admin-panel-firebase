import { SideMenu } from "@gib-ui/core";
import React from "react";
import { menuItems } from "../shared/enums/SideMenuEnums";
import { Box } from "@mui/material";

const SideMenuComp = () => {
  return (
    <Box>
      <SideMenu
        initiallySmallMenu
        menuItems={menuItems}
        menuSearch
        onAction={function noRefCheck() {}}
        onItemClick={function noRefCheck() {}}
      />
    </Box>
  );
};

export default SideMenuComp;
