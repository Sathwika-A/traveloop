import { useLocation } from "react-router-dom";

import { useState } from "react";

import Navbar from "../components/Navbar";

import { updateTrip } from "../services/tripService";

function TripItinerary() {

  const location = useLocation();

  const trip = location.state;

  const [itinerary, setItinerary] = useState(
    trip.itinerary || []
  );

  const [isSaved, setIsSaved] = useState(
    trip.itinerary?.length > 0
  );

  const addDay = () => {

    setIsSaved(false);

    setItinerary([

      ...itinerary,

      {
        day: "",
        date: "",
        activities: ""
      }

    ]);

  };

  const handleChange = (index, field, value) => {

    const updated = [...itinerary];

    updated[index][field] = value;

    setItinerary(updated);

  };

  const deleteDay = (index) => {

    const confirmDelete = window.confirm(
      "Delete this day?"
    );

    if (!confirmDelete) return;

    const updated = itinerary.filter(
      (_, i) => i !== index
    );

    setItinerary(updated);

  };

  const saveItinerary = async () => {

    try {

      await updateTrip(trip._id, {

        ...trip,

        itinerary

      });

      setIsSaved(true);

      alert("Itinerary Saved Successfully");

    } catch (error) {

      alert("Save Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-5">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          {/* HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-5">

            <div>

              <h1 className="text-5xl font-bold text-indigo-700">
                {trip.tripName} Itinerary 🗺️
              </h1>

              <p className="mt-3 text-gray-600 text-lg">
                Plan your trip day by day
              </p>

            </div>

            <button
              onClick={addDay}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
            >
              + Add Day
            </button>

          </div>

          {/* EDITABLE SECTION */}

          {
            !isSaved && (

              <div className="mt-10 space-y-8">

                {
                  itinerary.map((item, index) => (

                    <div
                      key={index}
                      className="bg-indigo-50 p-8 rounded-3xl shadow-lg"
                    >

                      <div className="flex items-center justify-between">

                        <h2 className="text-3xl font-bold text-indigo-700">
                          Day {index + 1}
                        </h2>

                        <button
                          onClick={() => deleteDay(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                        >
                          Delete
                        </button>

                      </div>

                      {/* DAY TITLE */}

                      <input
                        type="text"
                        placeholder="Day Title"
                        value={item.day}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "day",
                            e.target.value
                          )
                        }
                        className="w-full mt-6 border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />

                      {/* DATE */}

                      <input
                        type="date"
                        value={item.date}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "date",
                            e.target.value
                          )
                        }
                        className="w-full mt-5 border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />

                      {/* ACTIVITIES */}

                      <textarea
                        rows="5"
                        placeholder="Activities for the day..."
                        value={item.activities}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "activities",
                            e.target.value
                          )
                        }
                        className="w-full mt-5 border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      ></textarea>

                    </div>

                  ))
                }

                {/* SAVE BUTTON */}

                <button
                  onClick={saveItinerary}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
                >
                  Save Itinerary
                </button>

              </div>

            )
          }

          {/* SAVED ITINERARY */}

          {
            itinerary.length > 0 && (

              <div className="mt-16">

                <h2 className="text-4xl font-bold text-indigo-700 mb-8">
                  Saved Itinerary 📍
                </h2>

                <div className="space-y-6">

                  {
                    itinerary.map((item, index) => (

                      <div
                        key={index}
                        className="bg-indigo-50 border border-indigo-100 shadow-lg p-8 rounded-3xl"
                      >

                        <h3 className="text-3xl font-bold text-indigo-700">
                          Day {index + 1}: {item.day}
                        </h3>

                        <p className="mt-4 text-gray-700 text-lg">
                          📅 {item.date}
                        </p>

                        <div className="mt-5 bg-white p-5 rounded-2xl">

                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {item.activities}
                          </p>

                        </div>

                      </div>

                    ))
                  }

                </div>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );
}

export default TripItinerary;