import React, { useEffect, useState } from 'react'
import { getCategories, getCategoryById } from '../apis/store/categories'

const useStoreInfo = () => {

  const [ categories, setCategories ] = useState<any[]>([])
  const [ clients, setClients ] = useState<any[]>([])
  const [ category, setCategory ] = useState<any>()
  const [ loadingCategories, setLoadingCategories ] = useState<boolean>(false)
  const [ loadingClients, setLoadingClients ] = useState<boolean>(false)
  const [ loadingCategory, setLoadingCategory ] = useState<boolean>(false)


  const getCategoriesData = async (idTienda: number) => {
    setLoadingCategories(true)
    try {
      const res = await getCategories(idTienda)
      if (res.success) {
        setCategories(res.data)
        setLoadingCategories(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    categories,
    clients,
    category,
    loadingCategories,
    loadingClients,
    loadingCategory,
    getCategoriesData
  }
}

export default useStoreInfo