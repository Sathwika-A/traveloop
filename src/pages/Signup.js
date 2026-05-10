import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { signupUser } from "../services/authService";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await signupUser(formData);

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {

      alert("Signup Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-indigo-200">

      <Navbar />

      <div className="flex items-center justify-center py-16 px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h2 className="text-4xl font-bold text-center text-indigo-800">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              Signup
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Signup;