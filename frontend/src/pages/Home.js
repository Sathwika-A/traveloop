import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      navigate("/dashboard");

    }

  }, [navigate]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-6xl font-extrabold text-indigo-800 leading-tight">
          Plan Your Dream Trips <br /> With Ease ✈️
        </h1>

        <p className="mt-6 text-xl text-gray-700 max-w-2xl leading-relaxed">
          Create personalized itineraries, manage travel budgets,
          explore destinations, and organize your journeys all in one place.
        </p>

      </div>

    </div>

  );
}

export default Home;