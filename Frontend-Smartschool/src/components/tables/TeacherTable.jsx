import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { deleteteacher, getteachers } from '../../api/TeacherAPI'
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import Swal from 'sweetalert2'
import { isauthenticated } from '../../api/UserAPI'

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const { token } = isauthenticated()
  const [success, setSuccess] = useState(false)

  const fetchTeachers = () => {
    getteachers()
      .then((data) => {
        if (data.error) {
          console.error("Error fetching teachers:", data.error)
          Swal.fire('Error', 'Failed to fetch teachers', 'error')
        } else {
          setTeachers(data)
        }
      })
      .catch(error => {
        console.error("Failed to fetch teachers:", error)
        Swal.fire('Error', 'Failed to fetch teachers', 'error')
      })
  }

  useEffect(() => {
    fetchTeachers()
  }, [success]) // Re-fetch when success state changes

  const handleDelete = id => e => {
    e.preventDefault()
    Swal.fire({
      title: "Alert",
      text: 'Are you sure you want to delete this teacher?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    })
    .then(result => {
      if (result.isConfirmed) {
        deleteteacher(id, token)
          .then(data => {
            if (data.error) {
              Swal.fire('Warning', data.error, 'error')
            } else {
              setSuccess(prev => !prev) // Toggle success to trigger re-fetch
              Swal.fire('Success', 'Teacher deleted successfully.', 'success')
            }
          })
          .catch(error => {
            console.error("Delete failed:", error)
            Swal.fire('Error', 'Failed to delete teacher', 'error')
          })
      } else {
        Swal.fire('Cancelled', 'Action cancelled', 'info')
      }
    })
  }

  const filteredTeachers = teachers.filter(teacher => 
    teacher.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-2xl font-semibold'>All Teachers</h3>
        <div className='flex gap-3'>
          <input
            type="search"
            placeholder='Search teachers...'
            className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <Link to="/admin/teachers/add">
            <button className='bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors'>
              Add Teacher +
            </button>
          </Link> */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className='min-w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='border p-3 text-left'>Name</th>
              <th className='border p-3 text-left'>Address</th>
              <th className='border p-3 text-left'>Subjects</th>
              <th className='border p-3 text-left'>Phone Number</th>
              <th className='border p-3 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr key={teacher._id} className='hover:bg-gray-50'>
                  <td className='border p-3'>{teacher.username}</td>
                  <td className='border p-3'>{teacher.address}</td>
                  <td className='border p-3'>{teacher.subject}</td>
                  <td className='border p-3'>{teacher.phone}</td>
                  <td className='border p-3'>
                    <div className='flex justify-center gap-2'>
                      <Link to={`/admin/teachers/update/${teacher._id}`}>
                        <button className='p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'>
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        className='p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
                        onClick={handleDelete(teacher._id)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeacherTable

