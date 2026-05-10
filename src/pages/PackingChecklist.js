import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {

  getTrips,
  updateTrip

} from "../services/tripService";

function PackingChecklist() {

  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  const [item, setItem] = useState("");

  const [category, setCategory] = useState("");

  const [checklist, setChecklist] = useState([]);

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

      setChecklist(
        foundTrip.packingChecklist || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ADD ITEM

  const addItem = async () => {

    if (!item || !category) {

      alert("Enter all fields");

      return;

    }

    const updatedChecklist = [

      ...checklist,

      {

        item,

        category,

        packed: false

      }

    ];

    setChecklist(updatedChecklist);

    try {

      await updateTrip(

        trip._id,

        {

          ...trip,

          packingChecklist: updatedChecklist

        }

      );

      setItem("");

      setCategory("");

    } catch (error) {

      alert("Failed To Add Item");

    }

  };

  // TOGGLE PACKED

  const togglePacked = async (index) => {

    const updatedChecklist = [...checklist];

    updatedChecklist[index].packed =

      !updatedChecklist[index].packed;

    setChecklist(updatedChecklist);

    try {

      await updateTrip(

        trip._id,

        {

          ...trip,

          packingChecklist: updatedChecklist

        }

      );

    } catch (error) {

      alert("Update Failed");

    }

  };

  // DELETE ITEM

  const deleteItem = async (index) => {

    const updatedChecklist = checklist.filter(

      (_, i) => i !== index

    );

    setChecklist(updatedChecklist);

    try {

      await updateTrip(

        trip._id,

        {

          ...trip,

          packingChecklist: updatedChecklist

        }

      );

    } catch (error) {

      alert("Delete Failed");

    }

  };

  // RESET CHECKLIST

  const resetChecklist = async () => {

    const confirmReset = window.confirm(
      "Reset checklist?"
    );

    if (!confirmReset) return;

    setChecklist([]);

    try {

      await updateTrip(

        trip._id,

        {

          ...trip,

          packingChecklist: []

        }

      );

    } catch (error) {

      alert("Reset Failed");

    }

  };

  if (!trip) {

    return <div>Loading...</div>;

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-5">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-5xl font-bold text-indigo-700">
            {trip.tripName} Packing 🎒
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Organize everything for your trip
          </p>

        </div>

        {/* ADD ITEM */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

          <h2 className="text-3xl font-bold text-indigo-700">
            Add Checklist Item
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <input
              type="text"
              placeholder="Item Name"
              value={item}
              onChange={(e) =>
                setItem(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

            <button
              onClick={addItem}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold"
            >
              Add Item
            </button>

          </div>

        </div>

        {/* CHECKLIST */}

        <div className="bg-white rounded-3xl shadow-2xl p-10 mt-10">

          <div className="flex justify-between items-center">

            <h2 className="text-4xl font-bold text-pink-700">
              Packing Checklist ✅
            </h2>

            <button
              onClick={resetChecklist}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl"
            >
              Reset
            </button>

          </div>

          {
            checklist.length > 0 ? (

              <div className="space-y-5 mt-10">

                {
                  checklist.map((item, index) => (

                    <div
                      key={index}
                      className="bg-indigo-50 rounded-2xl p-6 flex justify-between items-center"
                    >

                      <div>

                        <h3
                          className={`text-2xl font-bold ${
                            item.packed
                              ? "line-through text-gray-400"
                              : "text-indigo-700"
                          }`}
                        >
                          {item.item}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          📦 {item.category}
                        </p>

                      </div>

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            togglePacked(index)
                          }
                          className={`px-5 py-2 rounded-xl text-white ${
                            item.packed
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {
                            item.packed
                              ? "Unpack"
                              : "Packed"
                          }
                        </button>

                        <button
                          onClick={() =>
                            deleteItem(index)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))
                }

              </div>

            ) : (

              <p className="text-gray-500 mt-8">
                No checklist items yet
              </p>

            )
          }

        </div>

      </div>

    </div>

  );
}

export default PackingChecklist;