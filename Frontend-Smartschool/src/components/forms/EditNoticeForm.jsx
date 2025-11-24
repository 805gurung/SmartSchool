import React, {  useState } from 'react'
import { editNotice} from '../../api/NoticeEventAPI'

const EditNoticeForm = ({notice,onClose}) => {
    let [data,setData]= useState(notice)

    const handleChange =(e)=>{
        let{name,value}=e.target
        setData((prevNotice=>({
            ...prevNotice,
            [name]:value
        })))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        editNotice(notice._id,data)
        .then(onClose)
        .catch(error=>console.error('Error deleting notice:',error))

    }
  return (
    <>
        <form onSubmit={handleSubmit} className='flex justify-center'>
        <div className='w-1/3 shadow p-9 bg-slate-100 '>
          <h1 className='text-3xl font-medium'>Edit notice</h1>
          <div className='mt-4'><label className='text-xl'>Title</label><br />
            <input type='text' name='title' value={data.title || ''} onChange={handleChange}
              className="w-full border-2 my-4 py-1 px-3 font-light focus:outline-none focus:border-sky-500 focus:ring-1 text-sm" />
          </div>
          <div>
            <label>Published On</label><br />
            <input type='date' name='date' value={data.date || ''} onChange={handleChange}
              className="w-full border-2 my-4 py-1 px-3 font-light focus:outline-none focus:border-sky-500 focus:ring-1 text-sm " />
          </div>
          <div>
            <label>Description</label><br />
            <textarea  name='description' value={data.description || ''} onChange={handleChange}
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

export default EditNoticeForm
