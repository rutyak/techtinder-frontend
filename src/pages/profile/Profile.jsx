import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { FiSave, FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";
import FeedCard from "../../components/FeedCard";
import SkillTags from "./SkillTags";
import ChangePassword from "./ChangePassword";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [profileImageFile, setProfileImageFile] = useState();
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [tags, setTags] = useState(["HTML", "CSS", "JS"]);

  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
    gender: user.gender,
    imageurl: user.imageurl,
    skills: user.skills,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileEdit = async () => {
    try {
      let imageRes = null;
      if (profileImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImageFile);

        imageRes = await axios.post(`${base_url}/upload/image`, imageFormData, {
          withCredentials: true,
        });
      }

      const res = await axios.patch(
        `${base_url}/profile/edit`,
        { ...formData, imageurl: imageRes?.data?.imageurl, skills: tags },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res?.data?.message);
        dispatch(addUser(res?.data?.user));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6 h-screen 2xl:h-auto">
      <div className="flex flex-col lg:flex-row h-full gap-6">
        {/* profile */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <FaEdit /> Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleProfileEdit();
                    setIsEditing(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <FiSave /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <img
              src={imagePreview || `${base_url}/uploads/${user?.imageurl}`}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-100 mb-4"
            />
            {isEditing && (
              <label className="cursor-pointer px-4 py-2 border rounded-lg text-blue-500 border-blue-500 hover:bg-blue-50">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              ["firstname", "First Name"],
              ["lastname", "Last Name"],
              ["age", "Age"],
              ["gender", "Gender"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm text-gray-600 mb-1">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={key === "age" ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:outline-none focus:ring"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{user[key]}</p>
                )}
              </div>
            ))}
          </div>

          {!isEditing && (
            <ChangePassword
              showPasswordFields={showPasswordFields}
              setShowPasswordFields={setShowPasswordFields}
            />
          )}

          {isEditing ? (
            <SkillTags tags={tags} setTags={setTags} />
          ) : (
            <div className="mt-6">
              <label className="block text-sm text-gray-600 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded-full"
                    >
                      #{skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No skills added</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* feed card */}
        <div className="w-full lg:w-1/2 rounded-lg p-6 flex justify-center items-center">
          <FeedCard
            profile={{
              name:
                formData.firstname && formData.lastname
                  ? `${formData.firstname} ${formData.lastname}`
                  : `${user.firstname} ${user.lastname}`,
              age: formData.age || user.age,
              job: formData.skills || user.skills || "Not specified",
              distance: 0,
              image: imagePreview || `${base_url}/uploads/${user?.imageurl}`,
            }}
            showActions={true}
            showLabels={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
