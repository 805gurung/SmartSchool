import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchStudentsByGrade } from '../../api/UserAPI'
import { addResult, deleteResult, fetchallResults } from '../../api/ResultsAPI'
import { RiDeleteBin6Line } from "react-icons/ri";

const MarksEntry = () => {
    const { grade } = useParams()
    let [results, setResults] = useState([])
    let [subjects, setSubjects] = useState([{ marks: '' }])
    let [students, setStudents] = useState([])
    let[totalMarks,setTotalMarks]=useState(0)
    let[selectedStudent,setSelectedStudent]=useState('')

    const allResults = ()=>{
        fetchallResults(grade)
        .then((data)=>setResults(data))
        .catch(error => console.log('Error fetching results:', error.message))
    }

    useEffect(() => {
        const fetchData = async () => {
            const studentData = await fetchStudentsByGrade(grade)
            console.log("Fetched Students:", studentData); 
            setStudents(studentData)

            allResults()
        };
        fetchData();
    }, [grade])

    const addSubject =()=>{
        setSubjects([...subjects,{name:'',marks:0}])
    }

    const handleSubjectChange=(index,field,value)=>{
        const updatedSubjects=[...subjects]
        updatedSubjects[index][field]= field ==='marks' ? Number(value):value
        setSubjects(updatedSubjects)

        const newTotal = updatedSubjects.reduce((sum,subject)=>sum+subject.marks,0)
        setTotalMarks(newTotal)
    }
    const resetForm = () => {
        setSelectedStudent('');
        setTotalMarks(0);
        setSubjects(subjects.map(subject => ({ ...subject, marks: 0 })));
    };
    const calculateGPA = (percentage) => {
        if (percentage >= 90) return 4.0;
        if (percentage >= 80) return 3.6;
        if (percentage >= 70) return 3.2;
        if (percentage >= 60) return 2.8;
        if (percentage >= 50) return 2.4;
        if (percentage >= 40) return 2.0;
        return 1.0;
    };

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!selectedStudent) return alert('Please select a student!')
        if(subjects.length==0) return alert('Please add atleast one subject!')
   
            const maxMarks = subjects.length * 100;
            const percentage = (totalMarks / maxMarks) * 100;
            const GPA = calculateGPA(percentage);

            const response = await addResult({
                studentID:selectedStudent,
                grade, subjects, totalMarks, GPA
            })
            
            .then(allResults)

        }
    
    const handleDelete = (id) =>{
        deleteResult(id)
        .then(allResults)
        .catch(error => console.log('Error deleting result:', error.message))
    }


    return (
        <>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-orange-500 mb-5">
                    Grade-{grade} Marks Entry
                </h2>
            
            <form onSubmit={handleSubmit} className="mb-8">
            <select onChange={(e)=>setSelectedStudent(e.target.value)} className="w-full p-2 border rounded mb-3">
                    <option value=''>Select Student</option>
                    {
                        students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.student_username}
                            </option>
                        ))
                    }
            </select>
            {
                subjects.map((subject,index)=>(
                    <div key={index} className="flex gap-3 mb-3">
                        <input
                        type='text'
                        placeholder='Subject'
                        value={subject.name}
                        onChange={(e)=>handleSubjectChange(index,"name",e.target.value)}
                        className="border p-2 rounded w-1/2"
                        required
                        />

                        <input
                        type='number'
                        placeholder='Marks'
                        value={subject.marks}
                        onChange={(e)=>handleSubjectChange(index,"marks",e.target.value)}
                        className="border p-2 rounded w-1/2"
                        required
                        />
                    </div>
                ))
            }

            <div className='flex gap-5'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-3" onClick={addSubject}>
                Add Subject+
            </button>
            <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 mb-3 rounded"
                onClick={resetForm}
            >
                Reset
            </button>
            </div>
            
            <p className="text-lg font-bold">Total: {totalMarks}</p>
            <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded w-full">
                Publish Result
            </button>
            </form>

            <h2 className="text-2xl font-bold text-center text-orange-500 mb-5">Results Table</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th>S.N</th>
                        <th>Student Name</th>
                        {
                            results.length > 0 && results[0].subjects.map((sub, index) => (
                                <th key={index}>{sub.name}</th>
                            ))
                        }
                        <th>Total</th>
                        <th>GPA</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                     {
                        results.map((result,index)=>(
                            <tr key={result._id} className='border'>
                                <td className='border text-center py-2'>{index+1}</td>
                                <td className='border text-center '>
                                    {students.find((s)=>s._id==result.studentID)?.student_username||'Unknown'}
                                </td>
                                {
                                    result.subjects.map((sub,subIndex)=>(
                                        <td key={subIndex} className="border text-center ">{sub.marks}</td>
                                    ))
                                }
                                <td className="border text-center">{result.totalMarks}</td>
                                <td className="border text-center">{result.GPA}</td>

                                <div className='flex justify-center'>
                                 <button className='bg-red-200 text-red-800  text-2xl py-1 px-2 '
                                 onClick={()=>{handleDelete(result._id)}} ><RiDeleteBin6Line /></button>
                                </div>
                                
                            </tr>

                        ))
                     }
                </tbody>
            </table>
            </div>
        </>
    )
}

export default MarksEntry



