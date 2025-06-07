import { TextField} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Base from "../base/Base";

export function InputField({ name, label, multiline = true, rows, disabled,...props }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Base {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            label={label}
            fullWidth
            margin="normal"
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            sx={{
              "& .MuiInputBase-root textarea": {
                resize: "vertical", // veya "both" istersen yatay da büyür
                overflow: "auto", // scrollbar düzgün çalışsın
                minHeight: 100,   // istersen bir minimum yükseklik
              },
              ...props.sx
            }}
            {...field}
          />
        )}
      />
    </Base>
  );
}
