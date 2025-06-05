import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import * as yup from "yup";

import { db } from "../../services/firebase";
import { notify } from "../../utils/notify";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";
import YeniAlanDialog from "./YeniAlanDialog";

function ListInputField({ name, values }) {
  const { control } = useFormContext();
  const watchedValues = useWatch({ control, name }) || values || [];

  return (
    <Box style={{ marginBottom: 16 }}>
      <Typography style={{ fontWeight: "bold", display: "block", marginBottom: 8,marginTop:18,textTransform:"uppercase" }}>
        {name}
      </Typography>
      {watchedValues.map((item, idx) => {
        const titleKey = `${name}[${idx}].title`;
        const valueKey = `${name}[${idx}].value`;
        return (
          <Box
          key={idx}
          sx={{
            display: "flex",
            gap: 2, // 16px
            mb: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputField
              name={titleKey}
              label="Başlık"
              placeholder={item.title}
              defaultValue={item.title}
              fullWidth
            />
          </Box>
        
          <Box sx={{ flex: 1 }}>
            <InputField
              name={valueKey}
              label="Değer"
              placeholder={item.value}
              defaultValue={item.value}
              fullWidth
            />
          </Box>
        </Box>
        );
      })}
    </Box>
  );
}

export default function AlanIcerigi() {
  const { pageName, fieldName } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const fieldsFormref = useRef();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const ref = doc(db, "pages", pageName, "fields", fieldName);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          // Sadece createdAt ve updatedAt dışındaki alanları al
          const contentFields = Object.keys(data).filter(
            (key) => !["createdAt", "updatedAt"].includes(key)
          );

          // fields objesini oluştur
          const newFields = {};
          contentFields.forEach((key) => {
            newFields[key] = data[key];
          });

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

  // Yup schema dinamik olarak oluşturuluyor
  const schema = useMemo(() => {
    return yup.object(
      Object.entries(fields).reduce((acc, [key, val]) => {
        acc[key] = Array.isArray(val)
          ? yup.array().of(
              yup.object({
                title: yup.string().required("Başlık zorunlu"),
                value: yup.string().required("Değer zorunlu"),
              })
            )
          : yup.string().nullable();
        return acc;
      }, {})
    );
  }, [fields]);

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
        schema={schema}
        onSubmit={handleSave}
        submitText="Kaydet"
        defaultValues={fields}
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
