import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    nombre: string;
    precio: number;
    configuracion?: {
      extras?: { nombre: string; precio: number }[];
      complementos?: { nombre: string; precio: number }[];
    };
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null; // No renderizar si el modal no está abierto o no hay producto

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{product.nombre}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Precio: ${product.precio.toFixed(2)}</Typography>
        <Typography variant="h6">Opciones:</Typography>
        {product.configuracion?.extras && product.configuracion.extras.length > 0 && (
          <div>
            <Typography variant="subtitle1">Extras:</Typography>
            <ul>
              {product.configuracion.extras.map((extra, index) => (
                <li key={index}>
                  {extra.nombre} - ${extra.precio.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {product.configuracion?.complementos && product.configuracion.complementos.length > 0 && (
          <div>
            <Typography variant="subtitle1">Complementos:</Typography>
            <ul>
              {product.configuracion.complementos.map((complemento, index) => (
                <li key={index}>
                  {complemento.nombre} - ${complemento.precio.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;