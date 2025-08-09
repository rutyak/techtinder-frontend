import { useState } from "react";
import ConnectionCard from "./ConnectionCard";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const dummyConnections = [
  {
    id: 1,
    name: "Alice Johnson",
    status: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Rohit Sharma",
    status: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    online: false,
  },
  {
    id: 3,
    name: "Sarah Lee",
    status: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    online: true,
  },
  {
    id: 4,
    name: "Kunal Deshmukh",
    status: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    online: true,
  },
];

function Connections() {
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState("");

  async function getConnections() {
    try {
      const res = await axios.get(`${base_url}/user/connections`, {
        withCredentials: true,
      });

      console.log(res.data);
      setConnections(res.data?.data);
      if (!toast.isActive("getConnections")) {
        toast.success(res.data?.message, { toastId: "getConnections" });
      }
    } catch (error) {
      toast.error(error.data?.message);
      consol.error(error);
    }
  }

  useEffect(() => {
    getConnections();
  }, []);

  const filteredConnections = connections?.filter(
    (user) =>
      user?.firstname?.toLowerCase().includes(search?.toLowerCase()) ||
      user?.lastname?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div className="px-5 sm:px-8 xl:px-0 w-full flex items-start justify-center">
      <div className="w-full max-w-4xl rounded-2xl py-5">
        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-700 mb-6 text-center">
          Your Connections
        </h1>

        <div className="mb-5 md:mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search connections..."
            className="w-full max-w-md px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((user) => (
              <ConnectionCard key={user?._id} user={user} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No connections found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Connections;
