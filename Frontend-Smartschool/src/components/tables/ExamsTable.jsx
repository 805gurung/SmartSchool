import React, { useEffect, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteexam, getexams } from "../../api/ExamApi";
import { isauthenticated } from "../../api/UserAPI";

const ExamsTable = ({ showBtns = true }) => {
  const [exams, setExam] = useState([]);
  const [success, setSuccess] = useState(false);
  const { token } = isauthenticated();

  useEffect(() => {
    getexams()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setExam(data);
        }
      })
      .catch((error) => {
        console.error("Exams not found", error);
        Swal.fire("Error", "Exams not found", "error");
      });
  }, [success]);

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Alert",
      text: "Are you sure you want to delete this exam?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteexam(id, token).then((data) => {
          if (data.error) {
            Swal.fire("Warning", data.error, "error");
          } else {
            setSuccess(!success); // Toggle success to trigger re-fetch
            Swal.fire("Success", "Exam deleted successfully.", "success");
          }
        });
      } else {
        Swal.fire("Cancelled", "Action cancelled", "info");
      }
    });
  };

  // Function to handle view button click
  const handleViewRoutine = (routinePath) => {
    // Using environment variable is better for production
    // const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const baseUrl = "http://localhost:5000"; // For development
    window.open(`${baseUrl}/${routinePath}`, "_blank");
  };

  return (
    <>
      <Link to="/admin/examroutines/add">
        <button className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 ms-3 my-3 transition-colors">
          Add Exam +
        </button>
      </Link>

      <div className="overflow-y-auto h-96">
        <table className="min-w-full border-collapse border border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-3 text-left">Classroom</th>
              <th className="border p-3 text-left">Published On</th>
              <th className="border p-3 text-left">Routine</th>
              {showBtns && <th className="border p-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 &&
              exams.map((exam) => {
                return (
                  <tr key={exam._id} className="hover:bg-gray-50">
                    <td className="border p-3">{exam.classroom}</td>
                    <td className="border p-3">{exam.date}</td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleViewRoutine(exam.routine)}
                        className="px-3 py-1 rounded-md bg-orange-600 text-white items-center gap-1">
                        <span>View</span>
                        
                      </button>
                    </td>
                    {showBtns && (
                      <td className="border p-3">
                        <div className="flex justify-center gap-2">
                          <Link to={`/admin/examroutines/update/${exam._id}`}>
                            <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                              <FiEdit />
                            </button>
                          </Link>

                          <button
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            onClick={handleDelete(exam._id)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            {exams.length === 0 && (
              <tr>
                <td colSpan={showBtns ? "4" : "3"} className="text-center py-4">
                  No exams found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExamsTable;