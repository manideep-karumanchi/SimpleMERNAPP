import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("CSE (AIML)");
  const [year, setYear] = useState(3);
  const [message, setMessage] = useState("");

  async function loadStudents() {
    try {
      const response = await fetch(`${API_URL}/api/students`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      setStudents(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function addStudent(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          rollNo,
          branch,
          year: Number(year)
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessage("Student added successfully.");
      setName("");
      setRollNo("");
      setBranch("CSE (AIML)");
      setYear(3);
      loadStudents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;

    try {
      const response = await fetch(`${API_URL}/api/students/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessage("Student deleted successfully.");
      loadStudents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="container">
      <h1>Student Management System</h1>
      <p className="subtitle">
        React + Express + MongoDB Atlas
      </p>

      <form onSubmit={addStudent} className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          required
        />

        <input
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Roll Number"
          required
        />

        <input
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Branch"
          required
        />

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <button type="submit">Add Student</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No.</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
