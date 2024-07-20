import React from "react";
import { TextField, Alert, Divider } from "@gib-ui/core";
import { Drawer, Typography, Box } from "@mui/material";
import Form from "../../components/Form";
import { schemaDrawer } from "./shared/SayfaEkleFormSchema";

const BolumEkleDrawer = ({ setBolumList, drawerOpen, setDrawerOpen }) => {
  const addBolum = (data) => {
    const { bolumAdi } = data;
    setBolumList((prevList) => {
      const newBolum = {
        id: prevList.length ? Math.max(...prevList.map((b) => b.id)) + 1 : 1,
        ad: bolumAdi,
      };
      const updatedList = [...prevList, newBolum];
      return updatedList;
    });
    setDrawerOpen(false); // Close drawer
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "white",
          width: "100%",
          backgroundColor: "#093640",
          padding: 5,
        }}
      >
        Sayfa Ekle
      </Typography>
      <Box sx={{ padding: 4 }}>
        <Alert
          alertText="Sayfanızdaki bölümleri tek tek isim olarak giriniz."
          id="alertWithTitle"
          severity={"info"}
        />
        <Form
          onSubmit={addBolum}
          onReset
          schema={schemaDrawer}
          handleFormCancel={() => setDrawerOpen(false)}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#093640",
              width: "100%",
              marginTop:4,
              
            }}
          >
            Sayfa Ekle
          </Typography>
          <Divider sx={{marginBottom:3}} />
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
      </Box>
    </Drawer>
  );
};

export default BolumEkleDrawer;
