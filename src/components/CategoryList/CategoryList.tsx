import React from 'react'
import style from './categorylist.module.css'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { CategoryTypes } from '@/utils/types'

interface CategoryListProps {
  categories: CategoryTypes[]
  clickItem: (id: number, index:number) => void
  activeIndex: number
}

const CategoryList = ({categories, clickItem, activeIndex}: CategoryListProps ) => {
  const handleClick = (id: number, index: number) => {
    clickItem(id, index);
  };

  return (
    <div className={style.scrollableContainer}>
      {categories.map((category, i) => (
        <div
          className={`${style.categoryItem} ${activeIndex === i ? style.active : ''}`} // Aplicar clase activa
          key={category.id}
          onClick={() => handleClick(category.id, i)}
        >
          <Image 
            src={category.logo} 
            alt={category.nombre}
            width={30} height={30} 
            className={ activeIndex === i ? style.iconCategoryActive : ''}
            />
          <Typography variant='body2' sx={{
            color: activeIndex === i ? '#ffffff' : '#000000',
            fontWeight: activeIndex === i ? 700 : 400, textAlign: 'center'
          }}>{category.nombre}</Typography>
        </div>
      ))}
    </div>
  );
}

export default CategoryList