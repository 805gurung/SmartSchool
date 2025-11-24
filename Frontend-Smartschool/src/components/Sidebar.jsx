import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx"
import { MdPeopleAlt, MdOutlineEvent } from "react-icons/md"
import { GiGraduateCap } from "react-icons/gi"
import { TbLogout2 } from "react-icons/tb"
import { IoPersonCircleOutline } from "react-icons/io5"
import { PiClipboardTextLight } from "react-icons/pi"
import { BsPersonVideo3 } from "react-icons/bs"
import { BsFileText } from "react-icons/bs"
import { MdAssignmentAdd } from "react-icons/md";
import { Signout } from '../api/UserAPI'

const Sidebar = ({role}) => {
  const navigate = useNavigate()
  const location = useLocation()

  // Define menu items with their paths
  const menuItems = {
    Admin:[
    { path: '/admin/dashboard', icon: <RxDashboard />, label: 'Dashboard' },
    { path: '/admin/students', icon: <MdPeopleAlt />, label: 'Students' },
    { path: '/admin/teachers', icon: <GiGraduateCap />, label: 'Teachers' },
    { path: '/admin/examroutines', icon: <BsFileText />, label: 'Exams' },
    { path: '/admin/results', icon: <BsPersonVideo3 />, label: 'Results' },
    { path: '/admin/notices', icon: <PiClipboardTextLight />, label: 'Notices' },
    {path:'/admin/events', icon:<MdOutlineEvent/>, label:'Events'}
  ],
    Teacher:[
      { path: '/teacher/dashboard', icon: <RxDashboard />, label: 'Dashboard' },
      { path: '/teacher/students', icon: <MdPeopleAlt />, label: 'Students' },
      { path: '/teacher/results', icon: <PiClipboardTextLight />, label: 'Results' },
      { path: '/teacher/assignments', icon: <MdAssignmentAdd/>, label: 'Assignments' },
      { path: '/teacher/examroutines', icon: <BsFileText />, label: 'Exams' },
    ],
    Student:[
      { path: '/student/dashboard', icon: <RxDashboard />, label: 'Dashboard' },
      { path: '/student/assignments', icon: <MdAssignmentAdd/>, label: 'Assignments' },
      { path: '/student/results', icon: <PiClipboardTextLight />, label: 'Results' },
      { path: '/student/examroutines', icon: <BsFileText />, label: 'Exams' },
    ]
  }

  const otherItems = [
    { path: `/${role.toLowerCase()}/profile`, icon: <IoPersonCircleOutline />, label: 'Profile' },
  ]

   const handleSignout=async()=>{
      await Signout()
      localStorage.removeItem('jwt')
      navigate('/')
    }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className='sidebar bg-orange-500 h-screen overflow-y-auto'>
      <div className='flex ml-3 pt-4'>
        <img src="/public/logo.svg" alt="logo" width={'80px'} />
        <span className='flex text-white text-3xl mt-6 mr-4'>SmartSchool</span>
      </div>

      <div>
        <ul className="space-y-3 font-normal text-2xl p-6 mt-8 ">
          <h5 className='text-white'>MENU</h5>
          
          {menuItems[role] && menuItems[role].map((item) => (
            <li 
              key={item.path}
              className={`hover:bg-orange-300 ${isActive(item.path) ? 'bg-orange-300' : ''}`}
            >
              <Link 
                to={item.path} 
                className="flex items-center p-2 px-10 text-white"
              >
                {item.icon}
                <span className="ms-3">{item.label}</span>
              </Link>
            </li>
          ))}

          <h5 className='text-white mt-6'>OTHER</h5>
          
          {otherItems.map((item) => (
            <li 
              key={item.path}
              className={`hover:bg-orange-300 ${isActive(item.path) ? 'bg-orange-300' : ''}`}
            >
              <Link 
                to={item.path} 
                className="flex items-center p-2 text-white"
              >
                {item.icon}
                <span className="ms-3">{item.label}</span>
              </Link>
            </li>
          ))}

          <li className='hover:bg-orange-300'>
            <a href="/" className="flex items-center p-2 text-white">
              <TbLogout2 />
              <button onClick={handleSignout} className='ms-3'>Logout</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar