import { TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';


interface FormInputProps {
  name: string;
  control: any; 
  label?: string
  onChange?: (e: any) => void;
  variantType?: string;
  customStyle?: string;
  inputType?: string;
}

const TextInputForm = ({ name, control, label, customStyle, variantType = 'standard', inputType='text'  }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
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