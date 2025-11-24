import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { addNotice, deleteNotice, getAllNotices } from '../../api/NoticeEventAPI';
import AddNoticeForm from '../forms/AddNoticeForm';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditNoticeForm from '../forms/EditNoticeForm';
const NoticesTable = ({ showBtns=true , noticesList=' w-2/3 mx-auto'}) => {
  let [showForm, setShowForm] = useState(false)
  let [selectedNoticeId, setselectedNoticeId] = useState(false)
  let [notices, setNotices] = useState([])

  const fetchallNotices = () => {
    getAllNotices()
      .then(data => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setNotices(data)
      })
      .catch(error => console.error('Error fetching notices:', error))
  }

  useEffect(() => {
    fetchallNotices()
  }, [])

  const handleNoticeSubmit = (data) => {
    return addNotice(data)
      .then(fetchallNotices)
      .catch(error => console.error('Error fetching notices:', error))
  }
  const handleAddClick = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleDelete = (id) => {
    deleteNotice(id)
      .then(fetchallNotices)
      .catch(error => console.error('Error deleting notice:', error))
  }

  const handleEditClick = (id) => {
    setselectedNoticeId(id)
  }


  return (
    <>

      <div className='flex justify-between p-4'>
        <h1 className='text-2xl font-medium'>All Notices</h1>

        {showBtns && <button className='bg-orange-500 text-white rounded-3xl p-1 px-5 ' onClick={handleAddClick}>
          <div className='flex justify-center items-center text-2xl '>Add <IoMdAdd /></div>
        </button>}

      </div>
      {showForm &&
        <AddNoticeForm
          onSubmit={handleNoticeSubmit}
          onClose={handleCloseForm}
        />}
      <div className={noticesList}>
        {
          notices.map((notice, index) => (
            <div key={index}>
              {
                showBtns && <div className='flex justify-end'>
                  <button className='bg-green-500 text-white py-1 px-3 text-2xl'
                    onClick={() => { handleEditClick(notice._id) }}><FaRegEdit /></button>
                  <button className='bg-red-600 text-white p-1 text-2xl py-1 px-3 '
                    onClick={() => { handleDelete(notice._id) }}><RiDeleteBin6Line /></button>
                </div>
              }

              <div className="notice-card border rounded shadow p-4 mb-4 text-center px-20 py-8">
                <h2 className="text-xl font-bold">{notice.title}</h2>
                <p className="text-sm text-gray-400">{new Date(notice.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{notice.description}</p>
              </div>
              {selectedNoticeId == notice._id &&
                <EditNoticeForm
                  // noticeId={selectedNoticeId}
                  notice={notice}
                  onClose={() => {
                    setselectedNoticeId(null)
                    fetchallNotices()
                  }}
                />}
            </div>
          ))

        }


      </div>
    </>
  )
}

export default NoticesTable
// notice.date: This refers to the date value from the notice object. It's assumed to be a string representing a date.
// new Date(notice.date): This converts the date string into a JavaScript Date object.

// .toLocaleDateString(): This method formats the Date object into a human-readable date string based on the user's locale (e.g., MM/DD/YYYY or DD/MM/YYYY).