import { useNavigate } from "react-router-dom";

function TripCard({ trip, onDelete }) {

  const navigate = useNavigate();

  const handleDelete = () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (confirmDelete) {

      onDelete(trip._id);

    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition duration-300">

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

        <h2 className="text-3xl font-bold text-indigo-700">
          {trip.tripName}
        </h2>

        <p className="mt-3 text-gray-700">
          📍 {trip.destination}
        </p>

        <p className="mt-2 text-gray-600">
          💰 Budget: ₹{trip.budget}
        </p>

        <p className="mt-3 text-gray-600 leading-relaxed">
          {trip.description}
        </p>

        {
  trip.selectedCities?.length > 0 && (

    <div className="mt-4">

      <p className="font-semibold text-indigo-700">
        Cities:
      </p>

      <div className="flex flex-wrap gap-2 mt-2">

        {
          trip.selectedCities.map((city, index) => (

            <div
              key={index}
              className="bg-indigo-100 px-3 py-1 rounded-xl text-sm"
            >
              {city.city}
            </div>

          ))
        }

      </div>

    </div>

  )
}

        <p className="mt-2 text-gray-600">
          📅 {trip.startDate} - {trip.endDate}
        </p>

        <div className="flex flex-wrap gap-4 mt-6">

          <button
            onClick={() =>
              navigate("/edit-trip", {
                state: trip
              })
            }
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
          >
            Edit
          </button>

          <button
            onClick={() =>
              navigate("/trip-itinerary", {
                state: trip
              })
            }
            className="bg-pink-600 text-white px-5 py-2 rounded-xl hover:bg-pink-700"
          >
            Itinerary
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() =>
              navigate(
                `/budget-breakdown/${trip._id}`
              )
            }
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl"
          >
            Budget Planner
          </button>

          <button
            onClick={() =>
              navigate(
                `/packing-checklist/${trip._id}`
              )
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            Packing Checklist
          </button>

        </div>

      </div>

    </div>

  );
}

export default TripCard;