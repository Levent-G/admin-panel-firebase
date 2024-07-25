import React from "react";
import withCustomLayout from "../../components/hocs/withCustomLayout";
import SayfaBilgileriList from "./SayfaBilgileriList";
import { Box } from "@mui/material";

const SayfaBilgileriMain = () => {
  return (
    <Box mt={5} >
      {" "}
      <SayfaBilgileriList />
    </Box>
  );
};

const title = "Bağlı Olan Sayfa Bilgileri";

const breadcrumbs = {
  homePage: "Ana sayfa",
  links: [{ label: "Sayfa Bilgileri" }],
};
const alertText =
  "Sayfa bilgilerini aşağıdaki listeden düzenleyip görebilirsiniz.";
export default withCustomLayout(SayfaBilgileriMain, {
  title,
  titleColor: "#093640",
  breadcrumbs,
  alertText,
});
