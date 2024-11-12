import React, { useState } from 'react'
import styles from './ticket.module.css'
import { Badge, IconButton, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import TicketIcon from '../../assets/images/icon-ticket.svg'
import TrashIcon from '../../assets/images/trash-icon.svg'
import ConversationIcon from '../../assets/images/conversation-icon.svg'
import CloseIcon from '@mui/icons-material/Close';
import { ProductTicket } from '@/utils/types'
import CommentModal from '../CommentModal/CommentModal'

interface TicketProps {
  products: ProductTicket[];
  deleteProduct: (products: ProductTicket[]) => void;
}

const Ticket = ({products, deleteProduct}: TicketProps) => {

  const [ openModal, setOpenModal ] = useState<boolean>(false)
  const [ comment, setComment ] = useState<string>()

  const handleDelete = (idProducto: number) => {
    const filteredProducts = products.filter(item => item.idProducto !== idProducto)
    deleteProduct(filteredProducts)
  };

  const handleTrashProducts = () => {
    deleteProduct([])
  }

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
          {
            comment ?
              <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                <IconButton aria-label="Notificaciones" onClick={() => setOpenModal(!openModal)}>
                  <Image src={ConversationIcon} alt="icon" />
                </IconButton>
              </Badge>
              :
              <IconButton aria-label="Notificaciones" onClick={() => setOpenModal(!openModal)}>
                <Image src={ConversationIcon} alt="icon" />
              </IconButton>
          }
          <IconButton aria-label="Notificaciones" onClick={handleTrashProducts}>
            <Image src={TrashIcon} alt="icon" />
          </IconButton>
        </div>
      </div>

      <div className={styles.ticketProducts} >
        {products.map((product, i) => (
          <div key={i} className={styles.productItem}>
                <div className={styles.countProduct}>
                  <Typography sx={{color: '#176DEE'}}>
                    {product.quantity}
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <CommentModal comment={comment || ''} setComment={setComment} onCloseModal={() => setOpenModal(false)} />
      </Modal>
    </div>
  )
}

export default Ticket