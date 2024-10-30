import NavInfo from '@/components/NavInfo/NavInfo'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <>
      <section>
        <NavInfo storeName="Arlequin" statusOpen={true} schedule={"00:10 - 23:59"} />

      </section>
    </>
  )
}

export default Home