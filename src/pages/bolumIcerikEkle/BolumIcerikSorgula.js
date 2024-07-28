import React, { useRef } from "react";
import CustomPaper from "../../components/CustomPaper";
import { TextField } from "@gib-ui/core";
import Form from "../../components/Form";
import { bolumEkleSchema } from "./shared/BolumEkleFormSchema";
import { bolumSorgula } from "../../api/services/bolumServices/bolumSorgula";

const BolumIcerikSorgula = () => {
  const formRef = useRef(null);
  const pageToken = localStorage.getItem("pageToken")

  const handleBolumSorgula = (data) => {
    bolumSorgula(pageToken,data.bolumAdi);
  
  };

  return (
    <CustomPaper title="Bölüm İçerik Sorgula">
      <Form
        onSubmit={handleBolumSorgula}
        onReset
        ref={formRef}
        schema={bolumEkleSchema}
        submitButtonText="Sorgula"
      >
        <TextField
          id="bolumAdi"
          name="bolumAdi"
          key="bolumAdi"
          labeltext="Bölüm Adı"
          fullWidth
          lg={12}
          md={12}
          xs={12}
          sx={{ marginBottom: 3 }}
        />
      </Form>
    </CustomPaper>
  );
};

export default BolumIcerikSorgula;
