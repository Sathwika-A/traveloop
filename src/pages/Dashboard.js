import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { getTrips } from "../services/tripService";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [trips, setTrips] = useState([]);

  const [totalBudget, setTotalBudget] = useState(0);

  const recommendedPlaces = [
    "Paris",
    "Goa",
    "Tokyo",
    "Dubai",
    "Maldives",
    "Bali"
  ];

  useEffect(() => {

    fetchTrips();

  }, []);

  const fetchTrips = async () => {

    try {

      const response = await getTrips();

      setTrips(response.data);

      let total = 0;

      response.data.forEach((trip) => {

        total += Number(trip.budget);

      });

      setTotalBudget(total);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="p-8">

        {/* HERO SECTION */}

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-6xl font-extrabold text-indigo-700">
            Welcome {user?.name} 👋
          </h1>

          <p className="mt-5 text-gray-600 text-xl">
            Ready to plan your next adventure?
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            {/* CREATE TRIP */}

            <button
              onClick={() => navigate("/create-trip")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl"
            >
              Plan New Trip
            </button>

            {/* VIEW TRIPS */}

            <button
              onClick={() => navigate("/my-trips")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl"
            >
              View Trips
            </button>

            {/* SEARCH CITIES */}

            <button
              onClick={() => navigate("/city-search")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl"
            >
              Search Cities
            </button>

            

          </div>

        </div>

        {/* DASHBOARD GRID */}

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          {/* UPCOMING TRIPS */}

          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-indigo-700">
              Upcoming Trips ✈️
            </h2>

            <div className="mt-6 space-y-4">

              {
                trips.length > 0 ? (

                  trips.map((trip) => (

                    <div
                      key={trip._id}
                      className="bg-indigo-100 p-4 rounded-xl"
                    >

                      <p className="font-bold text-lg text-indigo-700">
                        {trip.tripName}
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        📍 {trip.destination}
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        📅 {trip.startDate}
                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-gray-500">
                    No trips created yet
                  </p>

                )
              }

            </div>

          </div>

          {/* BUDGET */}

          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-green-700">
              Budget Highlights 💰
            </h2>

            <div className="mt-6">

              <p className="text-5xl font-bold text-gray-800">
                ₹{totalBudget}
              </p>

              <p className="mt-3 text-gray-600">
                Total Planned Budget
              </p>

              <div className="mt-6">

                <div className="bg-green-100 rounded-full h-5 overflow-hidden">

                  <div
                    className="bg-green-500 h-5"
                    style={{
                      width: `${Math.min(totalBudget / 1000, 100)}%`
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

          {/* POPULAR DESTINATIONS */}

          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-pink-700">
              Popular Cities 🌍
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">

              {
                recommendedPlaces.map((place, index) => (

                  <div
                    key={index}
                    className="bg-pink-100 px-5 py-3 rounded-xl font-medium hover:scale-105 transition"
                  >
                    {place}
                  </div>

                ))
              }

            </div>

          </div>

        </div>

        {/* RECENT TRIPS */}

        <div className="mt-12">

          <h2 className="text-4xl font-bold text-indigo-700 mb-8">
            Recent Trips 🧳
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
              trips.slice(0, 3).map((trip) => (

                <div
                  key={trip._id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >

                  {
                    trip.coverImage && (

                      <img
                        src={trip.coverImage}
                        alt="Trip"
                        className="w-full h-56 object-cover"
                      />

                    )
                  }

                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-indigo-700">
                      {trip.tripName}
                    </h3>

                    <p className="mt-3 text-gray-700">
                      📍 {trip.destination}
                    </p>

                    <p className="mt-2 text-gray-600">
                      💰 ₹{trip.budget}
                    </p>

                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {trip.description}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;