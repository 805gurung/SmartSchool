import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { addexam } from '../../api/ExamApi'

const AddExam = () => {

    const [exam, setExam] = useState({
        classroom: '10', // Initial value for select
        date: '',
        routine: null
    })

    const [success, setSuccess] = useState("")  // Using string for success message

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "routine") {
            setExam({ ...exam, [name]: files[0] })  // Handling file upload
        } else {
            setExam({ ...exam, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('classroom', exam.classroom)
        formData.append('date', exam.date)
        formData.append('routine', exam.routine)

        addexam(formData)
            .then((data) => {
                if (data.error) {
                    Swal.fire('Error', data.error, 'error')
                } else {
                    setSuccess(true)
                    Swal.fire('Success',"exam added successfully", 'success')
                    // Reset form after success
                    setExam({
                        classroom: '10',
                        date: '',
                        routine: null
                    })
                }
            })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='border-2 border-gray-200 py-4 px-6' onSubmit={handleSubmit}>
            {success && <p className='text-green-600'>{success}</p>}

                <h1 className='mb-5 text-2xl text-center'>Exam Notice</h1>

                <div className='mb-3'>
                    <label htmlFor="classroom">Class: </label>
                    <select
                        name="classroom"
                        id="classroom"
                        onChange={handleChange}
                        value={exam.classroom}
                        required
                        className='border py-2 px-4 ms-2'
                    >
                        
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                        <option value="7">7</option>
                        <option value="6">6</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <label htmlFor="date">Published On: </label>
                    <input
                        type="date"
                        onChange={handleChange}
                        value={exam.date}
                        name="date"
                        id="date"
                        className='border py-2 px-4'
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor="routine">Upload a file: </label>
                    <input
                        type="file"
                        onChange={handleChange}
                        name="routine"
                        id="routine"
                        required
                    />
                </div>

                <button
                    className='bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors'
                    type='submit'
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddExam
