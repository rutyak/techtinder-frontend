import { useState } from "react";
import ConnectionCard from "./ConnectionCard";

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
  const [search, setSearch] = useState("");

  const filteredConnections = dummyConnections.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl  rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Your Connections
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search connections..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((user) => (
              <ConnectionCard key={user.id} user={user} />
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
