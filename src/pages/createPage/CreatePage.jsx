import React, { useRef } from "react";
import * as yup from "yup";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";
import { notify } from "../../utils/notify";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required("Başlık zorunlu"),
  description: yup.string(),
  link: yup
    .string()
    .url("Geçerli bir URL girin (örnek: https://...)")
    .required("Link zorunludur"),
});

export default function CreatePage() {
  const formRef = useRef();
  const navigate = useNavigate();

  const breadcrumbLinks = [{ label: "Sayfa Oluştur" }];

  const onSubmit = async (data) => {
    const { reset } = formRef.current;

    const pageId = data.title.trim().toLowerCase().replace(/\s+/g, "-");

    try {
      await setDoc(doc(db, "pages", pageId), {
        ...data,
        createdAt: serverTimestamp(),
      });

      notify("Sayfa başarıyla kaydedildi!", "success");
      reset({
        title: "",
        description: "",
        link: "",
      });

      navigate("/sayfalarim");
    } catch (error) {
      notify("Sayfa kaydedilirken hata oluştu.", "error");
    }
  };

  return (
    <Page
      title="Yeni Sayfa Ekle"
      info="Bu sayfada sisteme yeni sayfanızı ekleyebilirsiniz."
      breadcrumbLinks={breadcrumbLinks}
    >
      <Form
        ref={formRef}
        schema={schema}
        onSubmit={onSubmit}
        submitText="Kaydet"
      >
        <InputField name="title" label="Başlık" />
        <InputField name="link" label="Sayfa Linki" />
        <InputField name="description" label="Açıklama" multiline rows={4} />
      </Form>
    </Page>
  );
}
