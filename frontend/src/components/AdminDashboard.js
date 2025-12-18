import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://43.204.237.95:5000/api/issues")
      .then((res) => setIssues(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* ISSUES LIST */}
      <div className="grid gap-4">
        {issues.map((i) => (
          <div key={i._id} className="bg-white p-5 rounded shadow">
            <h2 className="font-bold text-lg">{i.userName}</h2>
            <p className="mt-1">{i.medicalIssue}</p>
            <p className="text-sm text-gray-500 mt-1">
              Tenure: {i.tenure}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
