import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../api/UserAPI'
import Swal from 'sweetalert2'

const StudentSignUp = () => {
  let [student, setStudent] = useState({})
  let [error, setError] = useState('')
  let [success, setSuccess]= useState(false)

  const handleChange = (e) =>{
    setStudent({...student, [e.target.name]:e.target.value})
    // console.log(student)
  }
  const handleSubmit = e =>{
    e.preventDefault() 
    register(student)
    .then(data=>{
      if(data.error){
        setError(data.error)
        setSuccess(false)
        // Swal.fire('Error', 'Registration failed', 'error')
      }
      else{
        setSuccess(true)
        setError('')
        setStudent({})
        Swal.fire('Success', 'Registration Successfull! Wait for your verification', 'success')
      }
      
    })
    
  }
  const showError = ()=>{
    if(error){
      return <div className='bg-red-400 text-center'>{error}</div>
    }
  }


  const showSuccess = ()=>{
    if(success){
      return <div className='bg-green-400 text-center'>User registered successfully. Go to <Link to='/studentlogin'>Login</Link>
      </div>
    }
  }


  return (
    <div>
        <div className="flex justify-center h-svh items-center">
        <form className="w-1/4 shadow-lg p-5 h-5/4">
          <h1 className="text-4xl text-center">Student Sign Up</h1>
         
          <hr />
          <p className="text-sm text-center mt-2">
            Welcome back! Please enter your details
          </p>
          <input
            type="text"
            name="student_username"
            placeholder="Enter your username *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm" onChange={handleChange}
          />
          <input
            type="text"
            name="school_name"
            placeholder="Enter your school name *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          />
              {/* <input
            type="text"
            name="Grade"
            placeholder="Enter your grade *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          /> */}
            <select name="Grade" placeholder='Select your Grade'   className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm" onChange={handleChange}>
                <option value="" disabled selected>Select Your Grade *</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>

              <input
            type="text"
            name="Address"
            placeholder="Enter your address *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          />
              <input
            type="text"
            name="Parent_name"
            placeholder="Enter your parent's name *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          />
              <input
            type="tel"
            name="Phone"
            placeholder="Enter your phone number *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange} maxLength={10}   
          />
           <input
            type="email"
            name="email"
            placeholder="Enter your email *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}

          />
        
          <input
            type="password"
            name="password"
            placeholder="Enter your password *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          />
          {/* <input
            type="text"
            name="role"
            placeholder="Enter your role *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          /> */}
          <br />
          <div className="flex justify-between">
            <div className="mt-3">
              <input type="checkbox" name="" className="ms-8" />
              <span className="ms-1 text-xs">Remember me</span>
            </div>
            {/* <div className="mt-3">
              <span className="text-orange-500 me-6">Forgot password?</span>
            </div> */}
          </div>
          <input
            type="submit"   
            value="Register"
            className="w-5/6 border-2 mt-5 py-1 px-3 text-center ms-8  text-white bg-orange-500 text-sm"
            onClick={handleSubmit}
          />
           {showError()}
           {showSuccess()}

          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <Link to={"/studentlogin"}>
              <span className="text-orange-500">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
      
    </div>
  )
}

export default StudentSignUp
