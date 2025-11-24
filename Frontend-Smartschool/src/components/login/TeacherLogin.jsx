import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isauthenticated, authenticate, loginteacher } from '../../api/UserAPI'


const TeacherLogin = () => {

  let [teacher, setTeacher] = useState({})
  let [error, setError] = useState('')
  let [success, setSuccess] = useState(false)

  let navigate = useNavigate()

  const handleChange = e => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value })
    // console.log(teacher)
  }

  const handleSubmit = e => {
    e.preventDefault()
    loginteacher(teacher)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setSuccess(false)

        } else {
          setSuccess(true)
          authenticate(data)
          setError('')
        }

      })
  }

  const showError = () => {
    if (error) {
      return <div className='text-center text-red-600 h-3'>{error}</div>
    }
  }

  const redirect = () => {
    if (success) {
      isauthenticated() &&
      isauthenticated().teacher.role === 'Teacher'? navigate('/teacher/dashboard') : navigate('/')
    }
  }
  return (
    <div>
      <div className="flex justify-center h-svh items-center">
        <form className="w-1/4 shadow-lg p-5 h-4/6">
          <h1 className="text-4xl text-center">Teacher Login</h1>
          <p className="text-sm text-center mt-2">
  
          </p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email*"
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
            value="login"
            className="w-5/6 border-2 mt-10 py-1 px-3 text-center ms-8  text-white bg-orange-500 text-sm"
            onClick={handleSubmit}
          />
            {showError()}
            {redirect()}


          <p className="text-sm mt-2 text-center">Don't you have an account? <Link to={'/teachersignup'}><span className="text-orange-500">Sign up</span></Link></p>


        </form>
      </div>
    </div>
  )
}

export default TeacherLogin
