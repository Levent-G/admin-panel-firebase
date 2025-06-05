import * as yup from "yup";

export const schema = yup.object().shape({
  fieldName: yup.string().required("Alan adı boş olamaz"),
});
