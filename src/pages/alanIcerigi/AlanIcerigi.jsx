import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@mui/material";

import { db } from "../../services/firebase";
import { notify } from "../../utils/notify";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";
import YeniAlanDialog from "./YeniAlanDialog";
import { alanIcerigiSchema } from "./shared/alanIcerigiSchema";
import { ListInputField } from "./components/ListInputField";

export default function AlanIcerigi() {
  const { pageName, fieldName } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState({});
  const [defaultValues,setDefaultValues] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false);

  const fieldsFormref = useRef();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const ref = doc(db, "pages", pageName, "fields", fieldName);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          const contentFields = Object.keys(data).filter(
            (key) => !["createdAt", "updatedAt"].includes(key)
          );

          const newFields = {};
          contentFields.forEach((key) => {
            newFields[key] = data[key];
          });
          setDefaultValues(newFields)
          setFields(newFields);
        } else {
          setFields({});
        }
      } catch (err) {
        notify("Veri yüklenirken hata oluştu", "error");
      }
    };
    loadContent();
  }, [pageName, fieldName]);

  const handleSave = async (formData) => {
    try {
      const ref = doc(db, "pages", pageName, "fields", fieldName);
      await setDoc(
        ref,
        { ...formData, updatedAt: serverTimestamp() },
        { merge: true }
      );
      notify("İçerik başarıyla kaydedildi", "success");
      navigate("/sayfalarim");
    } catch (e) {
      notify("Kaydetme sırasında hata oluştu", "error");
    }
  };

  return (
    <Page
      title={`${fieldName.toUpperCase()} İçeriğini Düzenle`}
      info="Bu alana ait içeriği güncelleyebilirsiniz."
      breadcrumbLinks={[
        { label: "Sayfalarım", href: "/sayfalarim" },
        { label: "Alan Ekleme", href: `/sayfa/${pageName}` },
        { label: "İçerik Düzenle" },
      ]}
    >
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => setDialogOpen(true)}
      >
        Yeni İçerik Alanı Ekle
      </Button>

      <Form
        ref={fieldsFormref}
        schema={alanIcerigiSchema(fields)}
        onSubmit={handleSave}
        submitText="Kaydet"
        defaultValues={defaultValues}
      >
        {Object.entries(fields).map(([fieldKey, fieldValue]) =>
          Array.isArray(fieldValue) ? (
            <ListInputField
              key={fieldKey}
              name={fieldKey}
              values={fieldValue}
            />
          ) : (
            <InputField
              key={fieldKey}
              name={fieldKey}
              label={fieldKey}
              defaultValue={fieldValue}
              fullWidth
            />
          )
        )}
      </Form>

      <YeniAlanDialog
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        fields={fields}
        setFields={setFields}
      />
    </Page>
  );
}
