import { useParams, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { db } from "../../services/firebase";
import { notify } from "../../utils/notify";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";
import { schema } from "./alanEklemeSchema";

export default function AlanEkleme() {
  const { pageName } = useParams();
  const navigate = useNavigate();

  const breadcrumbLinks = [
    { label: "Sayfalarım", href: "/sayfalarim" },
    { label: "Alan Ekleme" },
  ];

  const handleSubmit = async (data) => {
    const fieldName = data.fieldName.trim().toLowerCase();
    const lowerCasePageName = pageName.toLowerCase();

    const pageDocRef = doc(db, "pages", lowerCasePageName);
    const pageSnap = await getDoc(pageDocRef);
    if (!pageSnap.exists()) {
      notify("Belirtilen sayfa bulunamadı", "error");
      return;
    }

    const fieldDocRef = doc(
      db,
      "pages",
      lowerCasePageName,
      "fields",
      fieldName
    );
    const fieldSnap = await getDoc(fieldDocRef);

    if (fieldSnap.exists()) {
      notify("Bu alan zaten mevcut", "error");
      return;
    }

    await setDoc(fieldDocRef, {
      title: "",
      description: "",
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    notify(`${fieldName} alanı eklendi`, "success");
    navigate(`/sayfa/${lowerCasePageName}/alan/${fieldName}`);
  };

  return (
    <Page
      title={`${pageName.toUpperCase()} - Yeni Alan Ekle`}
      info="Bu sayfaya yeni içerik alanı tanımlayabilirsiniz."
      breadcrumbLinks={breadcrumbLinks}
    >
      <Form schema={schema} onSubmit={handleSubmit} submitText="Alanı Ekle">
        <InputField name="fieldName" label="Alan Adı (örnek: hakkimizda)" />
      </Form>
    </Page>
  );
}
