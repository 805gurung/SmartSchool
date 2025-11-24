import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, login,isauthenticated } from '../../api/UserAPI'

const StudentLogin = () => {
  let [student, setStudent] = useState({})
  let [error, setError] = useState('')
  let [success, setSuccess]= useState(false)

  let navigate = useNavigate()

  const handleChange = e =>{
    setStudent({...student, [e.target.name]: e.target.value})
  }

  const handleSubmit = e=>{
        e.preventDefault()
          login(student)
          .then(data=>{
            if(data.error){
              setError(data.error)
              setSuccess(false)
            }
            else{
              authenticate(data)
              setSuccess(true)
              setError('')
              setStudent({})
            }
          })
  }
  const showError = ()=>{
    if(error){
      return <div className='bg-orange-400 h3 text-center'>{error}</div>
    }
  }

  const redirect = () =>{
     if(success){
       isauthenticated()&&
       isauthenticated().user?.role === 'Student' ? navigate('/student/dashboard') : navigate('/')
     }
   }



  return (
    <div>
      <div className="flex justify-center h-svh items-center">
        <form className="w-1/4 shadow-lg p-5 h-4/6">
          <h1 className="text-4xl text-center">Student Login</h1>
          {/* {showError()} */}
          {redirect()}
          <hr />
          <p className="text-sm text-center mt-2">
            Welcome back! Please enter your details
          </p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email*"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm" onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm" onChange={handleChange}
          />
          <br />
          <div className="flex justify-between">
            <div className="mt-3">
              <input type="checkbox" name="" className="ms-8" />
              <span className="ms-1 text-xs ">Remember me</span>
            </div>
            <div className="mt-3">
              <span className="text-orange-500 me-6">Forgot password?</span>
            </div>
          </div>
          <input
            type="submit"
            name="email"
            value="Login"
            className="w-5/6 border-2 mt-10 py-1 px-3 text-center ms-8  text-white bg-orange-500 text-sm" onClick={handleSubmit}
          />
              {showError()}
              {redirect()}

          <p className="text-sm mt-2 text-center">Don't you have an account? <Link to={'/studentsignup'}><span className="text-orange-500">Sign up</span></Link></p>


          
        </form>
      </div>
    </div>
  )
}

export default StudentLogin
