import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://13.232.132.160:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data.users);
      setServices(res.data.services);
    };

    fetchData();
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="font-bold text-xl mb-4 text-blue-700">Registered Users</h2>
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u._id} className="p-3 bg-gray-100 rounded-lg shadow">
                {u.name} ({u.email})
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="font-bold text-xl mb-4 text-green-700">Services Used</h2>
          <ul className="space-y-2">
            {services.map((s, i) => (
              <li key={i} className="p-3 bg-gray-100 rounded-lg shadow">{s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl col-span-full">
          <h2 className="font-bold text-xl mb-4 text-purple-700">Monitoring</h2>

          <div className="flex flex-col md:flex-row gap-6">

            {/* Grafana */}
            <iframe
              src="http://13.232.132.160:3001"
              className="w-full md:w-1/2 h-96 rounded-xl shadow-lg border"
              title="Grafana"
            />

            {/* Prometheus */}
            <iframe
              src="http://13.232.132.160:9090"
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
