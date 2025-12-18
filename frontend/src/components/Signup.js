import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://13.232.217.75:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-200">
      <form onSubmit={submit} className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">Signup</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          className="w-full p-3 border mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 border mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-3 border mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
          Signup
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-green-700 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
