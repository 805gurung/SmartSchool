import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Header from '../Header';

const StudentLayout = () => {
    return (
        <div className="flex">
            
            <div className='w-[15%]'><Sidebar role='Student' /></div>

            <main className='w-[85%]' >
            <Header role='Student'/>
            <Outlet/>
            </main>

        </div>
    );
}

export default StudentLayout
