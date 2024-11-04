import React from 'react'
import { styleText } from 'util'
import style from './categorylist.module.css'
import { Typography } from '@mui/material'
import Image from 'next/image'

interface CategoryListProps {
  categories: any[]
  clickItem: (id: string) => void
  activeIndex: number
}

const CategoryList = ({categories, clickItem, activeIndex}: CategoryListProps ) => {
  const handleClick = (id: string, index: number) => {
    clickItem(id);
  };

  return (
    <div className={style.scrollableContainer}>
      {categories.map((category, i) => (
        <div
          className={`${style.categoryItem} ${activeIndex === i ? style.active : ''}`} // Aplicar clase activa
          key={i}
          onClick={() => handleClick(category.id, i)}
        >
          <div className={style.icon}>{category.icon}</div>
          <Image src={category.logo} alt={category.nombre} width={30} height={30} />
          <Typography variant='body2'>{category.nombre}</Typography>
        </div>
      ))}
    </div>
  );
}

export default CategoryList