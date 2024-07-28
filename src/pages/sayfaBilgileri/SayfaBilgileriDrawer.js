import React from "react";
import { Alert, TextField } from "@gib-ui/core";
import { Drawer, Typography, Box, Divider } from "@mui/material";
import Form from "../../components/Form";
import { schemaDrawer } from "./shared/sayfaBilgileriDuzenleSchema";
import { sayfaDuzenleService } from "../../api/services/sayfaServices/sayfaDuzenleServices";
import { bolumEkleService } from "../../api/services/bolumServices/bolumEkleService";


const SayfaBilgileriDrawer = ({
  selectedRow,
  drawerOpen,
  setDrawerOpen,
  bolumEkle,
  onComplete,
}) => {
  const schema = schemaDrawer(bolumEkle);
  const pageToken = localStorage.getItem("pageToken");

  const handleSubmit = async (data) => {
    const { sayfaAdi, bolum } = data;

    if (bolumEkle) {
      const bolumData = { ad: bolum };
      await bolumEkleService(pageToken, bolumData);
    } else {
      await sayfaDuzenleService(selectedRow.sayfaId, {
        sayfaName: sayfaAdi,
        bolumler: bolum,
        user: selectedRow.user,
      }, selectedRow.id);
    }
    onComplete();
    setDrawerOpen(false);
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
        Sayfa Bilgileri
      </Typography>
      <Box sx={{ padding: 4 }}>
        <Alert
          alertText="lorem lorem lorem lorem isloremim lorem lorem."
          id="alertWithTitle"
          severity="info"
        />
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          defaultValues={{
            sayfaAdi: selectedRow?.sayfaName || "",
            bolum: selectedRow?.bolumler || [],
          }}
          handleFormCancel={() => setDrawerOpen(false)}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#093640", marginTop: 4 }}
          >
            Sayfa Bilgileri Düzenle
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />
          {!bolumEkle && (
            <TextField
              id="sayfaAdi"
              name="sayfaAdi"
              labeltext="Sayfa Adı"
              fullWidth
              sx={{ marginBottom: 3 }}
            />
          )}
          <TextField
            id="bolum"
            name="bolum"
            labeltext="Bölüm"
            fullWidth
            sx={{ marginBottom: 3 }}
          />
        </Form>
      </Box>
    </Drawer>
  );
};

export default SayfaBilgileriDrawer;
