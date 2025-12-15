import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("http://13.203.230.71:5000/api/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://13.203.230.71:5000/api/users/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Manage Users</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
