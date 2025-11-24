import React, { useState } from 'react'

const AddEventForm = ({onClose,onSubmit}) => {
    let[date,setDate]=useState('')
    let[title,setTitle]=useState('')
    let[description,setDescription]=useState('')
    
    const handleInputChange =(e)=>{
        setDescription(e.target.value)
        e.target.style.height='auto'
        e.target.style.height=e.target.scrollHeight+'px'
    }

    const handleFormSubmit =(e)=>{
        e.preventDefault()
        onSubmit({date,title,description})
        .then(onClose)
    }
   
    
  return (
    <>
      <form onSubmit={handleFormSubmit}  className='flex justify-center'>
      <div className='w-1/3 shadow p-9 bg-slate-100 '>

      <h1 className='text-3xl font-medium'>Add a new event</h1>
          <div>
            <label className='mt-4'>Event Date</label><br />
            <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 my-4 py-1 px-3 font-light focus:outline-none focus:border-sky-500 focus:ring-1 text-sm " />
          </div>

          <div ><label className='text-xl'>Title</label><br />
            <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 my-4 py-1 px-3 font-light focus:outline-none focus:border-sky-500 focus:ring-1 text-sm" />
          </div>
          
          <div>
            <label>Description</label><br />
            <textarea  name='description' value={description} onChange={handleInputChange}
            className="w-full border-2 my-4 py-1 px-3 font-light focus:outline-none focus:border-sky-500 focus:ring-1 text-sm overflow-hidden" />
          </div>
          <div className='flex justify-center gap-8 my-5'>
            <button className='bg-orange-500 text-white p-2 px-7 rounded-2xl' type='submit'>Publish</button>
            <button type='button' className='bg-gray-500 text-white p-2 px-7 ml-2 rounded-2xl' onClick={onClose}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddEventForm
