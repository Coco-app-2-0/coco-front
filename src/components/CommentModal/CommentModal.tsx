import { Button, IconButton, TextField, Typography } from '@mui/material';
import React from 'react'
import styles from './commentModal.module.css'
import CloseIcon from '@mui/icons-material/Close';

interface CommentModalProps {
  comment: string;
  setComment: (comments: string) => void;
}

const CommentModal = ({ comment, setComment }: CommentModalProps) => {

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <div className={styles.commentsCard} >
      <div className={styles.titleComments}>
        <Typography sx={{fontFamily: 'Inter', fontWeight: 700, }} >
          Añade un comentario
        </Typography>
        <IconButton aria-label="cerrar">
          <CloseIcon  />
        </IconButton> 
      </div>
      <TextField 
        value={comment} 
        onChange={handleChange} 
        multiline 
        variant="outlined"
        placeholder='Máx. 50 cáracteres'
        inputProps={{ maxLength: 50 }} // Añadido límite de caracteres
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => console.log(comment)}
      >
        Agregar Comentario
      </Button>
    </div>
  )
}

export default CommentModal