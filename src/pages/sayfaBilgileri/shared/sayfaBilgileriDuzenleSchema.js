import * as yup from "yup";


  export const schemaDrawer = (bolumEkle) => {
    return yup.object().shape({
      bolum: yup.string().required("Bölüm zorunludur"),
      sayfaAdi: bolumEkle ? yup.string() : yup.string().required("Sayfa adı zorunludur"),
    });
  };