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
    setRequests((prev) => prev.filter((r) => r.id !== id));
    alert("Request accepted!");
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    alert("Request rejected!");
  };

  return (
    <div className="px-5 sm:px-8 xl:px-0 w-full min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-700 m-6 lg:m-10 xl:m-12 text-center">
          Pending Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests.</p>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-xl p-5 bg-white shadow-lg hover:shadow-md transition"
              >
                {/* Avatar + Details */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={req.image}
                    alt={req.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-blue-200"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                      {req.name}
                    </h3>
                    <p className="text-sm text-gray-500">{req.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{req.message}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
