import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@gib-ui/core";
import { Box } from "@mui/material";

const Form = forwardRef(
  ({ children, onSubmit, onReset, schema, handleFormCancel }, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      getValues,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    useImperativeHandle(ref, () => ({
      resetForm: () => reset(),
      getValues: () => getValues(),
      setValue: (name, value) => setValue(name, value),
    }));

    const handleFormSubmit = (data) => {
      if (onSubmit) onSubmit(data);
    };

    const handleFormReset = () => {
      reset();
      if (typeof onReset === "function") {
        onReset();
      }
    };

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.name) {
            const error = errors[child.props.name];
            const isError = !!error;

            return (
              <Controller
                name={child.props.name}
                control={control}
                defaultValue={child.props.defaultValue || ""}
                render={({ field }) =>
                  React.cloneElement(child, {
                    ...field,
                    error: isError,
                    helperText: isError ? error.message : "",
                    sx: {
                      ...child.props.sx,
                      "& label": {
                        color: isError ? "red" : "", // Hata durumunda label rengini kırmızı yapar
                      },
                    },
                  })
                }
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
          {handleFormCancel && (
            <Button
              buttontype="secondary"
              onClick={handleFormCancel}
              sx={{ marginRight: "10px" }}
            >
              Vazgeç
            </Button>
          )}
          {onReset && (
            <Button
              buttontype="primary"
              type="button" // Button türünü 'button' yapıyoruz
              onClick={handleFormReset}
              sx={{ marginRight: "10px" }}
            >
              Temizle
            </Button>
          )}
          {onSubmit && (
            <Button buttontype="primary" type="submit">
              Kaydet
            </Button>
          )}
        </Box>
      </form>
    );
  }
);

export default Form;
