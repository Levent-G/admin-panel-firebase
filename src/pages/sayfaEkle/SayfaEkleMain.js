import { Box } from "@mui/material";
import React from "react";
import withCustomLayout from "../../components/hocs/withCustomLayout";
import SayfaEkleForm from "./SayfaEkleForm";

const SayfaEkleMain = () => {
  return (
    <Box mt={5}>
      {" "}
      <SayfaEkleForm />
    </Box>
  );
};

const title = "Sayfa Ekle";

const breadcrumbs = {
  homePage: "Ana sayfa",
  links: [{ label: "Sayfa Panel Ekle" }],
};
const alertText = "Sayfa bilgilerini lütfen doğru ve tam doldurunuz."
export default withCustomLayout(SayfaEkleMain, {
  title,
  titleColor: "#093640",
  breadcrumbs,
  alertText,
});
