import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await axios.post("http://3.110.118.11:5000/api/auth/signup", form);

    navigate("/login");
  };

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Name" onChange={e => setForm({...form,name:e.target.value})} />
      <input name="email" placeholder="Email" onChange={e => setForm({...form,email:e.target.value})} />
      <input type="password" name="password" placeholder="Password" onChange={e => setForm({...form,password:e.target.value})} />
      <button>Signup</button>
    </form>
  );
}

export default Signup;
