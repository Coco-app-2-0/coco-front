import React from 'react'
import styles from './ticket.module.css'
import { IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import TicketIcon from '../../assets/images/icon-ticket.svg'
import TrashIcon from '../../assets/images/trash-icon.svg'
import ConversationIcon from '../../assets/images/conversation-icon.svg'

const Ticket = () => {
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


    </div>
  )
}

export default Ticket