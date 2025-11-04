import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import { Heart } from 'lucide-react'

const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <div className=' max-w-7xl mx-auto'>
          <main className='min-h-screen container '>
          <Header/>
          <Outlet/>
        </main>
        </div>
        
        <div className=' p-10 text-center bg-gray-800 mt-10'>Heartcoded by Vibhas❤</div> 
    </div>
  )
}

export default AppLayout