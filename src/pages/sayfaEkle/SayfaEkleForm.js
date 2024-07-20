import { Checkbox, TextField, } from "@gib-ui/core";
import React from "react";
import CustomPaper from "../../components/CustomPaper";
import Form from "../../components/Form";


const SayfaEkleForm = () => {
  return (
    <CustomPaper title="Sayfa Ekle" >
      <Form>
        <TextField
          id="sayfaName"
          name="sayfaName"
          key="sayfaName"
          labeltext="Sayfa Adı"
          fullWidth
          lg={12}
          md={12}
          xs={12}
          sx={{ marginBottom: 3 }}
        />
        <Checkbox labeltext="1.bölüm" onChange={function noRefCheck() {}} />
     
      
      </Form>
    </CustomPaper>
  );
};

export default SayfaEkleForm;
