import React from 'react'
import { useNavigate } from 'react-router-dom'

const ClassesTable = () => {
  const navigate = useNavigate()
  const handleGradeClick=(grade)=>{
    navigate(`/grade/${grade}/results`)
  }
  return (
    <>
    <h1 className='text-center text-4xl font-bold text-orange-500 mt-28 mb-10'>Results</h1>
     <div className='flex gap-9 justify-center flex-wrap mx-auto max-w-5xl'>
      {
        ['1','2','3','4','5','6','7','8','9','10'].map((grade)=>(
      <div key={grade} 
      onClick={()=>handleGradeClick(grade)} 
      className='bg-orange-500 text-white p-3 text-2xl w-40 text-center rounded-lg cursor-pointer'>
        Grade-{grade}
      </div>
        ))
      }
     </div>
    </>
  )
}


export default ClassesTable
