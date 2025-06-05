import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Sayfa Ekle",
      description: "Yeni bir içerik sayfası oluşturun ve yönetmeye başlayın.",
      link: "/sayfa-olustur",
    },
    {
      title: "Sayfa Alanlarım",
      description:
        "Oluşturduğunuz sayfalara özel alanları tanımlayın ve içerikleri yönetin.",
      link: "/sayfalarim",
    },
    {
      title: "Kullanıcılar",
      description:
        "Kullanıcı hesaplarını görüntüleyin, düzenleyin veya yeni kullanıcı ekleyin.",
      link: "/kullanicilar",
    }
  ];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Hoş Geldiniz!
      </Typography>
      <Typography variant="body1" mb={3}>
        Admin paneline giriş yaptınız. Burada sistem ayarlarını ve kullanıcı
        yönetimini yapabilirsiniz.
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(card.link)}
                  variant="contained"
                >
                  Git
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashBoard;
