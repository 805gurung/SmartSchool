import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { RiGraduationCapFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1 className='text-center text-4xl mt-10 font-normal mb-10' id='loginas'>Login</h1>

      <div className='mt-4 flex justify-center'>
      
      <Link to={'/adminlogin'}>
      <div className="box items-center bg-orange-500 w-64 me-8 p-4">
        <p className='text-4xl text-white mt-2 ms-24'>
        <FaUserCircle />
        </p>
        <p className='text-white text-center text-lg mt-2'>Admin</p>
        <p className='text-white text-sm text-center font-light mb-2'>Login as an administrator to access the dashboard to manage app data</p>
      </div>
      </Link>
      
      <Link to={'/studentlogin'}>
      <div className="box items-center bg-orange-500 w-64 me-8 p-4 ">
        <p className='text-4xl text-white mt-2 ms-24'>
        <FaUserGroup/>
        </p>
        <p className='text-lg text-white text-center mt-2'>Student</p>
        <p className='text-white text-sm text-center font-light mb-2'>Login as a student to explore materials and assignments</p>


      </div>
      </Link>

      <Link to={'/teacherlogin'}>
      <div className="box items-center bg-orange-500 w-64 p-4">
        <p className='text-4xl text-white mt-2 ms-24'>
        <RiGraduationCapFill/>
        </p>
        <p className='text-lg text-white text-center mt-2'>Teacher</p>
        <p className='text-white text-sm text-center font-light mb-2'>Login as a teacher to create courses, assignments and quizzes.</p>


      </div>
      </Link>

      </div>
      
    </div>
  )
}

export default Login
