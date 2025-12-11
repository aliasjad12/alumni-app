import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await axios.post("http://3.110.118.11:5000/api/auth/login", form);

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" onChange={e => setForm({...form,email:e.target.value})} />
      <input type="password" name="password" placeholder="Password" onChange={e => setForm({...form,password:e.target.value})} />
      <button>Login</button>
    </form>
  );
}

export default Login;
