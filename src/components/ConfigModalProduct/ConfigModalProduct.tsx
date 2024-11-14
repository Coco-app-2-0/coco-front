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


    const handleChange = (event: any) => {
      const { name, checked, value } = event.target;

      // Manejo de ingredientes
      if (name === 'ingredient') {
        if (checked) {
          setSelectedIngredients([...selectedIngredients, value]);
        } else {
          setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== value));
        }
      }

      // Manejo de opciones
      if (name === 'option') {
        const optionId = value; // Suponiendo que el value es el id de la opción
        const optionName = event.target.labels[0].innerText; // Obtener el nombre de la opción
        const optionPrice = parseFloat(event.target.dataset.precio); // Obtener el precio desde un atributo data

        if (checked) {
          setSelectedOptions([...selectedOptions, { id: optionId, nombre: optionName, precio: optionPrice }]);
        } else {
          setSelectedOptions(selectedOptions.filter(option => option.id !== optionId));
        }
      }
    }

    const handleIncremental = (objIncrement: newValue) => {
      // const newObj = {
      //   idExtra: objIncrement.idExtra,  // Cambiado para usar idExtra como clave
      //   nombre: objIncrement.nombre, // Asegúrate de que objIncrement tenga esta propiedad
      //   precio: objIncrement.precio, // Asegúrate de que objIncrement tenga esta propiedad
      //   cantidad: objIncrement.cantidad // Mantener el valor
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
            opciones: selectedOptions, // Agregado el estado de opciones con precio
          }
      };
      configProduct(ticketProduct)
      onClose()
      console.log(ticketProduct); // Aquí puedes manejar el objeto como desees
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
                    <FormGroup onChange={handleChange}>
                      {
                        product?.configuracion?.ingredientes.map((item) => (
                          <FormControlLabel key={item.idIngrediente} value={item.idIngrediente} name={item.nombre} control={<Checkbox name={item.nombre}  />} label={item.nombre} />
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
                <div className={styles.opciones} >
                  <Typography sx={{fontFamily: 'Inter', fontWeight: 600, fontSize:'1rem'}}>Opciones</Typography>
                  <FormControl>
                    {
                      product?.configuracion?.opciones?.tipo_1.multiple ? 
                      (
                        <FormGroup onChange={handleChange}>
                          {
                            product?.configuracion?.opciones?.tipo_1.items.map((item) => (
                              <FormControlLabel key={item.idOpcion} value={item.idOpcion} control={<Checkbox  />} data-precio={item.precio} label={`${item.nombre} ${item.precio !== 0 && ('$'+item.precio)}`} />
                            ))
                          }
                        </FormGroup>
                      )
                      :
                      (
                          <RadioGroup row onChange={handleChange} >
                            {product?.configuracion?.opciones?.tipo_1.items.map((item) => (
                              <>
                                <FormControlLabel key={item.idOpcion} value={item.idOpcion} control={<Radio />} data-precio={item.precio} label={`${item.nombre} ${item.precio !== 0 && ('$'+item.precio)}`} />
                              </>
                            ))}
                          </RadioGroup>
                      )
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