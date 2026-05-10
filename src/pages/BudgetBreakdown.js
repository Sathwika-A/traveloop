import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend

} from "recharts";

import {

  getTrips,
  updateTrip

} from "../services/tripService";

function BudgetBreakdown() {

  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  const [transport, setTransport] = useState("");

  const [stay, setStay] = useState("");

  const [food, setFood] = useState("");

  const [activities, setActivities] = useState("");

  const [days, setDays] = useState("");

  useEffect(() => {

    fetchTrip();

  }, []);

  const fetchTrip = async () => {

    try {

      const response = await getTrips();

      const foundTrip = response.data.find(

        (trip) => trip._id === id

      );

      setTrip(foundTrip);

      setTransport(foundTrip.transportCost || "");

      setStay(foundTrip.stayCost || "");

      setFood(foundTrip.foodCost || "");

      setActivities(
        foundTrip.activitiesCost || ""
      );

      setDays(foundTrip.tripDays || "");

    } catch (error) {

      console.log(error);

    }

  };

  const total =

    Number(transport || 0) +

    Number(stay || 0) +

    Number(food || 0) +

    Number(activities || 0);

  const averagePerDay =

    days > 0
      ? total / days
      : 0;

  const data = [

    {
      name: "Transport",
      value: Number(transport || 0)
    },

    {
      name: "Stay",
      value: Number(stay || 0)
    },

    {
      name: "Food",
      value: Number(food || 0)
    },

    {
      name: "Activities",
      value: Number(activities || 0)
    }

  ];

  const COLORS = [

    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EC4899"

  ];

  // SAVE

  const saveBudget = async () => {

    try {

      await updateTrip(

        trip._id,

        {

          ...trip,

          transportCost: transport,

          stayCost: stay,

          foodCost: food,

          activitiesCost: activities,

          tripDays: days

        }

      );

      alert("Budget Saved");

    } catch (error) {

      alert("Save Failed");

    }

  };

  if (!trip) {

    return <div>Loading...</div>;

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-5">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-5xl font-bold text-indigo-700">
            {trip.tripName} Budget 💰
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Plan your expenses wisely
          </p>

        </div>

        {/* INPUT + SUMMARY */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {/* INPUTS */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-indigo-700">
              Enter Costs
            </h2>

            <div className="space-y-5 mt-8">

              <input
                type="number"
                placeholder="Transport Cost"
                value={transport}
                onChange={(e) =>
                  setTransport(e.target.value)
                }
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Stay Cost"
                value={stay}
                onChange={(e) =>
                  setStay(e.target.value)
                }
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Food Cost"
                value={food}
                onChange={(e) =>
                  setFood(e.target.value)
                }
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Activities Cost"
                value={activities}
                onChange={(e) =>
                  setActivities(e.target.value)
                }
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Trip Days"
                value={days}
                onChange={(e) =>
                  setDays(e.target.value)
                }
                className="w-full border p-4 rounded-2xl"
              />

              <button
                onClick={saveBudget}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-bold"
              >
                Save Budget
              </button>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-green-700">
              Cost Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="bg-indigo-100 p-5 rounded-2xl">

                <p>Total Budget</p>

                <h3 className="text-4xl font-bold text-indigo-700 mt-2">
                  ₹{total}
                </h3>

              </div>

              <div className="bg-pink-100 p-5 rounded-2xl">

                <p>Average Per Day</p>

                <h3 className="text-4xl font-bold text-pink-700 mt-2">
                  ₹{averagePerDay.toFixed(2)}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-2xl p-10 mt-10">

          <h2 className="text-4xl font-bold text-indigo-700 mb-10">
            Expense Distribution 📊
          </h2>

          <div className="flex justify-center">

            <PieChart width={500} height={400}>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >

                {
                  data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </div>

        </div>

      </div>

    </div>

  );
}

export default BudgetBreakdown;