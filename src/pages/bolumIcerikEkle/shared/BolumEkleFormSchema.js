import * as yup from "yup";

export const bolumEkleSchema = yup.object().shape({
    bolumAdi: yup.string().required("Bölüm Adı zorunludur"),
  });
  