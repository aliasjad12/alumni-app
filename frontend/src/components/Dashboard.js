import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    medicalIssue: "",
    tenure: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://43.204.237.95:5000/api/issues", form);
    alert("Issue submitted successfully");
    setForm({ userName: "", medicalIssue: "", tenure: "" });
  };

  const logout = async () => {
    await axios.post("http://43.204.237.95:5000/api/auth/logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200">

      {/* HEADER */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-green-800">
          User Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="flex justify-center mt-10">
        <form
          onSubmit={submit}
          className="bg-white p-10 rounded-2xl shadow-xl w-[420px]"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
            Medical Issue Form
          </h2>

          <input
            className="w-full p-3 border mb-4 rounded"
            placeholder="Your Name"
            value={form.userName}
            onChange={(e) =>
              setForm({ ...form, userName: e.target.value })
            }
          />

          <textarea
            className="w-full p-3 border mb-4 rounded"
            placeholder="Medical Issue"
            value={form.medicalIssue}
            onChange={(e) =>
              setForm({ ...form, medicalIssue: e.target.value })
            }
          />

          <input
            className="w-full p-3 border mb-4 rounded"
            placeholder="Issue Tenure (e.g. 2 years)"
            value={form.tenure}
            onChange={(e) =>
              setForm({ ...form, tenure: e.target.value })
            }
          />

          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
