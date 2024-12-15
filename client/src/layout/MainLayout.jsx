import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16'>
            <Outlet/>
        </div>
    </div>
  )
}