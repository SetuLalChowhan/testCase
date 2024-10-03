import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const UserRegistration = () => {
  const [avatar, setAvatar] = useState(null); // State to store uploaded avatar
  const [formError, setFormError] = useState(""); // State to store error messages from the backend

  const { values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("confirm_password", values.confirm_password);
        if (avatar) {
          formData.append("avatar", avatar); // Append avatar to FormData
        }

        try {
          const response = await axios.post("http://localhost:3000/api/users/register", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          console.log("Registration success:", response.data);
          // setFormError(""); // Clear any previous error messages
          resetForm(); // Optionally reset form after success
        } catch (error) {
          console.log(error)
          if (error.response && error.response.data) {
            setFormError(error.response.data.message); // Backend error message
          } else {
            setFormError("Something went wrong. Please try again later.");
          }
        } finally {
          setSubmitting(false); // Stop the loading state
        }
      },
    });

    console.log(formError)

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 mt-10">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">Create Your Account</h1>

        {/* Display form-wide error messages */}
        {formError && (
          <div className="text-red-600 text-center mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Avatar Upload */}
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Upload Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 block w-full p-3 border ${errors.name && touched.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="John Doe"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 block w-full p-3 border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="john@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 block w-full p-3 border ${errors.password && touched.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="••••••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className={`mt-1 block w-full p-3 border ${errors.confirm_password && touched.confirm_password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="••••••••••••"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password && (
              <p className="mt-2 text-sm text-red-600">{errors.confirm_password}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              
            >
               Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
