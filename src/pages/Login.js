import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">

      <Navbar />

      <div className="flex items-center justify-center py-16 px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h2 className="text-4xl font-bold text-center text-indigo-800">
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

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

            <div className="text-right">

  <Link
    to="/forgot-password"
    className="text-indigo-700 text-sm hover:underline"
  >
    Forgot Password?
  </Link>

</div>

            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-5">

            Don't have account?

            <Link
              to="/signup"
              className="text-indigo-700 ml-2"
            >
              Signup
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;