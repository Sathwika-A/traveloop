import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { updateTrip } from "../services/tripService";

function EditTrip() {

  const location = useLocation();

  const navigate = useNavigate();

  const trip = location.state;

  const [formData, setFormData] = useState({

    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    coverImage: ""

  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {

    if (trip) {

      setFormData(trip);

      setImagePreview(trip.coverImage);

    }

  }, [trip]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {

      setImagePreview(reader.result);

      setFormData({

        ...formData,

        coverImage: reader.result

      });

    };

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateTrip(trip._id, formData);

      alert("Trip Updated Successfully");

      navigate("/my-trips");

    } catch (error) {

      alert("Update Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-3xl shadow-2xl">

        <h1 className="text-5xl font-bold text-indigo-700 mb-10">
          Edit Trip ✏️
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TRIP NAME */}

          <input
            type="text"
            name="tripName"
            value={formData.tripName}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          {/* DESTINATION */}

          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          {/* DATES */}

          <div className="grid grid-cols-2 gap-5">

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

          </div>

          {/* BUDGET */}

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          {/* DESCRIPTION */}

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          ></textarea>

          {/* IMAGE */}

          <div>

            <label className="block mb-3 font-semibold">
              Update Cover Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-xl"
            />

          </div>

          {/* PREVIEW */}

          {
            imagePreview && (

              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-72 object-cover rounded-2xl"
              />

            )
          }

          {/* BUTTON */}

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl"
          >
            Update Trip
          </button>

        </form>

      </div>

    </div>

  );
}

export default EditTrip;