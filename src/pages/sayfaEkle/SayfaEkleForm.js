import React, { useRef, useState } from "react";
import { Checkbox, TextField } from "@gib-ui/core";
import CustomPaper from "../../components/CustomPaper";
import Form from "../../components/Form";
import { schema } from "./shared/SayfaEkleFormSchema";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BolumEkleDrawer from "./BolumEkleDrawer";
import { sayfaEkleService } from "../../api/services/sayfaServices/sayfaEkleServices";

const SayfaEkleForm = () => {
  const formRef = useRef(null);
  const [bolumList, setBolumList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFormSubmit = async (data) => {
    const user = "test";
    const newData = { ...data, bolumList: [...bolumList], user };
    try {
      await sayfaEkleService(newData);
      console.log("Form submitted successfully!");
      window.location.reload(); 
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleFormReset = () => {
    setBolumList([]);
  };

  return (
    <CustomPaper title="Sayfa Ekle">
      <Form
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        ref={formRef}
        schema={schema}
      >
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
        <Button
          onClick={() => setDrawerOpen(true)}
          startIcon={<AddIcon />}
          sx={{ color: "#093640" }}
        >
          Bölüm Ekle
        </Button>
        <Box display="flex" flexWrap="wrap" gap={2} sx={{ marginTop: 2 }}>
          {bolumList.map((item) => (
            <Checkbox
              key={item.id}
              name={`bolum_${item.id}`}
              labeltext={item.ad}
              onChange={function noRefCheck() {}}
              lg={4}
              md={4}
              xs={4}
            />
          ))}
        </Box>
      </Form>
      <BolumEkleDrawer
        setBolumList={setBolumList}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </CustomPaper>
  );
};

export default SayfaEkleForm;
