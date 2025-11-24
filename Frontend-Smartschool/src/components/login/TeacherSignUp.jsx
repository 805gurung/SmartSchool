import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerteacher } from '../../api/UserAPI'

const TeacherSignUp = () => {

  let [user, setUser] = useState({})
  let [error, setError] = useState('')
  let [success, setSuccess] = useState(false)

  const handleChange = e =>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log(user)

  }

  const handleSubmit = e =>{
    e.preventDefault()
    registerteacher(user)
    .then(data=>{
      if(data.error){
        setError(data.error)
        setSuccess(false)
        
      }
      else{
        setSuccess(true)
        setError('')
      }
    })
  }

  const showSuccess = () =>{
    if(success){
      return <div className='text-green-600 text-center h-3'>Registered successfully. Goto<Link to='/'>Home page</Link></div>
    }
  }

  const showError = () =>{
    if(error){
      return <div className='text-red-600 text-center h-3'>{error}</div>
    }
  }


  return (
    <div>
        <div className="flex justify-center h-svh items-center">
        <form className="w-1/4 shadow-lg p-5">
          <h1 className="text-4xl text-center">Teacher Sign Up</h1>
          {showSuccess()}
          {showError()}
          <p className="text-sm text-center mt-2">
            Welcome back! Please enter your details
          </p>
          <input
            type="text"
            name="username"
            placeholder="Enter your name *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          />
          <input
            type="text"
            name="schoolname"
            placeholder="Enter your school name *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}

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
          
          <input
            type="number"
            name="phone"
            placeholder="Enter your phone no *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}

          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}

          />
          <input
            type="text"
            name="role"
            placeholder="Enter your role *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}

          />
          <input
            type="text"
            name="subject"
            placeholder="Enter your subject *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}

          />
          <br />
          <div className="flex justify-between">
            <div className="mt-3">
              <input type="checkbox" name="" className="ms-8" />
              <span className="ms-1 text-xs ">Remember me</span>
            </div>
            {/* <div className="mt-3">
              <span className="text-orange-500 me-6">Forgot password?</span>
            </div> */}
          </div>
          <input
            type="submit"
            name="submit"
            value="Register"
            className="w-5/6 border-2 mt-10 py-1 px-3 text-center ms-8  text-white bg-orange-500 text-sm"
            onClick={handleSubmit}

          />  

          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <Link to={"/teacherlogin"}>
              <span className="text-orange-500">Sign in</span>
            </Link>
          </p>
        </form>
      </div>

      
    </div>
  )
}

export default TeacherSignUp
