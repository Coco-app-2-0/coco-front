import React from 'react'
import styles from './ticket.module.css'
import { Typography } from '@mui/material'

const Ticket = () => {
  return (
    <div className={styles.ticket}>
      <Typography variant='h6' sx={{
        fontFamily: 'Inter',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '24.2px',
      }} >Ticket</Typography>
    </div>
  )
}

export default Ticket