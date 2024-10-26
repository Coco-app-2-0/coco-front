import { TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';


interface FormInputProps {
  name: string;
  control: any; 
  label?: string
  onChange?: (e: any) => void;
}

const TextInputForm = ({ name, control, label,  }: FormInputProps) => {
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
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  )
}

export default TextInputForm