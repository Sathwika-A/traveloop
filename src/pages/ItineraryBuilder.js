import { useState } from "react";

import Navbar from "../components/Navbar";

function ItineraryBuilder() {

  const [stops, setStops] = useState([]);

  const addStop = () => {

    setStops([

      ...stops,

      {
        city: "",
        startDate: "",
        endDate: "",
        activities: ""
      }

    ]);

  };

  const handleChange = (index, field, value) => {

    const updatedStops = [...stops];

    updatedStops[index][field] = value;

    setStops(updatedStops);

  };

  const moveUp = (index) => {

    if (index === 0) return;

    const updatedStops = [...stops];

    [updatedStops[index - 1], updatedStops[index]] =

    [updatedStops[index], updatedStops[index - 1]];

    setStops(updatedStops);

  };

  const moveDown = (index) => {

    if (index === stops.length - 1) return;

    const updatedStops = [...stops];

    [updatedStops[index + 1], updatedStops[index]] =

    [updatedStops[index], updatedStops[index + 1]];

    setStops(updatedStops);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-5">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="flex items-center justify-between">

            <h1 className="text-5xl font-bold text-indigo-700">
              Itinerary Builder 🗺️
            </h1>

            <button
              onClick={addStop}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              + Add Stop
            </button>

          </div>

          <div className="mt-10 space-y-8">

            {
              stops.length === 0 && (

                <p className="text-gray-500 text-lg">
                  No stops added yet
                </p>

              )
            }

            {
              stops.map((stop, index) => (

                <div
                  key={index}
                  className="bg-indigo-50 p-8 rounded-3xl shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-indigo-700">
                      Stop {index + 1}
                    </h2>

                    <div className="flex gap-3">

                      <button
                        onClick={() => moveUp(index)}
                        className="bg-gray-200 px-4 py-2 rounded-xl"
                      >
                        ⬆️
                      </button>

                      <button
                        onClick={() => moveDown(index)}
                        className="bg-gray-200 px-4 py-2 rounded-xl"
                      >
                        ⬇️
                      </button>

                    </div>

                  </div>

                  {/* CITY */}

                  <input
                    type="text"
                    placeholder="Enter City"
                    value={stop.city}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "city",
                        e.target.value
                      )
                    }
                    className="w-full mt-6 border p-4 rounded-xl"
                  />

                  {/* DATES */}

                  <div className="grid grid-cols-2 gap-5 mt-5">

                    <input
                      type="date"
                      value={stop.startDate}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="border p-4 rounded-xl"
                    />

                    <input
                      type="date"
                      value={stop.endDate}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="border p-4 rounded-xl"
                    />

                  </div>

                  {/* ACTIVITIES */}

                  <textarea
                    rows="4"
                    placeholder="Activities (Shopping, Beaches, Trekking...)"
                    value={stop.activities}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "activities",
                        e.target.value
                      )
                    }
                    className="w-full mt-5 border p-4 rounded-xl"
                  ></textarea>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );
}

export default ItineraryBuilder;