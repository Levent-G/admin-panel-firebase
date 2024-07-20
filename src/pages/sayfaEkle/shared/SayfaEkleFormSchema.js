import * as yup from "yup";
export const schema = yup.object().shape({
  sayfaName: yup.string().required("Sayfa Adı zorunludur"),
  bolum: yup.boolean(),
});
export const schemaDrawer = yup.object().shape({
  bolumAdi: yup.string().required("Bölüm Adı zorunludur"),
});
