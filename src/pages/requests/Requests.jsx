import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalVariable } from "../../context/GlobalContext";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { setRequestCount } = useGlobalVariable();

  async function getRequests() {
    const res = await axios.get(`${base_url}/user/request/received`, {
      withCredentials: true,
    });
    console.log(res?.data?.requests);
    setRequests(res?.data?.requests);
    if (!toast.isActive("getRequest")) {
      toast.success(res.data?.message, { toastId: "getRequest" });
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await axios.post(
        `${base_url}/request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );
      setRequests((prev) => prev.filter((r) => r._id !== id));
      if (!toast.isActive("reqAcceptToast")) {
        toast.success(res.data?.message || "Request accepted!", {
          toastId: "reqAcceptToast",
        });
      }
    } catch (error) {
      toast.error(error.message || "Something is wrong");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.post(
        `${base_url}/request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );
      setRequests((prev) => prev.filter((r) => r._id !== id));
      if (!toast.isActive("reqRejectToast")) {
        toast.success(res.data?.message || "Request rejected!", {
          toastId: "reqRejectToast",
        });
      }
    } catch (error) {
      toast.error(error.message || "Something is wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    setRequestCount(requests.length);
  }, [requests]);

  return (
    <div className="px-5 sm:px-8 xl:px-0 w-full">
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
                key={req._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-xl p-5 bg-white shadow-lg hover:shadow-md transition"
              >
                {/* Avatar + Details */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={req.fromUserId?.imageurl}
                    alt={req.fromUserId?.firstname}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-blue-200"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                      {req.fromUserId?.firstname +
                        " " +
                        req.fromUserId?.lastname}
                      {", "}
                      {req.fromUserId?.age}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {req.fromUserId?.job}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
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
