import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@gib-ui/core";
import { Box } from "@mui/material";

// Form şeması
const schema = yup.object().shape({
  sayfaName: yup.string().required("Sayfa Adı zorunludur"),
  // Diğer form elemanları için geçerlilik kuralları ekleyebilirsiniz
});

// Form bileşeni
const Form = ({ children, onSubmit, onReset }) => {
  // react-hook-form kullanımı
  const { control, handleSubmit, reset} = useForm({
    resolver: yupResolver(schema),
  });

 

  // Formun submit edildiğinde çalışacak fonksiyon
  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  // Formun resetlendiğinde çalışacak fonksiyon
  const handleFormReset = () => {
    reset();
    if (onReset) onReset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {React.Children.map(children, (child) => {
        if (
          child.type === "input" ||
          child.type === "select" ||
          child.type === "textarea"
        ) {
          return (
            <Controller
              name={child.props.name}
              control={control}
              render={({ field }) => React.cloneElement(child, { ...field })}
            />
          );
        }
        return child;
      })}

      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button
          buttontype="secondary"
          onClick={handleFormReset}
          sx={{ float: "right", marginTop: 5, marginRight: "10px" }}
        >
          Temizle
        </Button>
        <Button
          buttontype="primary"
          type="submit"
          onClick={handleFormSubmit}
          sx={{ float: "right", marginTop: 5, marginRight: "10px" }}
        >
          Kaydet
        </Button>
      </Box>
    </form>
  );
};

export default Form;
