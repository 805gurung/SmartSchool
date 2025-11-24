import React, { useEffect, useState } from 'react'
import { verifyStudentEmail } from '../api/UserAPI'
import { useParams } from 'react-router-dom'

const VerifyStudentEmail = () => {
    let params = useParams()
    let token = params.token

    let [success, setSuccess]= useState('')
    let [error, setError]= useState('')

    useEffect(()=>{
        verifyStudentEmail(token)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setSuccess(data.message)
            }
        })
    }, [])

    const showError = ()=>{
        if(error){
            return <div className='bg-orange-400 text-center '>{error}</div>
        }
    }
    const showSuccess= ()=>{
        if(success){
            return <div className='bg-green-400 text-center'>{success}</div>
        }
    }



  return (
    <>
      {showError()}
      {showSuccess()}
    </>
  )
}

export default VerifyStudentEmail
