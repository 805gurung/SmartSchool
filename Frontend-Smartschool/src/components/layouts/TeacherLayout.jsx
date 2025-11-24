import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Header from '../Header';

const TeacherLayout = () => {
    return (
        <div className="flex">
            
            <div className='w-[15%]'><Sidebar role='Teacher' /></div>

            <main className='w-[85%]' >
            <Header role='Teacher'/>
            <Outlet/>
            </main>

        </div>
    );
}

export default TeacherLayout
