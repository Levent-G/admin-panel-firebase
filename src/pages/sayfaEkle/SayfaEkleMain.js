import { Box } from "@mui/material";
import React from "react";
import withCustomLayout from "../../components/hocs/withCustomLayout";

const SayfaEkleMain = () => {
  return (
    <Box ml={5} mt={5}>
      Sayfa Panel Ekle
    </Box>
  );
};

const title = "Sayfa Ekle";

const breadcrumbs = {
  homePage: "Ana sayfa",
  links: [
    { label: "Sayfa Panel Ekle" },
    
  ],
};

export default withCustomLayout(SayfaEkleMain, {
  title,
  titleColor: "#093640",
  breadcrumbs,
});
