import { ProductTypes, TicketProduct } from '@/utils/types';
import React, { useState } from 'react';
import styles from './configModalProduct.module.css'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from '@mui/material';
import IncrementalInput from '../IncrementalInput/IncrementalInput';

interface ConfigModalProductProps {
  product: ProductTypes | null;
  onClose: () => void;
  configProduct: (product: TicketProduct) => void
}

interface newValue {
  precio: any;
  nombre: any;
  idExtra: any;
  cantidad: number;
}

const ConfigModalProduct = ({ product, onClose, configProduct }: ConfigModalProductProps) => {
    const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
    const [selectedExtras, setSelectedExtras] = useState<any[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{ id: string; nombre: string, precio: number }[]>([]); // Nuevo estado para opciones


    const handleChange = (event: any, type: string, tipoKey?: string) => {
      const { name, checked, value } = event.target;
      // const getDataValue = 
      // Manejo de ingredientes
      if(type === 'ingredients') {
        const ingredienteSeleccionado = product?.configuracion?.ingredientes.find(
          (ing) => ing.idIngrediente.toString() === value
        );
  
        if (checked && ingredienteSeleccionado) {
          setSelectedIngredients([...selectedIngredients, ingredienteSeleccionado]);
        } else {
          setSelectedIngredients(selectedIngredients.filter(
            ingredient => ingredient.idIngrediente.toString() !== value
          ));
        }
      }

      // Manejo de opciones
      if (type === 'options' || type === 'options-check') {
        const optionId = value;
        const optionName = event.target.labels[0].innerText.replace(/\$\d+(\.\d+)?$/, '').trim();    
        const opcion = Object.values(product?.configuracion?.opciones || {})
          .flatMap(grupo => grupo.items)
          .find((item: any) => item.idOpcion.toString() === optionId);

        const optionPrice = opcion?.precio || 0;
        const tipo = tipoKey || '';
      
        if (type === 'options') {
          // Para radio buttons
          setSelectedOptions(prevOptions => {
            // Filtrar las opciones que no son del mismo grupo
            const filteredOptions = prevOptions.filter(opt => !opt.tipo?.includes(tipo));
            return [...filteredOptions, {
              id: optionId,
              nombre: optionName,
              precio: optionPrice,
              tipo: tipo
            }];
          });
        } else {
          // Para checkboxes
          if (checked) {
            const existingOptionIndex = selectedOptions.findIndex(
              opt => opt.tipo?.includes(tipo)
            );
      
            setSelectedOptions(prev => {
              if (existingOptionIndex >= 0) {
                const newOptions = [...prev];
                newOptions[existingOptionIndex] = {
                  id: optionId,
                  nombre: optionName,
                  precio: optionPrice,
                  tipo: tipo
                };
                return newOptions;
              }
              return [...prev, {
                id: optionId,
                nombre: optionName,
                precio: optionPrice,
                tipo: tipo
              }];
            });
          } else {
            setSelectedOptions(prev => prev.filter(option => option.id !== optionId));
          }
        }
      }
    }

    const handleIncremental = (objIncrement: newValue) => {
      const newExtras = [
        {
          idExtra: objIncrement.idExtra,  // Cambiado para usar idExtra como clave
          nombre: objIncrement.nombre, // Asegúrate de que objIncrement tenga esta propiedad
          precio: objIncrement.precio, // Asegúrate de que objIncrement tenga esta propiedad
          cantidad: objIncrement.cantidad // Mantener el valor
        },
        ...selectedExtras, // Usar el estado anterior para mantener los elementos existentes
      ]
      setSelectedExtras(newExtras);
    }

    const handleAddToOrder = () => {
      const ticketProduct: any = {
          idProducto: product?.idProducto ?? 0,
          nombre: product?.nombre ?? '',
          precio: product?.precio,
          config: true,
          configuracion: {
            ingredientes: selectedIngredients,
            extras: selectedExtras,
            opciones: {
              tipo_1: selectedOptions[0],
              tipo_2: selectedOptions[1]
            }, // Agregado el estado de opciones con precio
          }
      };
      configProduct(ticketProduct)
      onClose()
  };

    return (
      <div className={styles.containerModal} >
        <div className={styles.configModal}>
            <Typography>
              {product?.nombre}

            </Typography> 
            <div className={styles.additionals}>
              {
                product?.configuracion?.hasOwnProperty('ingredientes') &&
                  <div className={styles.ingredients}>
                    <Typography sx={{fontFamily: 'Inter', fontWeight: 600, fontSize:'1rem'}}>Ingredientes</Typography>
                    <FormGroup onChange={(ev) => handleChange(ev, 'ingredients')}>
                      {
                        product?.configuracion?.ingredientes.map((item) => (
                          <FormControlLabel className={styles.inputCheck} key={item.idIngrediente} value={item.idIngrediente} name={item.nombre} control={<Checkbox name={item.nombre}  />} label={item.nombre} />
                        ))
                      }
                    </FormGroup>
                  </div>
              }
              {
                product?.configuracion?.hasOwnProperty('extras') &&
                  <div className={styles.extras}>
                    <Typography sx={{fontFamily: 'Inter', fontWeight: 600, fontSize:'1rem'}}>Extras</Typography>
                      {
                        product?.configuracion?.extras.map((item, i) => (
                          <div className={styles.extrasInputs} key={i}>
                            <Typography>{`${item.nombre} ${item.precio !== 0 && ('$'+item.precio)}`}</Typography>
                            <IncrementalInput 
                              name={`${item.nombre}`} // Agregada la prop name
                              value={0} // Agregada la prop value, puedes ajustar el valor inicial según sea necesario
                              onChange={(newValue) => handleIncremental({ // Modificado para enviar el objeto correcto
                                idExtra: item.idExtra, // Asegúrate de que item tenga esta propiedad
                                nombre: item.nombre, // Asegúrate de que item tenga esta propiedad
                                precio: item.precio, // Asegúrate de que item tenga esta propiedad
                                cantidad: newValue.value // Mantener el valor
                              })} 
                            />
                          </div>
                        ))
                      }
                  </div>
              }

              {
                product?.configuracion?.hasOwnProperty('opciones') &&
                <div className={styles.options} >
                  <Typography sx={{fontFamily: 'Inter', fontWeight: 600, fontSize:'1rem'}}>Opciones</Typography>
                  <FormControl>
                  {
                    Object.keys(product?.configuracion?.opciones || {}).map((tipoKey) => {
                      const tipoOpciones = product?.configuracion?.opciones[tipoKey];
                      return (
                        <div key={tipoKey}>
                          <Typography variant="subtitle2">{tipoOpciones.nombre}</Typography>
                          {tipoOpciones.multiple ? (
                            <FormGroup onChange={(ev) => handleChange(ev, 'options-check', tipoKey)}>
                              {tipoOpciones.items.map((item: any) => (
                                <FormControlLabel
                                  className={styles.inputCheck}
                                  key={item.idOpcion} 
                                  value={item.idOpcion} 
                                  control={<Checkbox />} 
                                  label={`${item.nombre} ${item.precio ? '$'+item.precio : ''}`} 
                                />
                              ))}
                            </FormGroup>
                          ) : (
                            <RadioGroup row onChange={(ev) => handleChange(ev, 'options', tipoKey)}>
                              {tipoOpciones.items.map((item: any) => (
                                <FormControlLabel 
                                className={styles.inputRadio}
                                  key={item.idOpcion} 
                                  value={item.idOpcion} 
                                  control={<Radio />} 
                                  label={`${item.nombre} ${item.precio ? '$'+item.precio : ''}`} 
                                />
                              ))}
                            </RadioGroup>
                          )}
                        </div>
                      );
                    })
                  }
                  </FormControl>
                </div>
              }
            </div>
            <div className={styles.actions}>
              <Button fullWidth onClick={onClose} >Volver</Button>
              <Button variant="contained" fullWidth onClick={handleAddToOrder} >Agregar a la orden</Button>
            </div>
        </div>
      </div>
    );
};

export default ConfigModalProduct;