import React from 'react'
import EventsTable from '../tables/EventsTable'
import NoticesTable from '../tables/NoticesTable'

const StudentDashboard = () => {
  return (
    <div>

        <div className='flex gap-x-14 mx-9'>

          <div className='w-3/5'>
            <EventsTable showBtns={false} eventsList='' />
          </div>


          <div className='w-4/5'>
            <NoticesTable showBtns={false} noticesList='' />
          </div>

        </div>


    </div>
  )
}


export default StudentDashboard
