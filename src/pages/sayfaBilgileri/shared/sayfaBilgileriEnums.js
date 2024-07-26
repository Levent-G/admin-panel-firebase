import { Menu } from "@gib-ui/core";

export const columns = [
  {
    align: "center",
    field: "id",
    headerAlign: "center",
    headerName: "ID",
    width: 100,
  },
  {
    align: "center",
    editable: true,
    field: "sayfaName",
    headerAlign: "center",
    headerName: "Sayfa Adı",
    width: 150,
  },
  {
    align: "center",
    editable: true,
    field: "bolumler",
    headerAlign: "center",
    headerName: "Bölümler",
    width: 150,
  },
  {
    align: "center",
    editable: true,
    field: "user",
    headerAlign: "center",
    headerName: "Sayfa Sahibi",
    width: 150,
  },
  {
    field: "action",
    headerName: "",
    align: "center",
    minWidth: 230,
    headerAlign: "center",
    flex: 1,
    sortable: false,


    renderCell: () => {
      return (
        <>
          <Menu
            buttonText="İŞLEM YAP"
            id="1"
            items={[
              {
                id: "1",
                onClick: () => {
                  console.log("Düzenle işlem yap");
                },
                text: "Düzenle",
              },
              {
                id: "2",
                onClick: () => {
                  console.log("Sil işlem yap");
                },
                text: "Sil",
              },
            ]}
            buttonSx={{
              height: "4vh",
              borderRadius: "none",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            iconSx={{ padding: "0 0.5rem", alignItems: "center" }}
            menuSx={{ width: "150px" }}
            width="150px"
            disableScrollLock
          />
        </>
      );
    },
  },
];
