import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://3.110.118.11:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
      setServices(res.data.services);
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold mb-4">Registered Users</h2>
          <ul>{users.map((u) => <li key={u._id}>{u.name} ({u.email})</li>)}</ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold mb-4">Services Used</h2>
          <ul>{services.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>

        <div className="bg-white p-6 rounded shadow col-span-full">
          <h2 className="font-bold mb-4">Monitoring</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <iframe
              src="http://localhost:3001/d/your-grafana-dashboard"
              className="w-full md:w-1/2 h-80"
              title="Grafana"
            />
            <iframe
              src="http://localhost:9090/graph"
              className="w-full md:w-1/2 h-80"
              title="Prometheus"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
