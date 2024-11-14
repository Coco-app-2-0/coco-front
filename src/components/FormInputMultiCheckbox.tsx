import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel
} from "@mui/material";
import { Controller } from "react-hook-form";
import { ConfigProductExtras, ConfigProductOption, Ingrediente } from "@/utils/types";

interface FormInputProps {
  options: Ingrediente[] | ConfigProductExtras[] | ConfigProductOption[]
  name: string;
  control: any; 
  label?: string
  onChange?: (e: any) => void;
  setValue: (name: string, selectedItems: object) => void;
}

export const FormInputMultiCheckbox: React.FC<FormInputProps> = ({
  options,
  name,
  control,
  setValue,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  // we are handling the selection manually here
  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value]);
    }
  };
  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems);
  }, [name, selectedItems, setValue]);
  return (
    <FormControl size={"small"} variant={"outlined"}>
      <div>
        {options.map((option: any) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={() => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};