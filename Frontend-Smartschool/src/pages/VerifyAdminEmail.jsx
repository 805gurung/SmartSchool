import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { verifyEmail } from '../api/UserAPI'

const VerifyAdminEmail = () => {
  let params = useParams()
  let token = params.token

  let[success,setSuccess]=useState('')
  let[error,setError]=useState('')

  useEffect(()=>{
    verifyEmail(token)
    .then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setSuccess(data.message)
      }
    })
  },[])

  const showError =()=>{
    if(error){
      return <div className='bg-red-400 text-center h3'>{error}</div>
    }
  }
  const showSuccess =()=>{
    if(success){
      return <div className='bg-green-400 text-center h3'>{success}</div>
    }
  }


  return (
   <div>
    {showError()}
    {showSuccess()}
   </div>
  )
}

export default VerifyAdminEmail
