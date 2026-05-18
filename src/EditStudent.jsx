import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditStudent = () => {
  const { studentid } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    place: "",
    phone: "",
  });

  // FETCH EXISTING DATA
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/students/" + studentid,
      );

      const data = await response.json();

      setStudentData(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/students/" + studentid,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        },
      );

      if (response.ok) {
        alert("Student Data Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Edit Student Details</h2>

      <form className="student-form-group" onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={studentData.id}
          onChange={handleChange}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={studentData.name}
          onChange={handleChange}
        />

        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={studentData.place}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={studentData.phone}
          onChange={handleChange}
        />

        <div className="student-btn-group">
          <button type="submit" className="student-save-btn">
            Update
          </button>

          <Link to="/" className="student-back-btn">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
