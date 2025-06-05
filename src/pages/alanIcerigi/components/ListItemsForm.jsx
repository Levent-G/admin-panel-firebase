import { Box, Button } from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { InputField } from "../../../components/form/formInputs/InputField";

const ListItemsForm = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <Box mt={2}>
      {fields.map((item, idx) => (
        <Box key={item.id} display="flex" gap={2} mb={2} alignItems="center">
          <InputField
            label={`Başlık ${item.title || idx + 1}`}
            name={`items[${idx}].title`}
            placeholder="Başlık"
            fullWidth
          />
          <InputField
            label={`Değer ${item.value || idx + 1}`}
            name={`items[${idx}].value`}
            placeholder="Değer"
            fullWidth
          />
          <Button color="error" onClick={() => remove(idx)}>
            Sil
          </Button>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={() => append({ title: "", value: "" })}
      >
        Yeni Satır Ekle
      </Button>
    </Box>
  );
};

export default ListItemsForm;
