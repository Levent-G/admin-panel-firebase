import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import Page from "../../components/page/Page";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { notify } from "../../utils/notify";
import IcerikDetayList from "./IcerikDetayList";

const IcerikList = () => {
  const { pageName } = useParams();
  const lowerCasePageName = pageName?.toLowerCase();

  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const navigate = useNavigate();

  const breadcrumbLinks = [
    { label: "Sayfalarım", href: "/sayfalarim" },
    { label: "İçerik Listesi" },
  ];

  useEffect(() => {
    if (!lowerCasePageName) return;

    const fetchFields = async () => {
      try {
        const fieldsCollectionRef = collection(
          db,
          "pages",
          lowerCasePageName,
          "fields"
        );
        const fieldsSnapshot = await getDocs(fieldsCollectionRef);

        const fieldsData = fieldsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFields(fieldsData);
        setSelectedFieldId(null);
      } catch (error) {
        notify("Alanlar yüklenirken hata oluştu.", "error");
      }
    };

    fetchFields();
  }, [lowerCasePageName]);

  const handleToggleDetails = (fieldId) => {
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    } else {
      setSelectedFieldId(fieldId);
    }
  };

  const handleDeleteField = async (fieldId) => {
    try {
      const fieldDocRef = doc(
        db,
        "pages",
        lowerCasePageName,
        "fields",
        fieldId
      );
      await deleteDoc(fieldDocRef);

      // Listeyi yenile
      const fieldsCollectionRef = collection(
        db,
        "pages",
        lowerCasePageName,
        "fields"
      );
      const fieldsSnapshot = await getDocs(fieldsCollectionRef);
      const fieldsData = fieldsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFields(fieldsData);

      if (selectedFieldId === fieldId) {
        setSelectedFieldId(null);
      }
      notify("Silme işlemi başarılı", "success");
    } catch (error) {
      notify("Silme sırasında hata oluştu", "error");
    }
  };

  return (
    <>
      <Page
        title={`${pageName?.toUpperCase()} Alan Listesi`}
        info={`${lowerCasePageName} sayfasındaki alanları listeleyebilirsiniz.`}
        breadcrumbLinks={breadcrumbLinks}
      >
        <Table>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.id}>
                <TableCell
                  sx={{
                    textTransform: "uppercase",
                    display: "flex",
                    flexDirection: "column", 
                    alignItems: "flex-start",
                    gap: 2,
                    m: 1,
                    backgroundColor:selectedFieldId === field.id? "rgba(0, 0, 0, 0.05)" : "transparent", // Seçili alan için arka plan rengi
                  }}
                >
                  {/* Alan Bilgisi */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      fontWeight="bold"
                      variant="body2"
                      color="text.primary"
                    >
                      Alan:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {field.id}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 2,
                      width: "100%",
                      justifyContent: { xs: "center", sm: "flex-end" },
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleToggleDetails(field.id)}
                      sx={{ fontSize: "11px" }}
                    >
                      {selectedFieldId === field.id ? "Detayı Gizle" : "Detay"}
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/sayfa/${lowerCasePageName}`)}
                      sx={{ fontSize: "11px" }}
                    >
                      Yeni alan ekle
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteField(field.id)}
                      sx={{ fontSize: "11px"}}
                    >
                      Sil
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>Hiç alan bulunamadı.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Page>
      <IcerikDetayList
        fields={fields}
        setFields={setFields}
        selectedFieldId={selectedFieldId}
        pageName={lowerCasePageName}
      />
    </>
  );
};

export default IcerikList;
