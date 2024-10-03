import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from 'universal-cookie'; 

// Validation schema for login
const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

const initialValues = {
  email: "",
  password: "",
};

const UserLogin = () => {
 
  const [formError, setFormError] = useState(""); // State to store error messages from the backend

  const { values, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/login", values, {
          withCredentials: true,
        });
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        console.log("Login success:", response.data);
        const token = response.data.token
        setFormError(""); // Clear any previous error messages
        resetForm(); // Optionally reset form after success
      } catch (error) {
        console.log(error);
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

  console.log(formError);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 mt-10">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">Login to Your Account</h1>

        {/* Display form-wide error messages */}
        {formError && (
          <div className="text-red-600 text-center mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
