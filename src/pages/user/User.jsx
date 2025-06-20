import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import Page from "../../components/page/Page";
import CustomDataGrid from "../../components/dataGrid/CustomDataGrid";
import { columns } from "./shared/userEnums";

function Users() {
  const [rows, setRows] = useState([]);
  const breadcrumbLinks = [{ label: "Kullanıcılar" }];

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRows(data);
    };
    fetchData();
  }, []);

  return (
    <Page
      title="KULLANICILAR"
      info="Bu sayfada sistemdeki tüm kullanıcıları görebilirsiniz."
      breadcrumbLinks={breadcrumbLinks}
    >
      <CustomDataGrid rows={rows} columns={columns} />
    </Page>
  );
}

export default Users;
