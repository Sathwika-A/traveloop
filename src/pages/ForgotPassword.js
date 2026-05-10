import { useState } from "react";
import Navbar from "../components/Navbar";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:5000/api/reset/forgot-password",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ email })
      }
    );

    const data = await response.json();

    alert(data.message);

  } catch (error) {

    alert("Error Sending Email");

  }

};

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="flex items-center justify-center py-20 px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h1 className="text-4xl font-bold text-indigo-700 text-center">
            Forgot Password 🔒
          </h1>

          <p className="text-gray-600 text-center mt-4">
            Enter your email to reset your password
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />

            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
            >
              Send Reset Link
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default ForgotPassword;