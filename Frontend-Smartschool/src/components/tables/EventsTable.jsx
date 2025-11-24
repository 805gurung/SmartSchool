import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import AddEventForm from '../forms/AddEventForm';
import { addEvent, allEvents, deleteEvent } from '../../api/NoticeEventAPI';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditEventForm from '../forms/EditEventForm';
import Swal from 'sweetalert2';

const EventsTable = ({showBtns=true,eventsList='w-2/3 mx-auto'}) => {
  let [showForm, setShowForm] = useState(false)
  let [showEditForm, setShowEditForm] = useState(false)
  let[selectedEventId, setSelectedEventId]=useState('')
  let [events, setEvents] = useState([])

  const fetchallEvents = () => {
    allEvents()
      .then(data => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setEvents(data)
      })
      .catch(error => console.log('Error fetching events:', error.message))
  }

  useEffect(() => {
    fetchallEvents()
  }, [])

  const handleEventSubmit = (data) => {
    return addEvent(data)
      .then(fetchallEvents)
      .catch(error => console.log('Error fetching events:', error.message))
  }
  const handleAddClick = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleEditClick=(id)=>{
    setSelectedEventId(id)
  }

  const handleDelete=(id)=>{

    
    deleteEvent(id)
    .then(fetchallEvents)
    .catch(error => console.log('Error deleting event:', error.message))
  }


  return (
    <>
      <div className='flex justify-between p-4'>
        <div className='text-2xl font-medium'>All Events</div>
        {
          showBtns && <button className='bg-orange-500 text-white rounded-3xl p-1 px-5 ' >
          <div className='flex justify-center items-center text-2xl ' onClick={handleAddClick}>Add <IoMdAdd /></div>
        </button>
        }
        
      </div>
      <div className={eventsList}>
      {
        showForm &&
        <AddEventForm onClose={handleCloseForm} onSubmit={handleEventSubmit} />
      }
      {
        events.map((event, index) => (
          <div key={index}>
            {
              showBtns && <div className='flex justify-end'>
              <button className='bg-green-500 text-white py-1 px-3 text-2xl'
               onClick={()=>{handleEditClick(event._id)}} ><FaRegEdit /></button>
              <button className='bg-red-600 text-white p-1 text-2xl py-1 px-3 '
               onClick={()=>{handleDelete(event._id)}} ><RiDeleteBin6Line /></button>
            </div>
            }
           
            <div className="event-card border rounded shadow p-4 mb-4  px-20 py-8">
              <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
            </div>

            {
              selectedEventId == event._id &&
              <EditEventForm 
              event={event} 
              onClose={()=>{
                setSelectedEventId(null)
                fetchallEvents()
              }}/>
            }

          </div>
        ))
      }
      </div>
    </>
  )
}
      


export default EventsTable