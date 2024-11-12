import { Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import styles from './commentModal.module.css'
import CloseIcon from '@mui/icons-material/Close';

interface CommentModalProps {
  comment: string;
  setComment: (comments: string) => void;
  onCloseModal: (close: boolean) => void;
}

const CommentModal = ({ comment, setComment, onCloseModal }: CommentModalProps) => {
  const [error, setError] = useState<string>(''); // Estado para manejar el error

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(event.target.value);
    setError(''); // Limpiar el error al cambiar el input
  }

  const handleSubmit = () => {
    if (!comment.trim()) { // Validación para campo vacío
      setError('El comentario no puede estar vacío');
      return;
    }
    onCloseModal(false); // Cerrar modal si hay comentario
  }

  return (
    <div className={styles.commentsCard} >
      <div className={styles.titleComments}>
        <Typography sx={{fontFamily: 'Inter', fontWeight: 700, }} >
          Añade un comentario
        </Typography>
        <IconButton aria-label="cerrar" onClick={() => onCloseModal(false)}>
          <CloseIcon  />
        </IconButton> 
      </div>
      <TextField 
        value={comment} 
        onChange={handleChange} 
        multiline
        rows={7}
        variant="outlined"
        placeholder='Máx. 50 cáracteres'
        sx={{width:'100%'}}
        inputProps={{ maxLength: 50 }} 
        error={!!error} // Mostrar error si existe
        helperText={error} // Mensaje de error
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        onClick={handleSubmit} // Cambiado a handleSubmit
      >
        Agregar Comentario
      </Button>
    </div>
  )
}

export default CommentModal