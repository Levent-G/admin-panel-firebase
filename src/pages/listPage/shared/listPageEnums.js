import { Button } from "@mui/material";

export const listPageEnums = ({ handleNavigate, navigate }) => {
  const columns = [
    { headerName: "Başlık", field: "title", flex: 1 },
    { headerName: "Açıklama", field: "description", flex: 2 },
    { headerName: "Link", field: "link", flex: 1 },
    {
      headerName: "İşlemler",
      field: "actions",
      flex: 1.5,
      cellRenderer: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleNavigate(params.data.title)}
            sx={{ fontSize: "10px", mr: 1 }}
          >
            Alan Ekle
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/sayfa/${params.data.title}/icerikler`)}
            sx={{ fontSize: "10px" }}
          >
            Detay
          </Button>
        </>
      ),
    },
  ];
  return columns;
};
