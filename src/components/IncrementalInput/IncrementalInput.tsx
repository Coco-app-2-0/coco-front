import React, { useState } from 'react';
import styles from './IncrementalInput.module.css'

interface IncrementalInputProps {
  name: string;
  value?: number;
  onChange?: (newValue: { name:string, value: number }) => void;
}

const IncrementalInput = ({ name, value = 0, onChange }: IncrementalInputProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleIncrement = () => {
    const newValue = currentValue + 1;
    setCurrentValue(newValue);
    if (onChange) {
      onChange({ name, value: newValue }); // Cambiado para retornar un objeto
    }
  };

  const handleDecrement = () => {
    const newValue = currentValue - 1;
    setCurrentValue(newValue);
    if (onChange) {
      onChange({ name, value: newValue }); // Cambiado para retornar un objeto
    }
  };

  return (
    <div className={styles.incrementalInput}>
    <button className={styles.decrementButton} onClick={handleDecrement}>-</button>
    <input
      type="text"
      className={styles.inputField}
      name={name}
      value={currentValue}
      onChange={(e) => {
        const newValue = Number(e.target.value);
        setCurrentValue(newValue);
        if (onChange) {
          onChange({ name, value: newValue }); // Cambiado para retornar un objeto
        }
      }}
    />
    <button className={styles.incrementButton} onClick={handleIncrement}>+</button>
  </div>
  );
};

export default IncrementalInput;