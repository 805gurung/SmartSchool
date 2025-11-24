import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getStudentDetails,  updateStudent } from '../../api/UserAPI'

const UpdateStudents = () => {
 
  const {id} = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    student_username:"",
    Address: "",
    email:"",
    Phone:'',
    Grade:'',

  })

  const [success, setSuccess] = useState(false)
  useEffect(()=>{
    getStudentDetails(id)
    .then((data)=>{
      if(data.error){
        console.error("Error fetching students:", data.error )
        Swal.fire('Error', "Failed to fetch students", 'error')
      }

      else{
        setStudent(data)
      } 
      })
      
  }, [id])

  const handleChange = e =>{
   const {name, value} = e.target
   setStudent((prevStudent)=>({
    ...prevStudent,
    [name]: value,
   }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    updateStudent(student._id, student)
    .then((data)=>{
      if(data.error){
        console.log(data.error)
        setSuccess(false)
      }
      else{
        setSuccess(true)
        Swal.fire('Success', 'Student Updated successfully', 'success')
       
        setTimeout(()=>{
          navigate('/admin/students')
        }, 1000)
      }
    })
    .catch(error=>console.log("Error is "+ error))

  }

  return (
    <>
    <div className="w-full max-w-2xl mx-8 p-6 shadow-lg my-5">
      <h2 className="text-3xl font-semibold mb-6">Update Student</h2>
    
    
      {success === true && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>{success}</div>
      )
      }
      <form className="space-y-8" onSubmit={handleSubmit}>
        {['student_username', 'Address', "Phone", 'Grade', 'email'].map
     ((field) => (
      <div className="mb-4" key={field}>
        <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2 capitalize">
          {field}
        </label>
        <input
          id={field}
          type={field === "Phone" ? "tel" : "text"}
          name={field}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={student[field] || ''}
          required
        />
      </div>
    ))}
        

        <button type='submit'  className='bg-orange-400 rounded p-2 w-full text-white' >UPDATE</button>
        </form>
        </div>
  </>
  )
}

export default UpdateStudents
