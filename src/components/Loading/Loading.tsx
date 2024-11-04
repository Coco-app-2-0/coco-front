import React from 'react';
import styles from './loading.module.css'; // Asegúrate de crear este archivo CSS

const Loading = () => {
  return (
    <div className={styles.spinner}></div>
  );
}

export default Loading;