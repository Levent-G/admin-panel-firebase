import Page from "../components/page/Page";
import CustomDataGrid from "../components/dataGrid/CustomDataGrid";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ListPage = () => {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const breadcrumbLinks = [{ label: "Sayfalarım" }];

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "pages"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRows(data);
    };
    fetchData();
  }, []);

  const handleNavigate = useCallback(
    (link) => {
      navigate(`/sayfa/${link}`);
    },
    [navigate]
  );

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
            onClick={() =>
              navigate(`/sayfa/${params.data.title}/icerikler`)
            }
            sx={{ fontSize: "10px" }}
          >
            Detay
          </Button>
        </>
      ),
    },
  ];
  

  return (
    <Page
      title="SAYFALARIM"
      info="Bu sayfada sistemdeki tüm sayfalarınızı görebilirsiniz."
      breadcrumbLinks={breadcrumbLinks}
    >
        <CustomDataGrid rows={rows} columns={columns} />
    </Page>
  );
};

export default ListPage;
