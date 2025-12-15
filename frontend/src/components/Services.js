import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/services`)
      .then(res => setServices(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Services Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded shadow flex justify-between"
          >
            <span>{s.name}</span>
            <span className={s.status === "UP" ? "text-green-600" : "text-red-600"}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
