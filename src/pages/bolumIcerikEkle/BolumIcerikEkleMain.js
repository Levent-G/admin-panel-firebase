import React from "react";
import BolumIcerikSorgula from "./BolumIcerikSorgula";
import withCustomLayout from "../../components/hocs/withCustomLayout";
import { Box } from "@mui/material";

const BolumIcerikEkleMain = () => {
  return (
    <Box mt={5}>
      {" "}
      <BolumIcerikSorgula />
    </Box>
  );
};

const title = "Bölüm İçerik Sorgula";

const breadcrumbs = {
  homePage: "Ana sayfa",
  links: [{ label: "Bölüm İçerik Sorgula" }],
};
const alertText =
  "Öncelikle bölüm içerik sorgulayın daha sonra ekleme ve düzenleme işlemlerini yapabilirsiniz.";
export default withCustomLayout(BolumIcerikEkleMain, {
  title,
  titleColor: "#093640",
  breadcrumbs,
  alertText,
});
