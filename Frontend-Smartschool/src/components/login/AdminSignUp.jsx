import React, { useState } from "react";
import { Link } from "react-router-dom";
import { adminRegister } from "../../api/UserAPI";

const AdminSignUp = () => {
  let [admin,setAdmin]=useState({})
  let [error,setError]= useState('')
  let [success, setSuccess]= useState(false)

  const handleChange = (e) =>{
   setAdmin({...admin, [e.target.name]: e.target.value} )
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    adminRegister(admin)
    .then(data=>{
      if(data.error){
        setError(data.error)
        setSuccess(false)
      }else{
        setSuccess(true)
        setError('')
      }
    })
  }

  const showSuccess = ()=>{
    if(success){
      return<div className="bg-green-600 text-white text-center">Admin registered successfully. Go to <h2 className="hover:text-blue-200 "> <Link to={'/'} className="underline-offset-4">Home</Link></h2></div>
    }
  }
  const showError = ()=>{
    if(error){
      return<div className="bg-red-600 text-white text-center">{error}</div>
    }
  }

  return (
    <div>
      <div className="flex justify-center h-svh items-center">
        <form className="w-1/4 shadow-lg p-5 h-4/6">
          <h1 className="text-4xl text-center">Admin Sign Up</h1>
          <p className="text-sm text-center mt-2">
            Welcome back! Please enter your details
          </p>
          <input
            type="text"
            name="name"
            placeholder="Enter your name *"
            className="w-5/6 border-2 mt-4 py-1 px-3 font-light ms-8 focus:outline-none focus:border-sky-500 focus:ring-1 text-sm"
            onChange={handleChange}
          />
          <input
            type="text"
            name="schoolName"
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
            type="text"
            name="role"
            placeholder="Enter your role *"
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
            value="submit"
            className="w-5/6 border-2 mt-10 py-1 px-3 text-center ms-8 cursor-pointer  text-white bg-orange-500 text-sm"
            onClick={handleSubmit}
          />
          {showSuccess()}
          {showError()}
          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <Link to={"/adminlogin"}>
              <span className="text-orange-500">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
