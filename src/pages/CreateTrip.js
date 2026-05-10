import { useState } from "react";

import Navbar from "../components/Navbar";

import { createTrip } from "../services/tripService";

function CreateTrip() {

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

      await createTrip(formData);

      alert("Trip Created Successfully");

    } catch (error) {

      alert("Error Creating Trip");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-3xl shadow-2xl">

        <h1 className="text-5xl font-bold text-indigo-700 mb-10">
          Create New Trip ✈️
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="tripName"
            placeholder="Trip Name"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <div className="grid grid-cols-2 gap-5">

            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

          </div>

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Trip Description"
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
          ></textarea>

          <div>

            <label className="block mb-3 font-semibold">
              Upload Cover Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-xl"
            />

          </div>

          {
            imagePreview && (

              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-72 object-cover rounded-2xl"
              />

            )
          }

          <button
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl"
          >
            Save Trip
          </button>

        </form>

      </div>

    </div>

  );
}

export default CreateTrip;