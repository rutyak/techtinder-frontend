import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiSave, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Profile = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
    gender: user.gender,
    imageurl: user.imageurl,
    skills: user.skills,
  });

  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleProfileEdit() {
    console.log("Profile edit clicked");
    console.log("formdata: ", formData);

    try {
      const res = await axios.patch(base_url + "/profile/edit", formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(res?.data?.message);
        dispatch(addUser(res?.data?.user));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something wents wrong");
    }
  }

  function handleChangePassword() {
    console.log("handle change passwords");
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleProfileEdit();
                setIsEditing(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <FiSave /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              <FiX /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <img
            src={user?.imageurl}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 mb-4"
          />
          {isEditing && (
            <div className="mt-2">
              <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50 transition-colors">
                <span className="flex items-center gap-2">
                  Upload Profile Photo
                </span>
                <input type="file" className="hidden" />
              </label>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Fields */}
          {[
            ["firstname", "First Name"],
            ["lastname", "Last Name"],
            !isEditing ? ["email", "Email"] : null,
            ["age", "Age"],
            ["gender", "Gender"],
          ]
            .filter(Boolean)
            .map(([key, label]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={key === "age" ? "number" : "text"}
                    value={formData?.[key]}
                    name={key}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded text-gray-800">
                    {user?.[key] || "N/A"}
                  </p>
                )}
              </div>
            ))}

          {!isEditing && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center justify-between bg-gray-50 rounded p-2">
                <p className="text-gray-400">••••••••</p>
                <button
                  type="button"
                  onClick={() => setShowPasswordFields((prev) => !prev)}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  {showPasswordFields ? "Cancel" : "Change"}
                </button>
              </div>
            </div>
          )}

          {showPasswordFields && (
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="md:col-span-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                  Save Password
                </button>
              </div>
            </div>
          )}

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Skills
            </label>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g., Programming or Microsoft Office"
                />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Sample Skill
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
