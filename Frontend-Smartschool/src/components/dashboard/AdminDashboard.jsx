import React, { useEffect, useState } from 'react'
import { studentCount, teacherCount } from '../../api/UserAPI'
import EventsTable from '../tables/EventsTable'
import NoticesTable from '../tables/NoticesTable'

const AdminDashboard = () => {
  let[teacher,setTeacher]=useState(0)
  let[student,setStudent]=useState(0)

  useEffect(()=>{
    const fetchCounts=async()=>{
      const[teacherData,studentData]= await Promise.all([
         teacherCount(),
         studentCount()
       ])
       setTeacher(teacherData)
       setStudent(studentData)
      }

      fetchCounts()

    },[])
    

  return (
    < >
    <div className='flex gap-x-16'>
    <div className='left ml-9' >

      <div className='flex gap-x-8 m-8'>
        <div className='bg-orange-300 w-80 rounded-xl p-5 '>
          <img src='/teacher.svg' width={'70px'} className='mx-auto mb-3'/>
          <h2 className='text-center text-xl text-slate-800 mb-3'>Total Teachers</h2>
          <h1 className='text-center text-3xl text-slate-800'>{teacher}</h1>
        </div>
        <div className='bg-orange-300 w-80 rounded-lg p-5  '>
          <img src='/students.svg' width={'65px'} className='mx-auto mb-4 '/>
          <h2 className='text-center text-xl text-slate-800 mb-3'>Total Students</h2>
          <h1 className='text-center text-3xl text-slate-800'>{student}</h1>
        </div>
      </div>
      <div className='w-[90%] m-10'>
        <EventsTable showBtns={false} eventsList=''/>
      </div>

    </div>
    <div className='right w-[40%] '>
      <NoticesTable showBtns={false} noticesList=''/>
    </div>
    </div>

    </>
  )
}

export default AdminDashboard
