import { Box, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { InputField } from "../../../components/form/formInputs/InputField";

export const ListInputField = ({ name, values }) => {
  const { control } = useFormContext();
  const watchedValues = useWatch({ control, name }) || values || [];

  return (
    <Box style={{ marginBottom: 16 }}>
      <Typography
        style={{
          fontWeight: "bold",
          display: "block",
          marginBottom: 8,
          marginTop: 18,
          textTransform: "uppercase",
        }}
      >
        {name}
      </Typography>
      {watchedValues.map((item, idx) => {
        const titleKey = `${name}[${idx}].title`;
        const valueKey = `${name}[${idx}].value`;
        return (
          <Box
            key={idx}
            sx={{
              display: "flex",
              gap: 2, // 16px
              mb: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <InputField
                name={titleKey}
                label="Başlık"
                placeholder={item.title}
                defaultValue={item.title}
                fullWidth
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <InputField
                name={valueKey}
                label="Değer"
                placeholder={item.value}
                defaultValue={item.value}
                fullWidth
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
