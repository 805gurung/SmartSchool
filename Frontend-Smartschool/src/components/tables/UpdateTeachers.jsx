import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getteacherdetails, updateteacher } from "../../api/TeacherAPI";
import { isauthenticated } from "../../api/UserAPI";

const UpdateTeachers = () => {
  
  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    username: "",
    address: "",
    subject: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getteacherdetails(id).then((data) => {
      if (data.error) {
        console.error("Error fetching teacher:", data.error);
        Swal.fire('Error', 'Failed to fetch teacher details', 'error');
      } else {
        setTeacher(data);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    updateteacher(teacher._id,teacher)
    .then((data)=>{
      if(data.error){
        console.log(data.error)
        setSuccess(false)
      }
      else{
        setSuccess(true)
        Swal.fire('Success','Updated successfully','success')

      }

    })
    .catch(error=>console.error("Error is "+ error))
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-center text-3xl my-6 font-bold">Update Teacher</h1>
      {/* {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )} */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {["username", "address", "subject", "phone"].map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {field}
            </label>
            <input
              id={field}
              type={field === "phone" ? "tel" : "text"}
              name={field}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={teacher[field] || ''}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
        
};


export default UpdateTeachers;