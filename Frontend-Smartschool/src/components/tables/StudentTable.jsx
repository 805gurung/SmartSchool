import React, { useEffect, useState } from 'react';
import { deleteStudent, getAllStudents, isauthenticated } from '../../api/UserAPI';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const StudentTable = () => {
  let [students, setStudents] = useState([]);
  const {token} = isauthenticated()
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getAllStudents()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        else {
          setStudents(data);
        }
      });
  }, [success]);

  const handleDelete = id => e =>{
    e.preventDefault()
    Swal.fire({
      title: "Alert",
      text: 'Are you sure you want to delete this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    })
    .then(result=>{
      if(result.isConfirmed){
        deleteStudent(id,token)
        .then(data=>{
          if(data.error){
            Swal.fire("Warning", data.error, "error")
          }
          else{
              setSuccess(prev => !prev)
              Swal.fire('Success', 'Student deleted successfully', 'success')
          }
        })
        .catch(error=>{
          console.log("Delete failed:", error)
          Swal.fire("Error", "Failed to delete student", 'error')
        })
      }else{
        Swal.fire('Cancelled', 'Action cancelled', 'info')
      }
    })
  }

  const filteredStudents = students.filter(student=>
    student.student_username.toLowerCase().includes(search.toLowerCase()) ||
    student.Grade.toLowerCase().includes(search.toLowerCase()) ||
    student.Address.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">All Students</h3>
        <div className="w-full md:w-auto">
          <input
            type="search"
            placeholder="Search students"
            className="w-full md:w-64 border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="min-w-full overflow-hidden ">
          <div className="border-collapse max-h-[75vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="border px-6 py-3 text-left  text-md font-medium">S.NO</th>
                  <th className="border px-6 py-3 text-left text-md font-medium">Student Username</th>
                  <th className="border px-6 py-3 text-left text-md font-medium">Email</th>
                  <th className="border px-6 py-3 text-left text-md font-medium ">Grade</th>
                  <th className="border px-6 py-3 text-left text-md font-medium ">Phone</th>
                  <th className="border px-6 py-3 text-left text-md font-medium ">Address</th>
                  <th className="border px-6 py-3 text-center text-md font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                filteredStudents.length > 0 ?( 
                filteredStudents.map((student, i) => (
                  <tr
                    key={student._id}
                    className="hover:bg-orange-400 transition-colors even:bg-gray-50 cursor-pointer"
                  >
                    <td className="border px-6 py-4 whitespace-nowrap">{i + 1}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{student.student_username}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{student.email}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{student.Grade}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{student.Phone}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{student.Address}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                       <Link to={`/admin/students/updatestudent/${student._id}`}> <button className="p-3 rounded bg-yellow-500 hover:bg-yellow-600 transition-colors text-white" >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        </Link>
                        <button className="p-2 rounded bg-red-500 hover:bg-red-600 transition-colors text-white" onClick={handleDelete(student._id)}>
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
            )
          ) :(
            <tr>
            <td colSpan={"6"} className='text-center py-6'></td>No students found</tr>
          )
       }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;