import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  // State for avatar preview
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
      avatar: user.avatar,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).max(25),
      email: Yup.string().email(),
      password: Yup.string().min(6),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (values.password) {
        formData.append("password", values.password);
      }
      if (values.avatar) {
        formData.append("avatar", values.avatar); // New avatar if uploaded
      }

      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/edit-profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setPreview(null); // Reset preview after successful upload
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("avatar", file); // Update Formik's avatar value
      setPreview(URL.createObjectURL(file)); // Set preview image
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 mt-10">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          User Profile
        </h1>

        {/* Avatar Upload */}
        <div className="text-center mb-4">
          <label htmlFor="avatar" className="cursor-pointer">
            <img
              src={
                preview
                  ? preview // Show preview if a new image is selected
                  : user.avatar
                  ? `http://localhost:3000/${user.avatar}`
                  : "default-avatar-url.jpg"
              }
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto object-cover cursor-pointer"
            />
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={user.name || "Enter your name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={user.email || "Enter your email"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="•••••••••••• (Leave empty to keep current password)"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
