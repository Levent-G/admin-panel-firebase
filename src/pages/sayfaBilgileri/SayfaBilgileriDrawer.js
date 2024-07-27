import React from "react";
import { Alert, TextField } from "@gib-ui/core";
import { Drawer, Typography, Box, Divider } from "@mui/material";
import Form from "../../components/Form";
import { schemaDrawer } from "./shared/sayfaBilgileriDuzenleSchema";
import { sayfaDuzenleService } from "../../api/services/sayfaServices/sayfaDuzenleServices"; // updatePageService'i import et
import { bolumEkleService } from "../../api/services/bolumServices/bolumEkleService";

const SayfaBilgileriDrawer = ({
  selectedRow,
  drawerOpen,
  setDrawerOpen,
  bolumEkle,
}) => {
  const schema = schemaDrawer(bolumEkle);

  const handleSubmit = async (data) => {
    const { sayfaAdi, bolum } = data;

    if (bolumEkle) {
      const bolumData = {
        ad: data.bolum,
      };
      await bolumEkleService(selectedRow.sayfaId, bolumData);
    } else {
      await sayfaDuzenleService(
        selectedRow.sayfaId,
        { sayfaName: sayfaAdi, bolumler: bolum, user: selectedRow.user },
        selectedRow.id
      );
    }

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
          severity={"info"}
        />
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          onReset
          defaultValues={{
            sayfaAdi: selectedRow?.sayfaName || "",
            bolum: selectedRow?.bolumler || [],
          }}
          handleFormCancel={() => setDrawerOpen(false)}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#093640",
              width: "100%",
              marginTop: 4,
            }}
          >
            Sayfa Bilgileri Düzenle
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />
          {!bolumEkle && (
            <TextField
              id="sayfaAdi"
              name="sayfaAdi"
              key="sayfaAdi"
              labeltext="Sayfa Adı"
              fullWidth
              lg={12}
              md={12}
              xs={12}
              sx={{ marginBottom: 3 }}
            />
          )}

          <TextField
            id="bolum"
            name="bolum"
            key="bolum"
            labeltext="Bölüm"
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

export default SayfaBilgileriDrawer;
