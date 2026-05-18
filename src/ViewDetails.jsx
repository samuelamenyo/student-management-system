import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewDetails = () => {
  const { studentid } = useParams();
  const [studentData, setStudentData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://student-management-system-apis.onrender.com/students/" +
          studentid,
      );
      const data = await response.json();
      console.log(data);
      setStudentData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="student-container">
      <h1 className="h1">Student Details</h1>
      {studentData && (
        <div>
          <p>
            <strong>ID:</strong> {studentData.id}
          </p>
          <p>
            <strong>Name:</strong>
            {studentData.name}
          </p>
          <p>
            <strong>Place: </strong>
            {studentData.place}
          </p>
          <p>
            <strong>Phone:</strong>
            {studentData.phone}
          </p>
        </div>
      )}

      <Link to="/" className="back-btn">
        Back
      </Link>
    </div>
  );
};

export default ViewDetails;
