import { useParams, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import * as yup from "yup";

import { db } from "../../services/firebase";
import { notify } from "../../utils/notify";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";

export default function AlanEkleme() {
  const { pageName } = useParams();
  const navigate = useNavigate();

  const breadcrumbLinks = [
    { label: "Sayfalarım", href: "/sayfalarim" },
    { label: "Alan Ekleme" },
  ];

  const schema = yup.object().shape({
    fieldName: yup.string().required("Alan adı zorunludur"),
  });

  const handleSubmit = async (data) => {
    const fieldName = data.fieldName.trim().toLowerCase();
    const lowerCasePageName = pageName.toLowerCase();

    // Önce pageName dokümanını kontrol et
    const pageDocRef = doc(db, "pages", lowerCasePageName);
    const pageSnap = await getDoc(pageDocRef);
    if (!pageSnap.exists()) {
      notify("Belirtilen sayfa bulunamadı", "error");
      return;
    }

    // "fields" koleksiyonuna yeni alan olarak fieldName dokümanı ekle (content içermeden direkt)
    const fieldDocRef = doc(db, "pages", lowerCasePageName, "fields", fieldName);
    const fieldSnap = await getDoc(fieldDocRef);

    if (fieldSnap.exists()) {
      notify("Bu alan zaten mevcut", "error");
      return;
    }

    // Yeni field dokümanı içine başlangıç verilerini yaz (title, description vs. aynı dokümanda)
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
