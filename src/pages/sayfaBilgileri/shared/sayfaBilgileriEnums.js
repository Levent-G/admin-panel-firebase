import React from 'react';
import { Menu } from "@gib-ui/core";

export const getColumns = (handleEdit, handleDelete) => [
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
    align: "left",
    minWidth: 200,
    renderCell: (params) => {
      return (
        <>
          <Menu
            buttonText="İŞLEM YAP"
            id="1"
            items={[
              {
                id: "1",
                onClick: () => handleEdit(params.row),
                text: "Düzenle",
              },
              {
                id: "2",
                onClick: () => handleDelete(params.row),
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
