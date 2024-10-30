import React, { ReactNode } from 'react'
import styles from './NavInfo.module.css'
import { Avatar, Typography, IconButton } from '@mui/material';
import { stringAvatar } from '@/utils/avatarText';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

interface NavInfoProps {
  avatar?: ReactNode;
  storeName: string;
  schedule: string;
  statusOpen: boolean;
}

const NavInfo = ({avatar, storeName, schedule, statusOpen}: NavInfoProps) => {
  return (
    <section className={styles.navinfo}>
      <div className={styles.containerInfo}>
        <div className={styles.infoStore}>
          <Avatar {...stringAvatar(storeName)} />
          
          <Typography variant='body1' >
            {storeName}
          </Typography>

          <Typography variant='body2'>
            {schedule}
          </Typography>
        </div>
        <div>
        <IconButton aria-label="Notificaciones">
          <CircleNotificationsIcon />
        </IconButton>
        </div>
      </div>
    </section>
  )
}

export default NavInfo