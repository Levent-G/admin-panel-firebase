import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { notify } from "../../utils/notify";

const Form = forwardRef(
  (
    {
      schema,
      onSubmit,
      defaultValues = {},
      children,
      submitText = "Gönder",
      loading: externalLoading,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });

    // Eğer dışardan ref verilirse formu kontrol etmesini sağlarız (reset vs)
    useImperativeHandle(ref, () => ({
      reset: methods.reset,
      setValue: methods.setValue,
      getValues: methods.getValues,
    }));

    useEffect(() => {
      if (defaultValues && Object.keys(defaultValues).length > 0) {
        methods.reset(defaultValues);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues]);

    const handleFormSubmit = async (data) => {
      setLoading(true);
      try {
        await onSubmit(data);
      } catch (error) {
        notify(error.message || "Bir hata oluştu", "error");
      } finally {
        setLoading(false);
      }
    };

    return (
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          noValidate
          {...props}
        >
          {children}

          <Box mt={3} display="flex" justifyContent="flex-end" alignItems="center">
            {(loading || externalLoading) && <CircularProgress size={24} sx={{ mr: 2 }} />}
            <Button type="submit" variant="contained" disabled={loading || externalLoading}>
              {submitText}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    );
  }
);

export default Form;
