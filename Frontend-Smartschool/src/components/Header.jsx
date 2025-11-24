import React from 'react'

const Header = ({role}) => {
  const getTitle=()=>{
    switch(role){
      case 'Teacher':
        return 'Teacher Dashboard';
      case 'Student':
        return 'Student Dasboard';
      default:
        return 'Admin Dashboard';
    }
  }

  const getWelcomeMessage = () => {
    switch(role) {
      case 'Teacher':
        return 'Welcome to the teacher dashboard';
      case 'Student':
        return 'Welcome to the student dashboard';
      default:
        return 'Welcome to the admin dashboard';
    }
  }
  
  return (
    <>
      <div className='p-4 bg-white shadow-lg  '>
        <h1 className='text-3xl'>{getTitle()}</h1>
        <p className='text-xl text-green-500'>{getWelcomeMessage()}</p>
      </div>
    </>
  )
}

export default Header
