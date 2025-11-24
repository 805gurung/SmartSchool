import React, { useEffect, useState } from 'react'
import { studentResult } from '../../api/ResultsAPI'

const ResultsTable = () => { 
  let[result,setResult]=useState(null)
  
  const storedData = JSON.parse(localStorage.getItem("jwt"));
  const studentData = storedData.student
  const studentid = studentData ? studentData._id : null;
  
  useEffect(()=>{
    const fetchresult =(studentid)=>{
      studentResult(studentid)
      .then((data)=>setResult(data.student))
      .catch(error => console.log('Error fetching results:', error.message))
    };

    if(studentid){
      fetchresult(studentid)
    }
  },[studentid])
      

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-orange-500 mb-5">
        My Results
      </h2>
      {result ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2">Subject</th>
              <th className="border p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((subject, index) => (
              <tr key={index} className="border text-center">
                <td className="border p-2">{subject.name}</td>
                <td className="border p-2">{subject.marks}</td>
              </tr>
            ))}
            <tr className="border bg-gray-100 text-center">
              <td className="border p-2 font-bold">Total</td>
              <td className="border p-2 font-bold">{result.totalMarks}</td>
            </tr>
            <tr className="border bg-gray-100 text-center">
              <td className="border p-2 font-bold">GPA</td>
              <td className="border p-2 font-bold">{result.GPA}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center">No results found.</p>
      )}
    </div>
  );
}

export default ResultsTable