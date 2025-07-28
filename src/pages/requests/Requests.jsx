import React, { useState } from "react";

const dummyRequests = [
  {
    id: 1,
    name: "Ritika Sharma",
    email: "ritika.sharma@example.com",
    image: "https://i.pravatar.cc/150?img=32",
    message: "Hi! I would love to connect and collaborate on your project.",
  },
  {
    id: 2,
    name: "Aman Verma",
    email: "aman.verma@example.com",
    image: "https://i.pravatar.cc/150?img=45",
    message: "Please accept my request for joining the workspace.",
  },
];

const Requests = () => {
  const [requests, setRequests] = useState(dummyRequests);

  const handleAccept = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    alert("Request accepted!");
  };

  const handleReject = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    alert("Request rejected!");
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-4xl mx-auto rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests.</p>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 border rounded-xl p-4 bg-white shadow-lg hover:shadow-md transition"
              >
                <img
                  src={req.image}
                  alt={req.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {req.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{req.email}</p>
                  <p className="text-gray-600 mt-1">{req.message}</p>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
