import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalLogins: 0,
    totalSignups: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://13.203.230.71:5000/api/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Stats error", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    await axios.post("http://13.203.230.71:5000/api/auth/logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Active Users" value={stats.activeUsers} />
        <StatCard title="Total Logins" value={stats.totalLogins} />
        <StatCard title="Total Signups" value={stats.totalSignups} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard title="Manage Users" onClick={() => navigate("/users")} />
        <ActionCard title="View Services" onClick={() => navigate("/services")} />
        <ActionCard title="System Logs" onClick={() => window.open("http://13.203.230.71:3001")} />
      </div>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-6 text-center">
    <h2 className="text-gray-500 text-sm">{title}</h2>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const ActionCard = ({ title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white shadow rounded p-6 cursor-pointer hover:bg-gray-50 text-center"
  >
    <h2 className="text-lg font-semibold">{title}</h2>
  </div>
);

export default Dashboard;
