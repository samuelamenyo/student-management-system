import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: "",
    place: "",
    phone: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      id: crypto.randomUUID(),
      ...studentData,
    };

    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        alert("Student Data Saved Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="container">
      <h2 className="title">Add New Student</h2>

      <form className="student-form-group" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={studentData.name}
          onChange={handleChange}
        />

        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          required
          value={studentData.place}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          value={studentData.phone}
          onChange={handleChange}
        />

        <div className="student-btn-group">
          <button type="submit" className="student-save-btn">
            Save
          </button>

          <Link to="/" className="student-back-btn">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
