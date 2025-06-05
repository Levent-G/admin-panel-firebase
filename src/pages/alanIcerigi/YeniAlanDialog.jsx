import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { notify } from "../../utils/notify";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";

const schema = yup.object().shape({
  fieldName: yup.string().required("Alan adı boş olamaz"),
});

export default function YeniAlanDialog({
  open,
  fields,
  setFields,
  setDialogOpen,
}) {
  const [isList, setIsList] = useState(false);
  const ref = useRef();

  const onClose = () => {
    setIsList(false);
    setDialogOpen(false);
    if (ref.current) {
      ref.current.reset();
    }
  };

  const handleAdd = (data) => {
    const cleanName = data.fieldName.trim().toLowerCase();

    if (fields.hasOwnProperty(cleanName)) {
      notify("Bu alan zaten mevcut", "warning");
      return;
    }

    if (isList) {
      // items'i temizle boş başlık ve değerleri at
      const validItems = data.items?.filter(
        (i) => i.title.trim() !== "" && i.value.trim() !== ""
      );
      const listData =
        validItems && validItems.length > 0
          ? validItems
          : [{ title: "", value: "" }];
      setFields((prev) => ({ ...prev, [cleanName]: listData }));
    } else {
      setFields((prev) => ({ ...prev, [cleanName]: "" }));
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Alan Ekle</DialogTitle>
      <Form
        ref={ref}
        schema={schema}
        defaultValues={{
          fieldName: "",
          isList: false,
          items: [{ title: "", value: "" }],
        }}
        onSubmit={handleAdd}
        submitText="Ekle"
        sx={{p:1}}
      >
        <DialogContent>
          <InputField
            fullWidth
            margin="dense"
            label="Alan Adı"
            name={"fieldName"}
          />
          <FormControlLabel
            control={
              <Checkbox
                name={"isList"}
                onChange={(e) => {
                  setIsList(e.target.checked);
                }}
              />
            }
            label="Bu alan bir liste içerecek"
          />

          {isList && <ListItemsForm />}
        </DialogContent>
     
      </Form>
    </Dialog>
  );
}

function ListItemsForm() {
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
}
