import React from "react";
import { Autocomplete as GibAutocomplete } from "@gib-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const AutocompleteItem = ({ sx, ...props }) => {
    const { control } = useFormContext();

    // Handle missing context
    if (!control) {
        console.error("Form context is not available. Ensure this component is used within a FormProvider.");
        return null;
    }

    return (
        <Controller
            defaultValue={props.defaultValue}
            name={props.name || props.id}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <GibAutocomplete
                        sx={{
                            "& .MuiAutocomplete-input": {
                                fontSize: "1rem"
                            },
                            "& .MuiOutlinedInput-root": {
                                borderColor: fieldState.error ? "#d32f2f" : "#ccc",
                                borderWidth: 1,
                                borderStyle: "solid"
                            },
                            ...sx
                        }}
                        value={field.value}
                        {...props}
                        onChange={(event, newValue, reason, details) => {
                            if (newValue === null) {
                                field.onChange("");
                                return;
                            }
                            if (newValue !== null) {
                                if (props.onChange) {
                                    props.onChange(event, newValue, reason, details);
                                }
                                field.onChange(newValue.text);
                                if (props.setValue) {
                                    props.setValue(newValue.text);
                                }
                            }
                        }}
                    />

                    {((fieldState.error && fieldState.error.message) || props.helperText) && (
                        <FormHelperText error={true}>
                            {(fieldState.error && fieldState.error.message) || props.helperText}
                        </FormHelperText>
                    )}
                </>
            )}
        />
    );
};

export default AutocompleteItem;
