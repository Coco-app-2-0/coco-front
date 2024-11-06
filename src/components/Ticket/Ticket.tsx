import React from 'react'
import styles from './ticket.module.css'
import { Typography } from '@mui/material'

const Ticket = () => {
  return (
    <div className={styles.ticket}>
      <Typography variant='h6' sx={{
        fontFamily: 'Inter',
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: '24.2px',
      }} >Ticket</Typography>


      <div>
        <Typography sx={{
          fontFamily: 'Inter',
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '16.94px',
        }} >Ticket</Typography>
      </div>
    </div>
  )
}

export default Ticket