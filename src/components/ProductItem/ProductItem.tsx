import React from 'react'
import styles from './productItem.module.css'
import { Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ProductTypes } from '@/utils/types';

interface ProductItemProps {
  product: ProductTypes;
  clickItem: (data: ProductTypes) => void;
}

const ProductItem = ({ product, clickItem }: ProductItemProps) => {
  return (
    <div className={styles.cardProduct}  >
      <div className={styles.titleProduct}>
        <Typography variant='body1'>{product.nombre}</Typography>
      </div>
      <div className={styles.detailsProduct}>
        <AddCircleOutlineIcon className={styles.iconHover} onClick={() => clickItem(product)} />
        <div className={styles.costProduct}>
          <span>
            ${product.precio}mxn
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem