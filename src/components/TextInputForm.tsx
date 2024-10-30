import { TextField } from '@mui/material';
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';


interface FormInputProps {
  name: string;
  control: unknown; 
  label?: string
  onChange?: (e: unknown) => void;
  variantType?: string;
  customStyle?: string;
  inputType?: string;
}

const TextInputForm = ({ name, control, label, customStyle, variantType = 'standard', inputType='text'  }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          type={inputType}
          fullWidth
          label={label}
          className={customStyle}
          variant={variantType as "standard" | "outlined" | "filled"}
          sx={{
            "& .MuiInputLabel-standard": {
              color: "#7f7f7f",
              fontWeight: 400,
              fontStyle: 'italic',
            },
          }}
        />
      )}
    />
  )
}

export default TextInputForm