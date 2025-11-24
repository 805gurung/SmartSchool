import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addassignment, getassignments } from "../../api/AssignmentAPI";

const GradeAssignments = ({showForm=true}) => {
  const [assignments, setAssignments] = useState([]);  // Holds the fetched list
  const [newAssignment, setNewAssignment] = useState({
    subject: '',
    date: '',
    details: '',
    grade:''
  });
  const [success, setSuccess] = useState(false);

  const { grade } = useParams();

  // Fetch assignments for the current grade
  const fetchAssignments = () => {
    getassignments(grade)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          Swal.fire("Error", "Failed to fetch assignments", "error");
        } else {
          setAssignments(data);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Assignments not found", "error");
      });
  };

  useEffect(() => {
    fetchAssignments();
  }, [grade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentData = {
        subject: newAssignment.subject,
        date: newAssignment.date,
        details: newAssignment.details,
        grade: newAssignment.grade
      };
    

    addassignment(assignmentData)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          Swal.fire("Error", "Failed to add assignment", "error");
        } else {
          setSuccess(true);
          Swal.fire('Success',"Added successfully","success")
          setNewAssignment({
            subject: '',
            date: '',
            details: '',
            grade:''
          });


          // Refresh assignment list after adding new assignment
          fetchAssignments();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Failed to add assignment", "error");
      });
  };

  return (
    <>
      <div className="mt-12 ms-36">
        <label className="text-2xl mt-3">Assignment: </label>
        <span className="mt-3 border bg-orange-500 p-2 rounded">
          Grade-{grade}
        </span>
      </div>

      <div>
        {showForm &&
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="subject">Subject</label>
            <br />
            <input
              type="text"
              name="subject"
              className="border p-2 me-3"
              value={newAssignment.subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Due Date</label>
            <br />
            <input
              type="text"
              name="date"
              className="border p-2 me-3"
              value={newAssignment.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="details">Details</label>
            <br />
            <input
              type="text"
              name="details"
              className="border p-2 me-3"
              value={newAssignment.details}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="grade">Grade</label>
            <br />
            <input
              type="text"
              name="grade"
              className="border p-2 me-3"
              value={newAssignment.grade}
              onChange={handleChange}
            />
          </div>
          
          <div className="mt-4">
            <button type="submit" className="border px-6 py-3 rounded bg-orange-500">
              Add
            </button>
          </div>
        </form>
}
      </div>

      <div className="mt-5 flex justify-center">
        <table className="border-4 border-black">
          <thead>
            <tr>
              <th className="p-3 border-4 border-black">Subject</th>
              <th className="p-3 border-4 border-black">Due Date</th>
              <th className="border-4 border-black p-3">Details</th>
              <th className="border-4 border-black p-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <tr key={index}>
                  <td className="border-4 border-black p-3">
                    {assignment.subject}
                  </td>
                  <td className="border-4 border-black p-3">
                    {assignment.date}
                  </td>
                  <td className="border-4 border-black p-3">
                    {assignment.details}
                  </td>
                  <td className="border-4 border-black p-3">
                    {assignment.grade}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 border-4 border-black text-center">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GradeAssignments;
