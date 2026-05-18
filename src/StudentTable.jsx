import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const DisplayDetails = (id) => {
    navigate("/student/view/" + id);
  };

  const EditDetails = (id) => {
    navigate("/student/edit/" + id);
  };

  const RemoveUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user??")) {
      try {
        const response = await fetch("http://localhost:3000/students/" + id, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Student Removed Successfully");

          fetchData();
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Student Records</h2>
      <div className="top-bar">
        <Link to="/student/create" className="add-btn">
          Add New Student
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Place</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.place}</td>
                <td>{student.phone}</td>

                <td className="actions">
                  <button
                    onClick={() => DisplayDetails(student.id)}
                    className="btn view-btn"
                  >
                    View
                  </button>

                  <button
                    className="btn edit-btn"
                    onClick={() => EditDetails(student.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete-btn"
                    onClick={() => RemoveUser(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
