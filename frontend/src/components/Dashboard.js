import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // ✅ DEFINE ENV VARIABLE HERE (TOP OF COMPONENT)
  const GRAFANA_URL = process.env.REACT_APP_GRAFANA_URL;

  // Fetch users and services
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://3.110.154.156:5000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(res.data.users);
        setServices(res.data.services);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="font-bold text-xl mb-4 text-blue-700">
            Registered Users
          </h2>
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u._id} className="p-3 bg-gray-100 rounded-lg shadow">
                {u.name} ({u.email})
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="font-bold text-xl mb-4 text-green-700">
            Services Used
          </h2>
          <ul className="space-y-2">
            {services.map((s, i) => (
              <li key={i} className="p-3 bg-gray-100 rounded-lg shadow">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Monitoring */}
        <div className="bg-white p-6 rounded-xl shadow-xl col-span-full">
          <h2 className="font-bold text-xl mb-4 text-purple-700">
            Monitoring
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* ✅ GRAFANA */}
            <iframe
              src={`${GRAFANA_URL}/d/alumni-monitoring?orgId=1&kiosk`}
              className="w-full md:w-1/2 h-96 rounded-xl shadow-lg border"
              title="Grafana"
            />

            {/* PROMETHEUS */}
            <iframe
              src="http://3.110.154.156:9090/graph"
              className="w-full md:w-1/2 h-96 rounded-xl shadow-lg border"
              title="Prometheus"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
