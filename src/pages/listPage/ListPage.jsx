import Page from "../../components/page/Page";
import CustomDataGrid from "../../components/dataGrid/CustomDataGrid";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { listPageEnums } from "./shared/listPageEnums";

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

  const columns = listPageEnums({handleNavigate, navigate});
  
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
