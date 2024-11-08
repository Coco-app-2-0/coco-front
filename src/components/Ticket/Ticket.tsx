import React from 'react'
import styles from './ticket.module.css'
import { IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import TicketIcon from '../../assets/images/icon-ticket.svg'
import TrashIcon from '../../assets/images/trash-icon.svg'
import ConversationIcon from '../../assets/images/conversation-icon.svg'
import CloseIcon from '@mui/icons-material/Close';
import { ProductTypes } from '@/utils/types'

interface TicketProps {
  products: ProductTypes[];
  deleteProduct: (products: ProductTypes[]) => void;
}

const Ticket = ({products, deleteProduct}: TicketProps) => {

  const handleDelete = (idProducto: number) => {
    const filteredProducts = products.filter(item => item.idProducto !== idProducto)
    deleteProduct(filteredProducts)
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.headerActions}>
        <div className={styles.titleHeader}>
          <Typography variant='h6' sx={{
            fontFamily: 'Inter',
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: '24.2px',
          }} >Ticket</Typography>
          <Image src={TicketIcon} alt={'ticket-icon'} className={styles.ticketIcon} />
        </div>
        <div className={styles.headerButtons}>
          <IconButton aria-label="Notificaciones">
            <Image src={ConversationIcon} alt="icon" />
          </IconButton>
          <IconButton aria-label="Notificaciones">
            <Image src={TrashIcon} alt="icon" />
          </IconButton>
        </div>
      </div>

      <div className={styles.ticketProducts} >
        {products.map((product, i) => (
          <div key={i} className={styles.productItem}>
                <div className={styles.countProduct}>
                  <Typography sx={{color: '#176DEE'}}>
                    1
                  </Typography>
                </div>
                <div className={styles.productList}>
                  <Typography>
                    {product.nombre}
                  </Typography>
                  <ul className={styles.productExtra} >
                    {
                      product.configurable && (
                        <>
                          {product?.configuracion?.complementos && product?.configuracion?.complementos.map((item, j) => 
                            <li key={j}><Typography >{item.nombre}</Typography></li>
                          )}
                          {product?.configuracion?.extras && product?.configuracion?.extras.map((extra, k) => 
                            <li key={k}><Typography >{extra.nombre}</Typography></li>
                          )}
                          {product?.configuracion?.ingredientes && product?.configuracion?.ingredientes.map((ingrediente, l) => 
                            <li key={l}><Typography >{ingrediente.nombre}</Typography></li>
                          )}
                        </>
                      )
                    }
                  </ul>
                </div>
                <div className={styles.totalProduct}>
                  <IconButton aria-label="Eliminar" onClick={() => handleDelete(product.idProducto)}>
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{fontWeight:700}}>
                    ${product.precio}
                  </Typography>
                </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Ticket