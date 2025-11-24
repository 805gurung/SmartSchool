import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header';
import Sidebar from '../Sidebar'



const AdminLayout = () => {
    return (
        <div className="flex">
            
            <div className='w-[15%]'><Sidebar role='Admin' /></div>

            <main className='w-[85%]' >
            <Header />
            <Outlet />
            </main>

        </div>
    );
}

export default AdminLayout;
