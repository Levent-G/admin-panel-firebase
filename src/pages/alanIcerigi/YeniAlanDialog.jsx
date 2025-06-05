import {
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRef, useState } from "react";
import { notify } from "../../utils/notify";
import Form from "../../components/form/Form";
import { InputField } from "../../components/form/formInputs/InputField";
import ListItemsForm from "./components/ListItemsForm";
import { schema } from "./shared/yeniAlanDialogSchema";

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
        sx={{ p: 1 }}
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
