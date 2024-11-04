import React from 'react'
import { styleText } from 'util'
import style from './categorylist.module.css'
import { Typography } from '@mui/material'
import Image from 'next/image'

interface CategoryListProps {
  categories: any[]
  clickItem: (id: string, index:number) => void
  activeIndex: number
}

const CategoryList = ({categories, clickItem, activeIndex}: CategoryListProps ) => {
  const handleClick = (id: string, index: number) => {
    clickItem(id, index);
  };

  return (
    <div className={style.scrollableContainer}>
      {categories.map((category, i) => (
        <div
          className={`${style.categoryItem} ${activeIndex === i ? style.active : ''}`} // Aplicar clase activa
          key={i}
          onClick={() => handleClick(category.id, i)}
        >
          <Image 
            src={category.logo} 
            alt={category.nombre}
            width={30} height={30} 
            className={ activeIndex === i ? style.iconCategoryActive : ''}
            />
          <Typography variant='body2' sx={{
            color: activeIndex === i ? '#ffffff' : '#000000'
          }}>{category.nombre}</Typography>
        </div>
      ))}
    </div>
  );
}

export default CategoryList