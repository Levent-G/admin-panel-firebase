import * as yup from "yup";

export const alanIcerigiSchema = (fields) => {
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
};
